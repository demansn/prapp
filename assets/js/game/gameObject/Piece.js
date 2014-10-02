PRApp.Piece = function(game, grid, rowNumber, columnNumber, x, y, size, typeID, layer) {

    this.game = game;
    this.grid = grid;
    this.row = rowNumber;
    this.column = columnNumber;
    this.x = x;
    this.y = y;
    this.size = size;
    this.cx = x + (size / 2);
    this.cy = y + (size / 2);  
    this.ID = PRApp.Piece.NextID;
    PRApp.Piece.NextID += 1;
    this.type = PRApp.ObjectTypes.pieces[typeID];
    this.typeID = this.type.ID;     
    this.neighbors = {};
    
    //Инициализация изображения фишки 
    if(this.type.animationID && PRApp.isEnableSpriteAnimation){        
       this.image = this.game.add.sprite(0, 0, this.type.animationID, 0);      
       this.image.animations.add('animation'); 
    } else {      
       this.image = this.game.add.sprite(0, 0, "pieces", this.type.spriteID);       
    }
    
    if (this.image.height > size) {
        this.image.scale.x = this.image.scale.y = 1 / (this.image.height / (size - (this.type.deltaSize || 7)));
        this.image.anchor.set(0.5, this.type.deltaY || 0.55);
    } else {
        this.image.anchor.set(0.5, 0.55);
    }
  
    this.image.x = this.cx;
    this.image.y = this.cy;
    this.image.inputEnabled = true;
    
    if (this.game.device.desktop){
        this.image.input.pixelPerfectOver = true;
    }
    
    this.image.input.useHandCursor = true;    
    this.image.events.onInputDown.add(this.onInputDown, this);
    this.image.events.onInputOver.add(this.onInputOver, this);
    
    layer.add(this.image);
};


PRApp.Piece.prototype = {
    /**
     * Ссылка на объект игры
     * @type type
     */
    game: null,
    /**
     * Ссылка на экземпляр объект Board
     * @type type
     */
    board: null,
    /**
     * Номер строки на которой находится фишка
     * @type Number
     */
    row: 0,
    /**
     * Номер столбца на котором находится фишка
     * @type Number
     */
    column: 0,
    /**
     * Координата X левого угла фишки на холсте
     * @type Number
     */
    x: 0,
    /**
     * Координата Y левого угла фишки на холсте
     * @type Number
     */
    y: 0,
    /*
     * Координаты X центара фишки на холсте
     * @type Number
     */
    cx: 0,
    /*
     * Координаты Y центара фишки на холсте
     * @type Number
     */
    cy: 0,
    /**
     * Размер фишки
     * @type Number
     */
    size: 0,
    /**
     * Идентификатор типа фишки
     * @type Number
     */
    typeID: 0,
    /**
     * Объект тип фишки
     * @type type
     */
    type: null,
    /**
     * Изображение фишки
     * @type type
     */
    image: null,
    /**
     * Хеш объект содержащий все соседние фишки
     * @type type
     */
    neighbors: {},
    setInputEnable: function(isEnable){
       
        this.image.inputEnabled = isEnable;
        this.image.input.useHandCursor = isEnable;
        this.image.input.pixelPerfectOver = isEnable;
       
    },
    onInputDown: function() {
        this.grid.board.startSelectPiece(this);
    },
    onInputOver: function() {
        this.grid.board.selectPiece(this);
    },
    /**
     * Функция добовляет
     * @returns {undefined}
     */
    initNeighbors: function() {

        var grid = this.grid;
        //left
        this.neighbors[0] = grid.getPiece(this.row, this.column - 1);
        //top
        this.neighbors[1] = grid.getPiece(this.row - 1, this.column);
        //right
        this.neighbors[2] = grid.getPiece(this.row, this.column + 1);
        //down
        this.neighbors[3] = grid.getPiece(this.row + 1, this.column);
        //left top
        this.neighbors[4] = grid.getPiece(this.row - 1, this.column - 1);
        //right top
        this.neighbors[5] = grid.getPiece(this.row - 1, this.column + 1);
        //right down
        this.neighbors[6] = grid.getPiece(this.row + 1, this.column + 1);
        //left down
        this.neighbors[7] = grid.getPiece(this.row + 1, this.column - 1);

    },
    checkNeighbor: function(piece) {

        var result = false;
        var id;

        for (id in this.neighbors) {
            if (this.neighbors[id] && this.neighbors[id] === piece) {
                result = true;
                break;
            }
        }

        return result;

    },
    getNeighborPieceByTypeID: function(typeID) {

        var index;
        var piece = null;

        for (index in this.neighbors) {
            if (this.neighbors[index] && this.neighbors[index].typeID === typeID) {
                piece = this.neighbors[index];
                break;
            }
        }

        return piece;
    },
    /**
     * Функция устанавливает новое расположение фишки
     * @param {type} rowNumber
     * @param {type} columnNumber
     * @param {type} x
     * @param {type} y
     * @returns {undefined}
     */
    setNewPosition: function(rowNumber, columnNumber, x, y) {
        this.row = rowNumber;
        this.column = columnNumber;
        this.x = x;
        this.y = y;
        this.cx = x + (this.size / 2);
        this.cy = y + (this.size / 2);
    },
    startMoveUpDown: function(onCompleteCallback){
        
        var deley = 750;
        var tween = this.game.add.tween(this.image);
        var targetY = this.image.y + this.game.world.height + (this.size * 2);
        
        tween.to({
            y: targetY
        }, deley, Phaser.Easing.Linear.in);
        
        tween.onComplete.add(function() {           
            this.image.y = this.cy - this.game.world.height + (this.size * 2);
            this.image.x = this.cx;
            this.startMoveToNewPosition(onCompleteCallback);
        }, this);
        
         tween.start();
        
    },
    /**      
     * Начать передвижение фишки к новому месту
     * @param {type} deley
     * @returns {undefined}
     */
    startMoveToNewPosition: function(onCompleteCallback) {

        var startDeley = 750;
        var tween = this.game.add.tween(this.image);
        // tween.to({y: this.y + 3}, startDeley, null, true);
        tween.to({
            y: this.cy,
            x: this.cx
        },
        startDeley, Phaser.Easing.Bounce.Out);

        /* var s = this.game.phaser.add.tween(this.image.scale);
         s.to({y: 0.7}, 750, Phaser.Easing.Bounce.In);
         s.to({y: 1}, 500, Phaser.Easing.Bounce.Out);
         s.start();*/
       

        tween.onComplete.add(onCompleteCallback, this);

        tween.start();

    },
    setDefaultPosition: function(){
        this.image.y = this.cy;
        this.image.x = this.cx;
    },
    replaceType: function(typeID) {
        this.image.kill();
    },
    destroy: function() {
        this.image.kill();
    },
    playAnimation: function() {
        if(this.image.animations){
            this.image.animations.play('animation', 10, false);
        }
    }, 
    stopAnimation: function(){
         this.image.animations.stop(null, true);
    }
};

PRApp.Piece.NextID = 1;