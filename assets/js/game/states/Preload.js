PRApp.Preload = function() {};
PRApp.Preload.prototype = {   
    imgSrc: "assets/img/ui_source",
    bgsSrc: "assets/img/bgs/",
    animSRC: "assets/img/animations/",
    audioSRC: "assets/audio/",
    init: function() {        
  
      PRApp.init();

    },
    preload: function() {

        var id, res, resources = PRApp.resources;

        for (id in resources.image) {
            if (resources.image.hasOwnProperty(id)) {
                this.game.load.image(resources.image[id].id, resources.image[id].src);
            }
        }
        
         for (id in resources.backgrounds) {
            if (resources.backgrounds.hasOwnProperty(id)) {
                this.game.load.image(resources.backgrounds[id], this.bgsSrc + resources.backgrounds[id]);
            }
        }
        if (PRApp.isEnableSpriteAnimation) {
            for (id in resources.animations) {
                if (resources.animations.hasOwnProperty(id)) {
                    this.game.load.atlasJSONArray(resources.animations[id], this.animSRC + resources.animations[id] + ".png", this.animSRC + resources.animations[id] + ".json");
                }
            }
        }
        
        for (id in resources.audio) {
            if (resources.audio.hasOwnProperty(id)) {
                this.game.load.audio(resources.audio[id], [this.audioSRC + resources.audio[id] + ".mp3", this.audioSRC + resources.audio[id] + ".ogg"], true);
            }
        }

        for (id in resources.sprie) {
            if (resources.sprie.hasOwnProperty(id)) {
                res = resources.sprie[id];
                this.game.load.spritesheet(res.id, res.src, res.frameWidth, res.frameHeight, res.frameMax);
            }
        }
        this.game.load.image("btn_pl", this.imgSrc + "/btn_pl.png");
        this.game.load.atlasJSONArray('ui', "assets/img/ui_source/ui.png", "assets/img/ui_source/ui.json");
        this.game.load.atlasJSONArray('metagame_ui', "assets/img/metagame_ui.png", "assets/img/metagame_ui.json");
        this.game.load.atlasJSONArray('pieces', "assets/img/pieces.png", "assets/img/pieces.json");
        this.game.load.image("particle", "assets/img/TorqueX_Particle_Effect_Guide_candle.png");
        //  Load the Google WebFont Loader script
        this.game.load.script('webfont', '/ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		
		if ( PRApp.APIData && PRApp.APIData.logo.image ) {
			this.game.load.image( "logo", PRApp.APIData.logo.image );
		}

        this.progressText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "moves",{
            font: '16px Areal',
            fontWeight: 'bold',
            fill: '#ffffff'
        });        
        this.progressText.anchor.set(0.5, 0.5);
        
        console.log("Start game loading.");
        
    },
    create: function() {
        
        this.updateProgress(100);
        PRApp.createSounds();
        PRApp.load();
        this.game.state.start(PRApp.STATE.MAIN_MENU);
		
		var splashScreen = document.getElementById('spilgames-splash-screen');
		
		if(splashScreen){
			splashScreen.classList.add('spilgames-splash-screen-gone');
		}
    },   
    loadUpdate: function() {
        this.updateProgress(this.game.load.progress);
    },
    updateProgress: function(progress) {
        console.log("Loading progress: " + progress);
        this.progressText.text = "Loading progress: " + progress;      
    }
};