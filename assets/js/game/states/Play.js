PRApp.Play = function() {

};
PRApp.Play.prototype = {
    moveCounter: 0,
    goalsView: [],
    counterDestroyedPiecesByTypeID: {},
    movesCounterText: null,
    goalTypes: {}, 
    goals: {},
    isFinished: null,
    currentActionTutorial: 0,
    btnTextStyle: {
        font: "17px Patua One",
        fill: "#ffffff",
        align: "center",
        stroke: '#228B22',
        strokeThickness: 4
    },
    goalTextNumberStyle: {
        font: '17px Patua One',
        fontWeight: 'bold',
        fill: '#ffffff',
        stroke: '#8B7765',
        strokeThickness: 2
    },
    levelTextStyle: {
        font: '50px Patua One',
        fontWeight: 'bold',
        fill: '#ffffff',
        stroke: '#8B5742',
        strokeThickness: 10
    },
    goalsTextStyle: {
        font: '30px Patua One',
        fontWeight: 'bold',
        fill: '#ffffff',
        stroke: '#8B5742',
        strokeThickness: 10
    },
    movesCounterTextStyle: {
        font: '50px Patua One',
        fontWeight: 'bold',
        fill: '#8B5742',
        stroke: '#000000',
        strokeThickness: 1
    },
    movesTextStyle: {
        font: '16px Patua One',
        fontWeight: 'bold',
        fill: '#8B5742'
    },
    create: function() {

        this.moveCounter = 0;
        this.isFinished = false;
        this.layer = this.game.add.group();
        this.levelData = PRApp.Levels[PRApp.currentLevel];
        this.goals = {};     
        this.moves = this.levelData.moves;
        this.counterDestroyedPiecesByTypeID = {};
        this.movesCounterLayer = this.game.add.group();

        this.goalTypes = {
            collectPieces: "collectPieces",
            collectPoints: "collectPoints"
        };


        this.backgound = this.game.add.sprite(0, 0, this.levelData.background);
        this.backgound.scale.x = 1 / (this.backgound.texture.width / PRApp.SCREEN_WIDTH);
        this.backgound.scale.y = 1 / (this.backgound.texture.height / PRApp.SCREEN_HEIGHT);
        this.backgound.z = -1;
        this.backgound.parent.addChildAt(this.backgound, 0);

       /* this.menuButton = this.game.add.button(330, 5, "ui", this.backToMenu, this, PRApp.resources.img.btn_menu_bg, PRApp.resources.img.btn_menu_bg, PRApp.resources.img.btn_menu_bg_tap, PRApp.resources.img.btn_menu_bg);
        this.menuButton.input.useHandCursor = true;
        this.menuText = this.game.add.text(this.menuButton.x + this.menuButton.width / 2, this.menuButton.y + this.menuButton.height / 2, "Menu", this.btnTextStyle);
        this.menuText.anchor.setTo(0.5, 0.6);

        this.moreGamesButton = this.game.add.button(415, 5, "ui", this.openWindowMoreGames, this, PRApp.resources.img.btn_more_games_bg, PRApp.resources.img.btn_more_games_bg, PRApp.resources.img.btn_more_games_bg_tap, PRApp.resources.img.btn_more_games_bg);
        this.moreGamesButton.input.useHandCursor = true;
        this.moreGamesText = this.game.add.text(this.moreGamesButton.x + this.moreGamesButton.width / 2, this.moreGamesButton.y + this.moreGamesButton.height / 2, "More games", this.btnTextStyle);
        this.moreGamesText.anchor.setTo(0.5, 0.6);*/
        //this.moreGamesButton.input.pixelPerfectOver = true;
       
        this.musicOnButton = this.game.add.button(570, 10, "ui", this.musicMuteSwitch, this, PRApp.resources.img.icon_music_on, PRApp.resources.img.icon_music_on, PRApp.resources.img.icon_music_on_tap, PRApp.resources.img.icon_music_on);
        this.musicOnButton.input.useHandCursor = true;
        this.musicOffButton = this.game.add.button(570, 10, "ui", this.musicMuteSwitch, this, PRApp.resources.img.icon_music_off, PRApp.resources.img.icon_music_off, PRApp.resources.img.icon_music_off_tap, PRApp.resources.img.icon_music_off);
        this.musicOffButton.input.useHandCursor = true;
        
        if (PRApp.isMusicMute) {
            this.musicOnButton.visible = false;
            this.musicOffButton.visible = true;
        } else {
            this.musicOnButton.visible = true;
            this.musicOffButton.visible = false;
        }

        this.soundOnButton = this.game.add.button(610, 10, "ui", this.soundMuteSwitch, this, PRApp.resources.img.icon_sound_on, PRApp.resources.img.icon_sound_on, PRApp.resources.img.icon_sound_on_tap, PRApp.resources.img.icon_sound_on);
        this.soundOnButton.input.useHandCursor = true;
        this.soundOfButton = this.game.add.button(610, 10, "ui", this.soundMuteSwitch, this, PRApp.resources.img.icon_sound_off, PRApp.resources.img.icon_sound_off, PRApp.resources.img.icon_sound_off_tap, PRApp.resources.img.icon_sound_off);
        this.soundOfButton.input.useHandCursor = true;

        if (PRApp.isSoundMute) {
            this.soundOnButton.visible = false;
            this.soundOfButton.visible = true;
        } else {
            this.soundOnButton.visible = true;
            this.soundOfButton.visible = false;
        }

        this.exitButton = this.game.add.button(650, 10, "ui", this.initQuitPopUp, this, PRApp.resources.img.icon_close, PRApp.resources.img.icon_close, PRApp.resources.img.icon_close_tap, PRApp.resources.img.icon_close);
        this.exitButton.input.useHandCursor = true;
        
        this.movesCounterBg = this.game.add.sprite(5, 10, "ui", PRApp.resources.img.moves_counter_bg);
        this.movesCounterLayer.add(this.movesCounterBg);
        
        this.movesCounterStarsFull = this.game.add.sprite(this.movesCounterBg.x + this.movesCounterBg.width / 2, this.movesCounterBg.y - 5 + this.movesCounterBg.height / 2, "ui", PRApp.resources.img.moves_counter_stars_full);
        this.movesCounterStarsFull.anchor.setTo(0.5, 0.5);     
        this.movesCounterLayer.add(this.movesCounterStarsFull);
         
        this.movesCounterStarsEmpty = this.game.add.sprite(-1000, -1000, "ui", PRApp.resources.img.moves_counter_stars_empty);       
       
        this.setProgressToStars(100);

        this.movesCounterText = this.game.add.text(this.movesCounterBg.x + this.movesCounterBg.width / 2, this.movesCounterBg.y + 30, "0", this.movesCounterTextStyle);
        this.movesCounterText.anchor.x = 0.5;
        this.movesCounterLayer.add(this.movesCounterText);
         
        this.movesText = this.game.add.text(this.movesCounterBg.x + this.movesCounterBg.width / 2, this.movesCounterBg.y + 80, "moves", this.movesTextStyle);
        this.movesText.anchor.x = 0.5;
        this.movesCounterLayer.add(this.movesText);

        this.goalsLayer = this.game.add.group();
        this.movesCounterLayer.add(this.goalsLayer);
        
        this.board = new PRApp.Board(this, this.game, this.layer, this.levelData);       

        this.initGoals();
        this.initStartPopUp(); 
        this.movesCounterText.setText(this.moves - this.moveCounter);   
        this.setInputEnable(false);
		
		if ( PRApp.APIData && PRApp.APIData.logo.image ) {
			var logo = this.game.add.sprite( 0, 0, "logo" );
			logo.scale.x = logo.scale.y = 1 / (logo.height / (this.game.height / 100 * 7));
			logo.x = (logo.width / 100 * 5);
			logo.y = this.game.height - logo.height - (logo.width / 100 * 5);
			logo.inputEnabled = true;
			logo.input.useHandCursor = true;    
			logo.events.onInputDown.add(PRApp.APIData.logo.action, this);
		}
        
    },
    
    setProgressToStars: function(progress){        
        
        var size = this.movesCounterStarsEmpty.width,
                star = 360 - 253,
                start = 253, end = -star,
                deltaStar1 = 93,
                deltaStar2 = 86,
                deltaStar3 = 95,
                s1 = 26, s2 = 29,
                endAngle = 0,
                maska, image;
        
        maska = this.game.make.bitmapData(this.movesCounterStarsEmpty.width, this.movesCounterStarsEmpty.height);
        maska.ctx.fillStyle = 0xffff00; 
        maska.ctx.beginPath();
        
        if(progress <= 100 && progress >= 66){            
            endAngle = start - ((deltaStar1 / 33) * (100 - progress));
        } else if(progress < 66 &&  progress >= 33){
            endAngle = start - (deltaStar1 + s1) - ((deltaStar2 / 33) * (66 - progress));
        } else if( progress < 33 && progress > 1){
            endAngle = start - (deltaStar1 + s1) - (deltaStar2 + s2) - ((deltaStar3 / 33) * (33 - progress));
        } else {
            endAngle = end;
        }
        
        maska.ctx.arc(maska.width / 2, maska.height / 2, size / 2,  Phaser.Math.degToRad (-star), Phaser.Math.degToRad(endAngle), false);
       
        maska.ctx.strokeStyle = '#FFFF00';
        maska.ctx.lineWidth = 34;
        maska.ctx.stroke();
        maska.ctx.closePath();
        
        image = this.game.make.bitmapData(this.movesCounterStarsEmpty.width, this.movesCounterStarsEmpty.height);
        image.alphaMask(maska, this.movesCounterStarsEmpty);
        // console.log( image.getPixels(new Phaser.Rectangle(0,0, this.movesCounterStarsEmpty.width, this.movesCounterStarsEmpty.height)));
        /*image.processPixelRGB(function(pixel){
            
            if(pixel.r === 255 && pixel.g === 255 && pixel.b === 0){
                pixel.a = 1;             
            }
             
            return pixel;
        }, this);       */ 
       // image.replaceRGB(255, 255, 0, 0, 0, 0, 0, 255);
        if(this.movesCounterStars){
          this.movesCounterStars.destroy();  
        }
        
        this.movesCounterStars = this.game.add.image(this.movesCounterStarsFull.x, this.movesCounterStarsFull.y, image);
        this.movesCounterStars.anchor.set(0.5, 0.5);        
        this.movesCounterLayer.add(this.movesCounterStars);
    },    
    play: function() {
        this.startPopUp.visible = false;
        
        if(this.levelData.hasLoadTutorial){
            this.initTutorial();
        } else {
            this.board.playAnimtionPieces();
            this.setInputEnable(true);
        }
        
        PRApp.resetCursor();
        PRApp.playSound(PRApp.resources.sounds.click);
    },
    continue: function() {
        this.finishPopUp.visible = false;
        PRApp.playSound(PRApp.resources.sounds.click);
        this.game.state.start(PRApp.STATE.META_GAME);
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
    backToMenu: function() {  
        PRApp.playSound(PRApp.resources.sounds.click);
        this.game.state.start(PRApp.STATE.META_GAME);
    },    
    onWaitFinisheActions: function() {
        this.isWait = true;
    },
    offWaitFinisheActions: function() {
        this.isWait = false;
    },
    checkCompletionGoals: function(){
        
        var i,
                l,
                goal,
                goalCompleteCountre = 0;
        
        for (i = 0, l = this.goals.length; i < l; i += 1) {

                goal = this.goals[i];

                switch (goal.id) {

                    case this.goalTypes.collectPieces:
                        if (this.counterDestroyedPiecesByTypeID[goal.piceTypeID] >= goal.number) {
                            goalCompleteCountre += 1;
                        }
                        break;
                }
            }            
            
            return (goalCompleteCountre === this.goals.length);
    },
    update: function() {       

        if(!this.isFinished){           

            this.board.checkUserInputUp();
            
            if (this.checkCompletionGoals()) {
                if (!this.isWait) {
                    this.completeLevel();
                    this.isFinished = true;
                }
            }
        }

    },
    render: function()  {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");   
    },   
    shotdown: function() {

    },
    addUnitToMoveCounter: function() {

        this.moveCounter += 1;

        this.movesCounterText.setText(this.moves - this.moveCounter);  
        
        this.setProgressToStars(100 - (this.moveCounter / this.moves * 100));
    },   
    onEventDestroyedPieces: function(destroyedPieces) {

        var pieceTypeID = null,
                number = 0;

        for (pieceTypeID in destroyedPieces) {

            number = destroyedPieces[pieceTypeID];

            if (!this.counterDestroyedPiecesByTypeID[pieceTypeID]) {
                this.counterDestroyedPiecesByTypeID[pieceTypeID] = 0;
            }

            this.counterDestroyedPiecesByTypeID[pieceTypeID] += number;

            if (this.goalsView[pieceTypeID] && !this.goalsView[pieceTypeID].isDone) {

                this.goalsView[pieceTypeID].currentNumber = this.goalsView[pieceTypeID].currentNumber - number;

                if (this.goalsView[pieceTypeID].currentNumber > 0) {
                    this.goalsView[pieceTypeID].number.setText(this.goalsView[pieceTypeID].currentNumber + " / " + this.goalsView[pieceTypeID].fullNumber);
                } else {
                    this.goalsView[pieceTypeID].number.setText("0/" + this.goalsView[pieceTypeID].fullNumber);
                    this.goalsView[pieceTypeID].number.visible = false;
                    this.goalsView[pieceTypeID].check.visible = true;
                    this.goalsView[pieceTypeID].isDone = true;
                }
            }

        } 
    },    
    completeLevel: function() {   
        
        var starts = 0, 
                ms = (this.moves - this.moveCounter);
        
        if (ms >= this.moves / 3 * 2) {
            starts = 3;
        } else if (ms >= this.moves / 3) {
            starts = 2;
        } else if (ms < this.moves / 3 && ms > 0) {
            starts = 1;
        } 
        
        PRApp.Levels[PRApp.currentLevel].starsNamber = starts;
        PRApp.Levels[PRApp.currentLevel + 1].isLock = false;
        
        this.initFinishPopUp(starts);
        
        PRApp.save();
    },
    initGoals: function() {

        var text, 
            y = this.movesCounterBg.x + this.movesCounterBg.width + 15, 
            goalView = {
                number: null,
                check: null,
                piece: null,
                group: null,
                currentNumber: 0,
                fullNumber: 0,
                isDone: false
            },
            i = 0, l = 0;

        this.goalsLayer.removeAll();
        this.goalsView = {};
        this.goals = this.levelData.goals;

        for (i = 0, l = this.goals.length; i < this.goals.length; i += 1) {

            goalView = {
                number: this.game.add.text(5, 5, this.goals[i].number + "/" + this.goals[i].number, this.goalTextNumberStyle),
                check: this.game.add.sprite(0, 0, "ui", PRApp.resources.img.item_counter_tick),
                piece: this.game.add.sprite(0, 0, "pieces", PRApp.ObjectTypes.pieces[this.goals[i].piceTypeID].spriteID),
                background: this.game.add.sprite(0, 0, "ui", PRApp.resources.img.item_counter_bg),
                group: this.game.add.group(),
                currentNumber: this.goals[i].number,
                fullNumber: this.goals[i].number,
                isDone: false
            };

            goalView.group.x = 5;
            goalView.group.y = y;
            goalView.group.add(goalView.background);
            goalView.group.add(goalView.number);
            goalView.group.add(goalView.check);
            goalView.group.add(goalView.piece);
            this.goalsLayer.add(goalView.group);
            
         
            goalView.piece.scale.x = goalView.piece.scale.y = 1 / (goalView.piece.height / ((goalView.background.height / 100) * 80));
            goalView.piece.x = 15;
            goalView.piece.y = goalView.background.height / 2;
            goalView.piece.anchor.y = 0.525;

            goalView.check.x = goalView.background.width - goalView.check.width - 20;
            goalView.check.y = (goalView.background.height / 2) - (goalView.check.height / 2);
            goalView.check.visible = false;

            text = goalView.number;    
            text.align = 'center';
            text.x = goalView.check.x - 13;
            text.y = goalView.background.height / 2;
            text.anchor.y = 0.525;
            text.setText(this.goals[i].number + "/" + this.goals[i].number);
            text.wordWrap = 5;

            y += goalView.background.height + 10;

            this.goalsView[this.goals[i].piceTypeID] = goalView;
        }
    },
    initStartPopUp: function() {

        var bg, levelText, goalsText, btnPlay, playText, goal, goalPiece, goalText, dx, goalX,
            goals = this.levelData.goals,
            levelTextStyle = {
                font: '50px Patua One',
                fontWeight: 'bold',
                fill: '#ffffff',
                stroke: '#8B5742',
                strokeThickness: 10
            },
            goalsTextStyle = {
                font: '30px Patua One',
                fontWeight: 'bold',
                fill: '#ffffff',
                stroke: '#8B5742',
                strokeThickness: 10
            },
            playTextStyle = {
                font: '25px Patua One',
                //fontWeight: 'bold',
                fill: '#ffffff',
               // stroke: '#CD5C5C',
               // strokeThickness: 8
            },
            goalTextNumberStyle = {
                font: '20px Patua One',
                fontWeight: 'bold',
                fill: '#ffffff',
                stroke: '#8B5742',
                strokeThickness: 7
            },
            i = 0, l = 0;

        this.startPopUp = this.game.add.group();

        bg = this.game.add.sprite(0, 0, "ui", PRApp.resources.img.popup_bg);
        bg.x = this.game.world.centerX - bg.width / 2;
        bg.y = this.game.world.centerY - bg.height / 2;
        this.startPopUp.add(bg);

        levelText = this.game.add.text(this.game.world.centerX, 140, "Level " + PRApp.currentLevel, levelTextStyle);
        levelText.anchor.setTo(0.5, 0.5);
        this.startPopUp.add(levelText);

        goalsText = this.game.add.text(this.game.world.centerX, 195, "Goals:", goalsTextStyle);
        goalsText.anchor.setTo(0.5, 0.5);
        this.startPopUp.add(goalsText);

        btnPlay = this.game.add.button(0, 0, "ui", this.play, this, PRApp.resources.img.btn_play_continue_bg, PRApp.resources.img.btn_play_continue_bg, PRApp.resources.img.btn_play_continue_bg_tap, PRApp.resources.img.btn_play_continue_bg);
        btnPlay.x = this.game.world.centerX - btnPlay.width / 2;
        btnPlay.y = 360;
        btnPlay.input.useHandCursor = true;
        this.startPopUp.add(btnPlay);

        playText = this.game.add.text(btnPlay.x + btnPlay.width / 2, btnPlay.y + btnPlay.height / 2, "Play", playTextStyle);
        playText.anchor.setTo(0.5, 0.5);
        this.startPopUp.add(playText);

        for (i = 0, l = goals.length; i < l; i += 1) {

            goal = this.game.add.group();

            goal.y = 270;

            goalPiece = this.game.add.sprite(0, 0, "pieces", PRApp.ObjectTypes.pieces[goals[i].piceTypeID].spriteID);
            goalPiece.scale.x = goalPiece.scale.y = 1 / (goalPiece.height / ((bg.height / 100) * 15));
            goalPiece.anchor.setTo(0.5, 0.5);
            goal.add(goalPiece);

            goalText = this.game.add.text(0, goalPiece.height / 2 + 15, goals[i].number, goalTextNumberStyle);
            goalText.anchor.setTo(0.5, 0.5);
            goal.add(goalText);

            if (goals.length > 1) {

                if (!dx) {
                    dx = goalPiece.width + 15;
                }

                if (!goalX) {
                    if (this.goals.length % 2 > 0) {
                        goalX = this.game.world.centerX - ((this.goals.length - 1) / 2 * dx);
                    } else {
                        goalX = this.game.world.centerX + (dx  / 2 )- (this.goals.length  / 2 * dx);
                    }
                }

                goal.x = goalX;
                goalX += dx;

            } else {
                goal.x = this.game.world.centerX;
            }

            this.startPopUp.add(goal);

        }
    },
    initFinishPopUp: function(starNumber) {

        var winText, bg, btnContinue, continueText, star1, star2, star3;
        var winStyleText = {
            font: '50px Patua One',
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#8B5742',
            strokeThickness: 10
        };
        var continueTextStyle = {
            font: '25px Patua One',
            //fontWeight: 'bold',
            fill: '#ffffff',
            //stroke: '#228B22',
           // strokeThickness: 8
        };

        this.finishPopUp = this.game.add.group();

        bg = this.game.add.sprite(0, 0, "ui", PRApp.resources.img.popup_bg);
        bg.x = this.game.world.centerX - bg.width / 2;
        bg.y = this.game.world.centerY - bg.height / 2;
        this.finishPopUp.add(bg);

        winText = this.game.add.text(this.game.world.centerX, 150, "You win!", winStyleText);
        winText.anchor.setTo(0.5, 0.5);
        this.finishPopUp.add(winText);

        btnContinue = this.game.add.button(0, 0, "ui", this.continue, this, PRApp.resources.img.btn_play_continue_bg, PRApp.resources.img.btn_play_continue_bg, PRApp.resources.img.btn_play_continue_bg_tap, PRApp.resources.img.btn_play_continue_bg);
        btnContinue.x = this.game.world.centerX - btnContinue.width / 2;
        btnContinue.y = 360;
        btnContinue.input.useHandCursor = true;
        this.finishPopUp.add(btnContinue);

        continueText = this.game.add.text(btnContinue.x + btnContinue.width / 2, btnContinue.y + btnContinue.height / 2, "Continue", continueTextStyle);
        continueText.anchor.setTo(0.5, 0.5);
        this.finishPopUp.add(continueText);

        if (starNumber === 3) {
            star1 = this.game.add.sprite(this.game.world.centerX, 191, "ui", PRApp.resources.img.popup_finish_star_big_full);
        } else {
            star1 = this.game.add.sprite(this.game.world.centerX, 191, "ui", PRApp.resources.img.popup_finish_star_big_empty);
        }
        star1.anchor.x = 0.5;
        this.finishPopUp.add(star1);

        if (starNumber > 0) {
            star2 = this.game.add.sprite(0, 230, "ui", PRApp.resources.img.popup_finish_star_small_full);
        } else {
            star2 = this.game.add.sprite(0, 230, "ui", PRApp.resources.img.popup_finish_star_small_empty);
        }
        star2.x = this.game.world.centerX - (star1.width / 2) - star2.width - 20;
        this.finishPopUp.add(star2);

        if (starNumber > 1) {
            star3 = this.game.add.sprite(0, 230, "ui", PRApp.resources.img.popup_finish_star_small_full);
        } else {
            star3 = this.game.add.sprite(0, 230, "ui", PRApp.resources.img.popup_finish_star_small_empty);
        }
        star3.x = this.game.world.centerX + star3.width;
        this.finishPopUp.add(star3);

    },
    initQuitPopUp: function(){
        
        PRApp.playSound(PRApp.resources.sounds.click);
        
        var bg, quitText, btnYes, yesText, btnNo, noText;
        var quitStyleText = {
            font: '35px Patua One',
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#8B5742',
            strokeThickness: 10,
            align: "center"
        };
        var yesTextStyle = {
            font: '30px Patua One',
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#CD5C5C',
            strokeThickness: 8
        };
        
        var noTextStyle = {
            font: '30px Patua One',
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#66CD00',
            strokeThickness: 8
        };
        
        
        this.quitPopUp = this.game.add.group();
        
        bg = this.game.add.sprite(0, 0, "ui", PRApp.resources.img.popup_bg);
        bg.x = this.game.world.centerX - bg.width / 2;
        bg.y = this.game.world.centerY - bg.height / 2;
        this.quitPopUp.add(bg);
        
        quitText = this.game.add.text(this.game.world.centerX, 225, "Really want to quit\nand\nlose your progress?", quitStyleText);
        quitText.anchor.setTo(0.47, 0.5);
        this.quitPopUp.add(quitText);
        
        btnYes = this.game.add.button(0, 0, "ui", this.backToMenu, this, PRApp.resources.img.btn_quit_yes_bg, PRApp.resources.img.btn_quit_yes_bg, PRApp.resources.img.btn_yes_quit_bg_tap, PRApp.resources.img.btn_quit_yes_bg);
        btnYes.x = this.game.world.centerX - (btnYes.width + btnYes.width / 2) + 20;
        btnYes.y = 360;
        btnYes.input.useHandCursor = true;
        this.quitPopUp.add(btnYes);

        yesText = this.game.add.text(btnYes.x + btnYes.width / 2, btnYes.y + btnYes.height / 2, "Yes", yesTextStyle);
        yesText.anchor.setTo(0.5, 0.5);
        this.quitPopUp.add(yesText);
        
        
        btnNo = this.game.add.button(0, 0, "ui", function(){
            PRApp.playSound(PRApp.resources.sounds.click);
            this.quitPopUp.destroy();
        }, this, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg_tap, PRApp.resources.img.btn_quit_no_bg);
        btnNo.x = this.game.world.centerX + btnNo.width / 2;
        btnNo.y = 360;
        btnNo.input.useHandCursor = true;
        this.quitPopUp.add(btnNo);

        noText = this.game.add.text(btnNo.x + btnNo.width / 2, btnNo.y + btnNo.height / 2, "No", noTextStyle);
        noText.anchor.setTo(0.5, 0.5);
        this.quitPopUp.add(noText); 
    },
    
    initTutorial: function(){
        
        this.currentActionTutorial = 1;        
        this.onActionTutorial();
        
    },
    onActionTutorial: function(){
        
        var tutorial = PRApp.Levels[PRApp.currentLevel].tutorial;
        var tutorialName = tutorial.name;      
        var pieceID;
        var p;
        var popUpX = 0, popUpY = 0;
        var shildData = this.game.make.bitmapData(PRApp.gameWidth, PRApp.gameHeight);
        var isLeftPopUp = true;
        var pH = 0;
        var allocatePieces = function() {
            
            var piece, cell;

            for (pieceID in this.board.needSelectPiecesByID) {
                piece = this.board.needSelectPiecesByID[pieceID];
                cell = this.board.grid.getCell(piece.row, piece.column);

                cell.background.image.oldParent = cell.background.image.parent;
                this.tutorialObjectGroup.add(cell.background.image);
            }

            this.board.matchPatchLeyar.oldParent = this.board.matchPatchLeyar.parent;
            this.board.matchPatchLeyar.oldZ = this.board.matchPatchLeyar.z;
            this.tutorialObjectGroup.add(this.board.matchPatchLeyar);

            for (pieceID in this.board.needSelectPiecesByID) {
                piece = this.board.needSelectPiecesByID[pieceID];
                piece.setInputEnable(true);
                piece.image.oldParent = piece.image.parent;
                this.tutorialObjectGroup.add(piece.image);
            }
        };
        
        if (tutorial && this.currentActionTutorial <= tutorial.actions) {
            
            shildData.fill(0, 0, 0, 1);
            
            if(this.tutorialLayer){
                this.tutorialLayer.destroy();
            }
            
            this.tutorialLayer = this.game.add.group();
            this.tutorialObjectGroup = this.game.add.group();

            switch (tutorialName) {
                case PRApp.TUTORIAL.BASE:
                    if (this.currentActionTutorial === 1) {
                        this.board.setNeedSelectPieces(tutorial.selectedPieces[this.currentActionTutorial]);
                        
                        allocatePieces.call(this);
                        
                        for (pieceID in this.board.needSelectPiecesByID) {
                            p = this.board.needSelectPiecesByID[pieceID];                           

                            if (popUpX === 0 && popUpY === 0) {
                                popUpX = this.board.layer.x + p.x;
                                popUpY = this.board.layer.y + p.y + (p.size / 2);
                            }
                        }
                        
                        isLeftPopUp = false;

                    } else if (this.currentActionTutorial === 2) {
                        for (pieceID in this.goalsView) {
                            pH = this.goalsView[pieceID].background.y + this.goalsView[pieceID].background.height;
                            p = this.goalsView[pieceID];
                           
                           p.group.oldParent = p.group.parent;
                           this.tutorialObjectGroup.add(p.group);
                        }
                  
                        popUpX = this.movesCounterBg.x + this.movesCounterBg.width;
                        popUpY = this.movesCounterBg.y + this.movesCounterBg.height + pH;
                        
                        this.movesCounterLayer.oldParent = this.movesCounterLayer.parent;
                        this.tutorialObjectGroup.add(this.movesCounterLayer);
                       // this.board.inputEnabled = false;
                    }
                    break;
                case PRApp.TUTORIAL.BONUS:
                    if (this.currentActionTutorial === 1 || this.currentActionTutorial === 5) {
                          this.board.setNeedSelectPieces(tutorial.selectedPieces[this.currentActionTutorial]);
                        
                         allocatePieces.call(this);
                        
                        for (pieceID in this.board.needSelectPiecesByID) {
                            p = this.board.needSelectPiecesByID[pieceID];                           

                            if(popUpX === 0 && popUpY === 0 && this.currentActionTutorial !== 5){
                                popUpX = this.board.layer.x + p.x;
                                popUpY = this.board.layer.y + p.y + (p.size / 2);
                            }
                        }
                        
                        isLeftPopUp = false;  
                    } else if(this.currentActionTutorial === 2){
                         this.board.setNeedSelectPieces(tutorial.selectedPieces[this.currentActionTutorial]);
                        
                        allocatePieces.call(this);
                        
                        for (pieceID in this.board.needSelectPiecesByID) {
                            p = this.board.needSelectPiecesByID[pieceID];                           

                            popUpX = this.board.layer.x + p.x;
                            popUpY = this.board.layer.y + p.y + (p.size / 2);

                        }
                        
                        isLeftPopUp = false;  
                    } else {                        
                        popUpX = this.game.world.centerX;
                        popUpY = this.game.world.centerY;
                    }

                    break;
                case PRApp.TUTORIAL.MULTI:
                    
                    if (this.currentActionTutorial === 1 || this.currentActionTutorial === 2) {
                          this.board.setNeedSelectPieces(tutorial.selectedPieces[this.currentActionTutorial]);
                        
                         allocatePieces.call(this);
                        
                        for (pieceID in this.board.needSelectPiecesByID) {
                            p = this.board.needSelectPiecesByID[pieceID];                           

                            if(popUpX === 0 && popUpY === 0){
                                popUpX = this.board.layer.x + p.x;
                                popUpY = this.board.layer.y + p.y + (p.size / 2);
                            }
                        }
                        
                        isLeftPopUp = false; 
                    }

                    break;
            }
           
            this.tutorialShild = this.game.add.sprite(0, 0, shildData);
            this.tutorialLayer.add(this.tutorialShild);
            this.tutorialShild.alpha = 0;
            this.tutorialLayer.add(this.tutorialObjectGroup);
            
            this.initTutorialPopUp(popUpX, popUpY, isLeftPopUp);

            this.tutorialTween = this.game.add.tween(this.tutorialShild);
            this.tutorialTween.to({alpha: 0.8}, 500, Phaser.Easing.Linear.None);
            this.tutorialTween.onComplete.add(this.showTutorialPopUp, this);
            this.tutorialTween.start();             
           
        } else {
            
            if(this.tutorialLayer){
                this.tutorialLayer.destroy();
            }
            
            this.board.playAnimtionPieces();
            this.setInputEnable(true);
            
            if(PRApp.Levels[PRApp.currentLevel].tutorial){
                PRApp.Levels[PRApp.currentLevel].hasLoadTutorial = false;
            }
        }
    },
    
    finishTutorialAction: function(){
        this.currentActionTutorial += 1;
        
        var children = this.tutorialObjectGroup.children;
        
        while(children.length > 0){
            if(children[children.length - 1].oldZ){
                children[children.length - 1].oldParent.addAt(children[children.length - 1], children[children.length - 1].oldParent.length - 1);
            } else {
                children[children.length - 1].oldParent.add( children[children.length - 1]);
            }            
        }
        
        this.tutorialTween = this.game.add.tween(this.tutorialLayer);
        this.tutorialTween.to({alpha: 0}, 500, Phaser.Easing.Linear.None);
        this.tutorialTween.onComplete.add(this.onActionTutorial, this);
        this.tutorialTween.start();     
        
    },
    showTutorialPopUp: function(){ 
        this.tutorialTween = this.game.add.tween(this.tutorialPopUp);
        this.tutorialTween.to({alpha: 1}, 100, Phaser.Easing.Linear.None, true);        
    },
    initTutorialPopUp: function(x, y, isLeft){
        
        var tutorial = this.levelData.tutorial;
        var textString = tutorial.text[this.currentActionTutorial];
        var textStyle = {
            font: '25px Patua One',
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#8B5742',
            strokeThickness: 5,
            align: "center"
        };
        var btnTextStyle = {
            font: '30px Patua One',
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#66CD00',
            strokeThickness: 8
        };
        var btn, btnText, tutorialPopUpBg, tutorialText;
        
        if (x !== undefined && y !== undefined && x > 0 && y > 0) {
            
            this.tutorialPopUp = this.game.add.group();
            this.tutorialLayer.add(this.tutorialPopUp);

            tutorialPopUpBg = this.game.add.sprite(0, 0, "ui", PRApp.resources.img.popup_bg);
            this.tutorialPopUp.add(tutorialPopUpBg);

            tutorialText = this.game.add.text(0, 0, textString, textStyle);
            tutorialText.anchor.setTo(0.5, 0.5);
            this.tutorialPopUp.add(tutorialText);
            this.tutorialPopUp.alpha = 0;

            switch (tutorial.name) {
                case PRApp.TUTORIAL.BASE:
                    if (this.currentActionTutorial === 1) {
                        tutorialPopUpBg.scale.x = tutorialPopUpBg.scale.y = 1 / (tutorialPopUpBg.width / (PRApp.gameWidth / 100 * 40));
                        tutorialText.x = tutorialPopUpBg.width / 2;
                        tutorialText.y = tutorialPopUpBg.height / 100 * 43;
                    } else if (this.currentActionTutorial === 2) {
                        tutorialPopUpBg.scale.x = tutorialPopUpBg.scale.y = 1 / (tutorialPopUpBg.width / (PRApp.gameWidth / 100 * 50));
                        tutorialText.x = tutorialPopUpBg.width / 2;
                        tutorialText.y = tutorialPopUpBg.height / 100 * 33;

                        btn = this.game.add.button(0, 0, "ui", this.finishTutorialAction, this, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg_tap, PRApp.resources.img.btn_quit_no_bg);
                        btn.x = tutorialPopUpBg.width / 2 - btn.width / 2;
                        btn.y = tutorialPopUpBg.height / 100 * 53;
                        btn.input.useHandCursor = true;
                        this.tutorialPopUp.add(btn);

                        btnText = this.game.add.text(btn.x + btn.width / 2, btn.y + btn.height / 2, "OK", btnTextStyle);
                        btnText.anchor.setTo(0.5, 0.5);
                        this.tutorialPopUp.add(btnText);

                    }

                    this.tutorialPopUp.x = isLeft ? x : x - tutorialPopUpBg.width;
                    this.tutorialPopUp.y = y - tutorialPopUpBg.height / 2;

                    break;
                case PRApp.TUTORIAL.BONUS:
                    if (this.currentActionTutorial === 1 || this.currentActionTutorial === 2) {
                        tutorialPopUpBg.scale.x = tutorialPopUpBg.scale.y = 1 / (tutorialPopUpBg.width / (PRApp.gameWidth / 100 * 40));
                        tutorialText.x = tutorialPopUpBg.width / 2;
                        tutorialText.y = tutorialPopUpBg.height / 100 * 43;

                        this.tutorialPopUp.x = isLeft ? x : x - tutorialPopUpBg.width;
                        this.tutorialPopUp.y = y - tutorialPopUpBg.height / 2;

                    } else if(this.currentActionTutorial === 10){
                        tutorialPopUpBg.scale.x = tutorialPopUpBg.scale.y = 1 / (tutorialPopUpBg.width / (PRApp.gameWidth / 100 * 50));
                        tutorialText.x = tutorialPopUpBg.width / 2;
                        tutorialText.y = tutorialPopUpBg.height / 100 * 35;

                        btn = this.game.add.button(0, 0, "ui", this.finishTutorialAction, this, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg_tap, PRApp.resources.img.btn_quit_no_bg);
                        btn.x = tutorialPopUpBg.width / 2 - btn.width / 2;
                        btn.y = tutorialPopUpBg.height / 100 * 53;
                        btn.input.useHandCursor = true;
                        this.tutorialPopUp.add(btn);

                        btnText = this.game.add.text(btn.x + btn.width / 2, btn.y + btn.height / 2, "NEXT", btnTextStyle);
                        btnText.anchor.setTo(0.5, 0.5);
                        this.tutorialPopUp.add(btnText);

                        this.tutorialPopUp.x = x - tutorialPopUpBg.width / 2;
                        this.tutorialPopUp.y = y - tutorialPopUpBg.height / 2;
                    } else if(this.currentActionTutorial === 3 || this.currentActionTutorial === 4){
                        tutorialPopUpBg.scale.x = tutorialPopUpBg.scale.y = 1 / (tutorialPopUpBg.width / (PRApp.gameWidth / 100 * 75));
                        tutorialText.x = tutorialPopUpBg.width / 2;
                        tutorialText.y = tutorialPopUpBg.height / 100 * 35;

                        btn = this.game.add.button(0, 0, "ui", this.finishTutorialAction, this, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg, PRApp.resources.img.btn_quit_no_bg_tap, PRApp.resources.img.btn_quit_no_bg);
                        btn.x = tutorialPopUpBg.width / 2 - btn.width / 2;
                        btn.y = tutorialPopUpBg.height / 100 * 55;
                        btn.input.useHandCursor = true;
                        this.tutorialPopUp.add(btn);

                        btnText = this.game.add.text(btn.x + btn.width / 2, btn.y + btn.height / 2, "NEXT", btnTextStyle);
                        btnText.anchor.setTo(0.5, 0.5);
                        this.tutorialPopUp.add(btnText);

                        this.tutorialPopUp.x = x - tutorialPopUpBg.width / 2;
                        this.tutorialPopUp.y = y - tutorialPopUpBg.height / 2;
                    }
                    break;
                case PRApp.TUTORIAL.MULTI:

                    if (this.currentActionTutorial === 1) {
                        tutorialPopUpBg.scale.x = tutorialPopUpBg.scale.y = 1 / (tutorialPopUpBg.width / (PRApp.gameWidth / 100 * 40));
                        tutorialText.x = tutorialPopUpBg.width / 2;
                        tutorialText.y = tutorialPopUpBg.height / 100 * 43;
                        this.tutorialPopUp.x = isLeft ? x : x - tutorialPopUpBg.width;
                        this.tutorialPopUp.y = y ;
                    } else if (this.currentActionTutorial === 2) {
                        tutorialPopUpBg.scale.x = tutorialPopUpBg.scale.y = 1 / (tutorialPopUpBg.width / (PRApp.gameWidth / 100 * 60));
                        tutorialText.x = tutorialPopUpBg.width / 2;
                        tutorialText.y = tutorialPopUpBg.height / 100 * 43;
                        this.tutorialPopUp.x = isLeft ? x : x - tutorialPopUpBg.width;
                        this.tutorialPopUp.y = y - (tutorialPopUpBg.height / 2);
                    }

                    break;
            }
        }
       
    },
    setInputEnable: function(isEneble){
      
        this.musicOnButton.input.useHandCursor = isEneble;
        this.musicOnButton.input.inputEnabled = isEneble;
        this.soundOnButton.input.useHandCursor = isEneble;
        this.soundOnButton.input.inputEnabled = isEneble;
        this.exitButton.input.useHandCursor = isEneble;
        this.exitButton.input.inputEnabled = isEneble;        

        this.board.setInputEnable(isEneble);
    }
};