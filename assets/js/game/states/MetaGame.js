PRApp.MetaGame = function() {

};

PRApp.MetaGame.prototype = {
    textureKey: "metagame_ui",
    isDev: true,
    create: function() { 
        
        this.mapItemsByID = {};
        this.la = this.game.add.group();
      
        this.mapLayer = this.game.add.group();
        this.la.add(this.mapLayer);
        
        this.board = this.game.add.sprite(this.game.world.centerX, 0, this.textureKey, PRApp.resources.metageme_ui.pop_up_board);
        this.board.anchor.setTo(0.5, 0);        

        this.moreGamesButton = this.game.add.button(this.game.world.centerX, this.board.height / 100 * 60, this.textureKey, this.openWindowMoreGames, this, PRApp.resources.metageme_ui.btn_pop_up_more_games_bg, PRApp.resources.metageme_ui.btn_pop_up_more_games_bg, PRApp.resources.metageme_ui.btn_pop_up_more_games_bg_tap, PRApp.resources.metageme_ui.btn_pop_up_more_games_bg);
        this.moreGamesButton.input.useHandCursor = true;
        this.moreGamesButton.anchor.setTo(0.5);
        this.moreGamesText = this.game.add.text(this.moreGamesButton.x, this.moreGamesButton.y, "More games", {
        font: "15px Patua One",
        fill: "#ffffff",
        align: "center"});
    
        this.moreGamesText.anchor.setTo(0.5, 0.5);
        
        this.musicOnButton = this.game.add.button(this.game.world.centerX + this.board.width / 100 * 35, this.board.height / 100 * 35, this.textureKey, this.musicMuteSwitch, this, PRApp.resources.metageme_ui.pop_up_icon_music_on, PRApp.resources.metageme_ui.pop_up_icon_music_on, PRApp.resources.metageme_ui.pop_up_icon_music_on_tap, PRApp.resources.metageme_ui.pop_up_icon_music_on);
        this.musicOnButton.input.useHandCursor = true;
        this.musicOffButton = this.game.add.button(this.game.world.centerX + this.board.width / 100 * 35, this.board.height / 100 * 35, this.textureKey, this.musicMuteSwitch, this, PRApp.resources.metageme_ui.pop_up_icon_music_off, PRApp.resources.metageme_ui.pop_up_icon_music_off, PRApp.resources.metageme_ui.pop_up_icon_music_off_tap, PRApp.resources.metageme_ui.pop_up_icon_music_off);
        this.musicOffButton.input.useHandCursor = true;
        
        if (PRApp.isMusicMute) {
            this.musicOnButton.visible = false;
            this.musicOffButton.visible = true;
        } else {
            this.musicOnButton.visible = true;
            this.musicOffButton.visible = false;
        }

        this.soundOnButton = this.game.add.button(this.game.world.centerX + this.board.width / 100 * 29, this.board.height / 100 * 35, this.textureKey, this.soundMuteSwitch, this, PRApp.resources.metageme_ui.pop_up_icon_sound_on, PRApp.resources.metageme_ui.pop_up_icon_sound_on, PRApp.resources.metageme_ui.pop_up_icon_sound_on_tap, PRApp.resources.metageme_ui.pop_up_icon_sound_on);
        this.soundOnButton.input.useHandCursor = true;
        this.soundOfButton = this.game.add.button(this.game.world.centerX + this.board.width / 100 * 29, this.board.height / 100 * 35, this.textureKey, this.soundMuteSwitch, this, PRApp.resources.metageme_ui.pop_up_icon_sound_off, PRApp.resources.metageme_ui.pop_up_icon_sound_off, PRApp.resources.pop_up_icon_sound_off_tap, PRApp.resources.metageme_ui.pop_up_icon_sound_off);
        this.soundOfButton.input.useHandCursor = true;

        if (PRApp.isSoundMute) {
            this.soundOnButton.visible = false;
            this.soundOfButton.visible = true;
        } else {
            this.soundOnButton.visible = true;
            this.soundOfButton.visible = false;
        }
        
		
		if ( PRApp.APIData && PRApp.APIData.logo.image ) {
			var logo = this.game.add.sprite( (this.board.x - this.board.width / 2)  + this.board.width / 100 * 9, this.board.height / 100 * 60, "logo" );
			logo.scale.x = logo.scale.y = 1 / (logo.height / (this.board.height / 100 * 40));
			logo.anchor.y = 0.5;
			logo.inputEnabled = true;
			logo.input.useHandCursor = true;    
			logo.events.onInputDown.add(PRApp.APIData.logo.action, this);
		}

        this.background = this.game.add.sprite(0, 0, PRApp.resources.backgrounds.backgroundMetaGame);
        this.background.scale.x = this.background.scale.y = 1 / (this.background.texture.width / 700);
        this.background.y -= this.background.height - 600;
        this.background.inputEnabled = true;
        this.background.input.enableDrag();
        this.background.input.allowHorizontalDrag = false;

        this.mapLayer.add(this.background);
        
        var backgroundItems = PRApp.MetaGameConfig.backgroundItems;
        var bgItemId, bgItem, bgItemSprite;
        
        for(bgItemId in backgroundItems){
           
            bgItem = backgroundItems[bgItemId];

            if (!PRApp.Levels[bgItem.start].isLock) {
                if (bgItem.end) {
                    if (PRApp.Levels[bgItem.end].isLock) {
                        bgItemSprite = this.game.add.sprite(0, this.background.y, PRApp.resources.backgrounds[bgItemId]);
                    }
                } else {
                    bgItemSprite = this.game.add.sprite(0, this.background.y, PRApp.resources.backgrounds[bgItemId]);
                }

                if (bgItemSprite) {
                    this.mapLayer.add(bgItemSprite);
                    bgItemSprite = null;
                }
            } 
        }

        this.createMap();

        this.minY = this.background.y;
        this.maxY = 0;
        this.oldY = this.background.y;
        
        PRApp.playMusic(PRApp.resources.audio.surfside_breeze_full);

        this.setCenterToCurrentLevel();
    },
    createMap: function() {

        var itemsConfig = PRApp.MetaGameConfig.items;
        var item, i, l, levelData;

        for (i = 0, l = itemsConfig.length; i < l; i += 1) {
            levelData = PRApp.Levels[itemsConfig[i].id];
            item = new PRApp.MapItem(itemsConfig[i], levelData, this.game, this.mapLayer);

            this.mapItemsByID[item.ID] = item;
        }
        /*
        this.unlockMapItem(1);
        this.unlockMapItem(2);
        this.unlockMapItem(3);
        this.unlockMapItem(4);
        this.unlockMapItem(5);
        this.unlockMapItem(6);
        this.unlockMapItem(7);
        this.unlockMapItem(8);
        this.unlockMapItem(9);
        this.unlockMapItem(10);
        this.unlockMapItem(11);
        this.unlockMapItem(12);
        this.unlockMapItem(13);
        this.unlockMapItem(14);
        this.unlockMapItem(15);
        this.unlockMapItem(16);
        this.unlockMapItem(17);
        this.unlockMapItem(18);
        this.unlockMapItem(19);
        this.unlockMapItem(20);
        this.unlockMapItem(21);
        this.unlockMapItem(22);
        this.unlockMapItem(23);
        this.unlockMapItem(24);
        this.unlockMapItem(25);
        this.unlockMapItem(26);
        this.unlockMapItem(27);
        this.unlockMapItem(28);
        this.unlockMapItem(29);
        this.unlockMapItem(30);*/

    },
    unlockMapItem: function(itemID) {
        
        if (this.mapItemsByID[itemID]) {
            this.mapItemsByID[itemID].unlocked();
        }
        
    },
    openWindowMoreGames: function(){
        PRApp.playSound(PRApp.resources.sounds.click);
		PRApp.moreGames();
    },
    soundMuteSwitch: function() {
        if (PRApp.soundMuteSwitch()) {
            this.soundOnButton.visible = false;
            this.soundOfButton.visible = true;
        } else {
            this.soundOnButton.visible = true;
            this.soundOfButton.visible = false;
        }
        PRApp.playSound(PRApp.resources.sounds.click);
    },
    musicMuteSwitch: function() {
        if (PRApp.soundMusicSwitch()) {
            this.musicOnButton.visible = false;
            this.musicOffButton.visible = true;
        } else {
            this.musicOnButton.visible = true;
            this.musicOffButton.visible = false;
        }
        PRApp.playSound(PRApp.resources.sounds.click);
    },
    update: function() {
        
        var dy, i, l;
        
        if(this.input.activePointer.isDown){
           // this.moveMap(this.input.activePointer);
        }

        if (this.background.y < this.minY) {
            this.background.y = this.minY;
        }
        if (this.background.y > this.maxY) {
            this.background.y = this.maxY;
        }

        if (this.background.y !== this.oldY) {

            dy = this.oldY - this.background.y;

            for (i = 0, l = this.mapLayer.children.length; i < l; i += 1) {
                if (this.mapLayer.children[i] !== this.background) {
                    this.mapLayer.children[i].y -= dy;
                    
                    if (this.isDev) {
                        if (this.mapLayer.children[i].ID) {
                            PRApp.MetaGameConfig.items[this.mapLayer.children[i].ID - 1].x = this.mapLayer.children[i].x;
                            PRApp.MetaGameConfig.items[this.mapLayer.children[i].ID - 1].y = -(this.background.height - (Math.abs(this.background.y) + this.mapLayer.children[i].y) - 600);
                        }
                    }

                }
            }
            if (this.isDev) {
                console.log(JSON.stringify(PRApp.MetaGameConfig.items));
            }

            this.oldY = this.background.y;
        }
    },
    moveMap: function(pointer){
        
        var unitHeight = PRApp.SCREEN_HEIGHT / 100;
        var dy = 0;
        var  speed = 10;
        
        if (pointer.y <= unitHeight * 25) {
            dy = speed * this.game.time.deltaCap;
        } else if(pointer.y >= unitHeight * 85){
            dy = -speed * this.game.time.deltaCap;
        }    

        this.background.y += dy;
        
    },
    render: function()  {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");   
    },
    setCenterToCurrentLevel: function(){
        
        var i, l;
        var curretnLevel = PRApp.currentLevel;        
        var currentPositionY = 0;
        var halfGameHeight = PRApp.gameHeight / 2;
                
                 for (i = 0, l = this.mapLayer.children.length; i < l; i += 1) {
                     if (this.mapLayer.children[i].ID && this.mapLayer.children[i].ID === curretnLevel) {
                         currentPositionY = this.mapLayer.children[i].y;
                         break;
                    }
                }
        if(currentPositionY < 0){
            currentPositionY = this.background.height - PRApp.gameHeight - Math.abs(currentPositionY);
        } else {
            currentPositionY = this.background.height - PRApp.gameHeight + currentPositionY; 
        } 
        
        if (currentPositionY < halfGameHeight) {
            this.background.y = halfGameHeight;
        } else if (currentPositionY <= this.background.height - halfGameHeight) {
            this.background.y = -(currentPositionY - halfGameHeight);
        }
    }
};


