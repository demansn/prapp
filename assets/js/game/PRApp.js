var PRApp = {
    SCREEN_WIDTH: 700,
    SCREEN_HEIGHT: 600,
    ASPECT_RATIO: 7 / 6,
    OWNER_DIV_ID: "",
    gameWidth: 700,
    gameHeight: 600,   
    STATE: {
        PRELOAD: "PRELOAD",
        MAIN_MENU: "MAIN_MENU",
        PLAY: "PLAY",
        META_GAME: "META_GAME"
    },
    TUTORIAL: {
        BASE: "base",
        BONUS: "bonus",
        MULTI: "multi"
    },
    isSoundMute: false,
    isMusicMute: false,
    isEnableSpriteAnimation: true, 
    isDisbledSoundGame: false,
    resetProgressGame: false,
	isCreated: false,
    music: null,
    currentLevel: 1,
	moreGameAction: null,
	paused: false,
	APIData: {},
    loadLevel: function(levelNamber){
        this.currentLevel = levelNamber;
        this.game.state.start(PRApp.STATE.PLAY);
    },
    create: function( APIData ) {
        
		if ( !this.isCreated ) {
			
			this.APIData = APIData;
			
			
			this.game = new Phaser.Game( PRApp.SCREEN_WIDTH, PRApp.SCREEN_HEIGHT, Phaser.CANVAS, PRApp.OWNER_DIV_ID );

			this.preload = new PRApp.Preload();
			this.mainMenu = new PRApp.MainMenu();
			this.metaGame = new PRApp.MetaGame();
			this.play = new PRApp.Play();

			this.game.state.add( PRApp.STATE.PRELOAD, this.preload );
			this.game.state.add( PRApp.STATE.MAIN_MENU, this.mainMenu );
			this.game.state.add( PRApp.STATE.META_GAME, this.metaGame );
			this.game.state.add( PRApp.STATE.PLAY, this.play );

			window.addEventListener( 'orientationchange', this.resize.bind( this ), false );

			if ( this.resetProgressGame ) {
				localStorage.clear();
			}			

			this.game.state.start( PRApp.STATE.PRELOAD );
			
			this.isCreated = true;
		}
    },
    init: function() {

        this.game.stage.disableVisibilityChange = false;   
        this.scaleStage();
        this.game.scale.startFullScreen();

    },
	moreGames: function(){
		if ( this.APIData ) {
			this.APIData.splashScreen.action.call();
		}
	},
    resetCursor: function() {
        this.game.canvas.style.cursor = "";
    },
    createSounds: function(){
        
      this.sounds = {};
        
      for(var id in PRApp.resources.sounds){
          this.sounds[PRApp.resources.sounds[id]] = this.game.add.audio(PRApp.resources.sounds[id]);
      }  
      
    },
    playSound: function(id) {
        if (!this.isDisbledSoundGame) {
            if (!this.isSoundMute) {
                if (this.sounds[id]) {
                    this.sounds[id].play();
                }
            }
        }
    },
    playMusic: function(id) {
        if (!this.isDisbledSoundGame) {
            if (!PRApp.music) {
                PRApp.music = this.game.add.audio(id, 0.6, true);
                PRApp.music.play();
            } else if (PRApp.music.name !== id) {
                PRApp.music.destroy();
                PRApp.music = this.game.add.audio(id, 0.6, true);
                PRApp.music.play();
            }
        }
    },
    soundMuteSwitch: function() {

        if (this.isSoundMute) {
            this.isSoundMute = false;
        } else {
            this.isSoundMute = true;
        }

        return this.isSoundMute;
    },
    soundMusicSwitch: function() {

        if (this.isMusicMute) {
            this.isMusicMute = false;
            PRApp.music.play();
        } else {
            this.isMusicMute = true;
            PRApp.music.stop();
        }

        return this.isMusicMute;
    },
    scaleStage: function() {

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 

        if (this.game.device.desktop) {
            this.game.scale.maxWidth = PRApp.gameWidth;
            this.game.scale.maxHeight = PRApp.gameHeight;
            this.game.scale.minWidth = PRApp.gameWidth / 2;
            this.game.scale.minHeight = PRApp.gameHeight / 2;
        }        
      
        this.game.scale.aspectRatio = PRApp.ASPECT_RATIO;
        this.game.scale.sourceAspectRatio = PRApp.ASPECT_RATIO;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setScreenSize(true);

    },
	setPause: function(isPaused){
		
		this.paused = isPaused;
		
		if(this.paused){
			this.isMusicMute = true;
			PRApp.music.stop();
		} else {
			this.isMusicMute = false;
			PRApp.music.play();
		}
		
	},	
    resize: function(){
        this.game.scale.setScreenSize(true);     
    },
    save: function(){
        
        var saveData = {
            currentLevel: this.currentLevel,
            levels: {
                1: {
                    starsNamber: 0,
                    isLock: true,
                    hasLoadTutorial: true
                }
            }
        };
        var levelID, levels = PRApp.Levels;
        var levelData = {  };
        
        for(levelID in levels){
            levelData = {
                starsNamber: levels[levelID].starsNamber,
                isLock: levels[levelID].isLock
            }; 
            
            if(levels[levelID].tutorial){
                levelData.hasLoadTutorial = levels[levelID].hasLoadTutorial;
            }
            
            saveData.levels[levelID] = levelData;            
        }
        
        localStorage.setItem("saveData", JSON.stringify(saveData));
    },
    load: function(){
        
        var loadData = {
            currentLevel: this.currentLevel,
            levels: {
                1: {
                    starsNamber: 0,
                    isLock: true,
                    hasLoadTutorial: true
                }
            }
        };
        var levelID, levelData, loadLevelData;
       
        if (localStorage.getItem("saveData")) {
            
            loadData = JSON.parse(localStorage.getItem("saveData"));
            
            this.currentLevel = loadData.currentLevel;
            
            for(levelID in loadData.levels){
                levelData = loadData.levels[levelID];
                
                loadLevelData = PRApp.Levels[levelID];
                loadLevelData.starsNamber = levelData.starsNamber;
                loadLevelData.isLock = levelData.isLock;
                
                if(loadLevelData.tutorial){
                    loadLevelData.hasLoadTutorial = levelData.hasLoadTutorial;
                }
                
                 PRApp.Levels[levelID] = loadLevelData;
            }
        }
    }
};
