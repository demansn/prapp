PRApp.MainMenu = function() {

};
PRApp.MainMenu.prototype = {
    layer: null,
    create: function() {
        this.game.time.advancedTiming = true;
        this.layer = this.game.add.group();

        var background = this.game.add.sprite(0, 0, PRApp.resources.backgrounds.title_screen_fbg);
        background.scale.x = 1 / (background.texture.width / PRApp.SCREEN_WIDTH);
        background.scale.y = 1 / (background.texture.height / PRApp.SCREEN_HEIGHT);
        
        var btn_play = this.game.add.button(this.game.world.centerX - 50, this.game.world.centerY - 50, 'btn_pl', function() {
            PRApp.playSound(PRApp.resources.sounds.click);
            this.game.state.start(PRApp.STATE.META_GAME);
        }, this, 1, 1, 1);
        btn_play.scale.x = btn_play.scale.y = 1 / (btn_play.texture.width / 100);
        btn_play.input.useHandCursor = true;
        
        this.layer.add(background);
        this.layer.add(btn_play);
        
        PRApp.playMusic(PRApp.resources.audio.maui_sun_full);
        
    },
    init: function() {
        if (this.layer) {
            this.layer.visible = true;
        }
    },   
    shutdown: function() {
        this.layer.visible = false;
       // PRApp.music.stop();
    },
    render: function()  {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");   
    },
    pause: function(){
        alert("dsdf");
    }
};

