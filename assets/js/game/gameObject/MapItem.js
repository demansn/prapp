PRApp.MapItem = function(config, levelData, game, owner) {
    
    var TEXTURE_KEY = "metagame_ui";
    var type = PRApp.ObjectTypes.mapItems[config.typeID];
    
    this.ID = config.id;
    this.isLocked = levelData.isLock;
    this.starsNumber = levelData.starsNamber;

    this.item = game.add.group();
    this.item.x = config.x;
    this.item.y = config.y;
    
    owner.add(this.item);

    this.background = game.add.sprite(0, 0, TEXTURE_KEY, type.background);
    this.background.inputEnabled = true;    
    this.background.events.onInputUp.add(this.onInputUp, this);

    if (this.isDev) {
        this.background.x = config.x;
        this.background.y = config.y;
        this.background.ID = this.ID;
        this.background.input.enableDrag(true);
        owner.add(this.background);
    } else {
        this.item.add(this.background);
        this.item.ID = this.ID;
    }    

    this.starsBackground = game.add.sprite(this.background.width / 2, this.background.height - this.background.height / 100 * 43, TEXTURE_KEY, PRApp.resources.metageme_ui.bg_stars);
    this.starsBackground.scale.setTo(type.scale, type.scale);
    this.starsBackground.anchor.x = 0.5;
    this.item.add(this.starsBackground);

    this.star1 = game.add.sprite(this.background.width / 2, this.background.height - this.background.height / 100 * 43, TEXTURE_KEY, PRApp.resources.metageme_ui.star);
    this.star1.scale.setTo(type.scale, type.scale);
    this.star1.anchor.x = 0.985;
    this.star1.visible = false;
    this.item.add(this.star1);

    this.star2 = game.add.sprite(this.background.width / 2, this.background.height - this.background.height / 100 * 43, TEXTURE_KEY, PRApp.resources.metageme_ui.star);
    this.star2.scale.setTo(type.scale, type.scale);
    this.star2.anchor.x = 0.5;
    this.star2.visible = false;
    this.item.add(this.star2);

    this.star3 = game.add.sprite(this.background.width / 2, this.background.height - this.background.height / 100 * 43, TEXTURE_KEY, PRApp.resources.metageme_ui.star);
    this.star3.scale.setTo(type.scale, type.scale);
    this.star3.anchor.x = 0.02;
    this.star3.visible = false;
    this.item.add(this.star3);

    this.text = game.add.sprite(this.background.width / 2, this.background.height / 2, TEXTURE_KEY, config.text);
    this.text.scale.setTo(type.scale, type.scale);
    this.text.anchor.setTo(0.5, 0.85);
    this.item.add(this.text);

    this.lock = game.add.sprite(0, 0, TEXTURE_KEY, type.lock);
    this.item.add(this.lock);    
   
    this.updateVisible();
};

PRApp.MapItem.prototype = {    
    ID: true,
    isDev: false,
    isLocked: true,
    starsNumber: 0,
    starsBackground: null,
    item: null,
    lock: null,
    star1: null,
    star2: null,
    star3: null,
    background: null,    
    unlocked: function() {
        this.isLocked = false;
        this.updateVisible();
    },
    onInputUp: function() {
        
        if (!this.isLocked) {            
            if (!this.isDev) {
                PRApp.playSound(PRApp.resources.sounds.click);
                PRApp.loadLevel(this.ID);                
            } 
        }
        
       
    },
    updateVisible: function() {

        if (this.isLocked) {
            this.background.visible = false;
            this.starsBackground.visible = false;
            this.star1.visible = false;
            this.star2.visible = false;
            this.star3.visible = false;
            this.lock.visible = true;            
        } else {
            this.background.visible = true;
            this.starsBackground.visible = true;
            this.lock.visible = false;

            if (this.starsNumber > 0) {
                this.star1.visible = true;
            }

            if (this.starsNumber > 1) {
                this.star2.visible = true;
            }

            if (this.starsNumber > 2) {
                this.star3.visible = true;
            }
        }
    }
};



