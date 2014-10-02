PRApp.Board = function(state, game, parenLayer, gridData) {

    this.play = state;
    this.game = game;
    this.parenLayer = parenLayer;
    
    this.layer = this.game.add.group();
    this.x = PRApp.SCREEN_WIDTH - this.width - this.margin;
    this.y = PRApp.SCREEN_HEIGHT - this.height - this.margin;

    this.backgoundPiecesLeyar = this.game.add.group();
    this.borderSelectedLayer = this.game.add.group();
    this.borderBonusLayer = this.game.add.group();
    this.matchPatchLeyar = this.game.add.group();
    this.piecesLayer = this.game.add.group();

    this.layer.add(this.backgoundPiecesLeyar);
    this.layer.add(this.borderSelectedLayer);
    this.layer.add(this.borderBonusLayer);
    this.layer.add(this.matchPatchLeyar);
    this.layer.add(this.piecesLayer);
    
    this.parenLayer.add(this.layer);
    
    this.borderSelectedLayer.visible = false;
    
    this.currentAnimationPieces = [];
    
    this.selectedPieces = [];
    this.bonusPieces = [];
    this.pieceBonusCounter = 0;
    this.replasePiece = null;  
    this.grid = new PRApp.Grid(this.game, this, gridData, this.width - 4);

    //tthis.game.time.events.add(Phaser.Timer.SECOND * 4, this.playAnimtionPieces, this);

};

PRApp.Board.prototype = {
    margin: 5,
    width: 550,
    /**
     * Высота поля
     * @type Number
     */
    height: 550,
    /**
     * Массив ссылок на выделеные фишки
     * @type Array
     */
    selectedPieces: [],
    pieceBonusCounter: 0,
    bonusPieces: [],
    replasePiece: null,
    currentAnimationPieces: [],
   
    removeGrid: function() {
        this.selectedPieces = [];
        this.bonusPieces = [];
        this.pieceBonusCounter = 0;
        this.replasePiece = null;

        this.backgoundPiecesLeyar.removeAll();
        this.borderSelectedLayer.removeAll();
        this.borderBonusLayer.removeAll();
        this.matchPatchLeyar.removeAll();
        this.piecesLayer.removeAll();

        this.grid.destroy();
        this.grid = null;
    },
    startSelectPiece: function(piece) {

        if (this.selectedPieces.length === 0) {
            if(this.needSelectPieceCords){
                if (this.needSelectPieceCords[0].y === piece.row && this.needSelectPieceCords[0].x === piece.column) {
                    this.selectedPieces.push(piece);

                    if (piece.type.bonus) {
                        this.pieceBonusCounter += 1;
                    }
                }
            } else {
                this.selectedPieces.push(piece);

                if (piece.type.bonus) {
                    this.pieceBonusCounter += 1;
                }

                if (this.currentAnimationPieces.length > 0) {
                    this.stopAnimationPieces();
                }
            }
        }
    },
    /**
     * Функция добовляет или удаляет переданную фишку из массива выбранных фишек
     * @param {type} piece - фишка
     * @returns {undefined}
     */
    selectPiece: function(piece) {

        var lastSelectedPiece = null;
        var nextToLastPiece = null;
        var multiType = null;
        var let = false;
        var combinePieceTypesIDs;
        var xP = [];
        var yP = [];
        var bombP = [];
        var multiP = []; 
        
       
        
        if (this.selectedPieces.length > 0) {
            
            lastSelectedPiece = this.selectedPieces[this.selectedPieces.length - 1];

            if (lastSelectedPiece.checkNeighbor(piece)) {

                if (lastSelectedPiece.typeID === piece.typeID) {
                    let = true;
                } else {

                    combinePieceTypesIDs = lastSelectedPiece.type.combinePieceTypesIDs;

                    for (var i = 0,
                            l = combinePieceTypesIDs.length; i < l; i += 1) {
                        if (combinePieceTypesIDs[i] === piece.typeID) {
                            let = true;
                            break;
                        }
                    }
                }

                if (!let && this.selectedPieces.length === 1) {
                    if (piece.type.bonus && lastSelectedPiece.type.bonus) {
                        let = true;
                    }
                }

                if (this.selectedPieces.length === 2) {

                    nextToLastPiece = this.selectedPieces[this.selectedPieces.length - 2];

                    if (nextToLastPiece.type.bonus && lastSelectedPiece.type.bonus) {
                        if (piece !== nextToLastPiece) {
                            let = false;
                        } else {
                            let = true;
                        }
                    }
                }

                if (let) {
                    if (this.checkSelectedPiece(piece)) {
                        if (this.selectedPieces.length > 1) {
                            nextToLastPiece = this.selectedPieces[this.selectedPieces.length - 2];
                        }

                        if (nextToLastPiece && nextToLastPiece === piece) {
                            this.selectedPieces.pop();
                        }
                    } else {
                        if (lastSelectedPiece !== piece) {

                            if (this.selectedPieces.length === 1 && piece.type.bonus && lastSelectedPiece.type.bonus) {
                                this.selectedPieces.push(piece);
                            }

                            if ((piece.type.bonus && this.pieceBonusCounter < 1) || !piece.type.bonus) {
                                this.selectedPieces.push(piece);
                            }
                            if (piece.type.bonus && this.pieceBonusCounter < 1) {
                                this.pieceBonusCounter += 1;
                            }
                        }
                    }
                }

                this.bonusPieces = [];

                //проверка задело ли выделение бонусные фишки
                for (i = 0, l = this.selectedPieces.length; i < l; i += 1) {

                    piece = this.selectedPieces[i];

                    if (piece.type.bonus) {
                        switch (piece.type.bonus) {

                            case PRApp.ObjectTypes.bonus.x:
                                //задело бонусную фишку X
                                xP.push(piece);
                                break;

                            case PRApp.ObjectTypes.bonus.y:
                                //задело бонусную фишку Y
                                yP.push(piece);
                                break;

                            case PRApp.ObjectTypes.bonus.bomb:
                                //задело бонусную фишку bomb
                                bombP.push(piece);
                                break;

                            case PRApp.ObjectTypes.bonus.multi:
                                //задело бонусную фишку multi
                                multiP.push(piece);
                                break;
                        }
                    } else {
                        multiType = piece.typeID;
                    }
                }

                //берем последнею фишку из выденных
                piece = this.selectedPieces[this.selectedPieces.length - 1];

                if (xP.length && !yP.length && !bombP.length && !multiP.length) {
                    while (xP.length > 0) {
                        piece = xP.pop();
                        this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByRow(piece.row));

                        this.bonusPieces = removeElementOfArray(this.bonusPieces, piece);
                    }
                }

                if (yP.length && !xP.length && !bombP.length && !multiP.length) {
                    while (yP.length > 0) {
                        piece = yP.pop();
                        this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByColumn(piece.column));

                        this.bonusPieces = removeElementOfArray(this.bonusPieces, piece);
                    }
                }

                if (yP.length && xP.length && !bombP.length && !multiP.length) {
                    this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByRow(xP[0].row));
                    this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByColumn(yP[0].column));

                    this.bonusPieces = removeElementOfArray(this.bonusPieces, xP[0]);
                    this.bonusPieces = removeElementOfArray(this.bonusPieces, yP[0]);
                }

                if (bombP.length && !xP.length && !yP.length && !multiP.length) {
                    this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByRect(bombP[bombP.length - 1], bombP.length));
                }

                if (bombP.length && (xP.length || yP.length) && !multiP.length) {
                    this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByRect(piece, 1));
                    this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByRow(piece.row));
                    this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByColumn(piece.column));

                    this.bonusPieces = removeElementOfArray(this.bonusPieces, bombP[0]);
                    if (xP.length) {
                        this.bonusPieces = removeElementOfArray(this.bonusPieces, xP[0]);
                    }
                    if (yP.length) {
                        this.bonusPieces = removeElementOfArray(this.bonusPieces, yP[0]);
                    }
                }
                //действие фишки типа multi
                if (multiP.length) {

                    if (xP.length) {
                        this.replasePiece = xP[0];
                        this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByTypeID(this.replasePiece.type.ownerTypeID));
                    } else if (yP.length) {
                        this.replasePiece = yP[0];
                        this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByTypeID(this.replasePiece.type.ownerTypeID));
                    } else if (bombP.length) {
                        this.replasePiece = bombP[0];
                        this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByTypeID(this.replasePiece.type.ownerTypeID));
                    } else {
                        if (multiP.length < 2) {

                            this.bonusPieces = this.bonusPieces.concat(this.grid.getPiecesByTypeID(multiType));
                            this.bonusPieces = removeElementOfArray(this.bonusPieces, multiP[0]);
                        } else {

                            this.bonusPieces = this.bonusPieces.concat(this.grid.getAllPieces());
                            this.bonusPieces = removeElementOfArray(this.bonusPieces, multiP[0]);
                            this.bonusPieces = removeElementOfArray(this.bonusPieces, multiP[1]);
                        }
                    }
                }

                this.bonusPieces = this.bonusPieces.concat(this.getPiecesByCombo(this.bonusPieces));

            }

            this.drawMatchPatch(this.selectedPieces);
            this.drawBonusComboPatch(this.bonusPieces);
        }

    },
    endSelectPiece: function() {

        var piece,
            pieceType,
            pa,
            pb,
            i,
            l;
        var bonusPieces = [],
                bonusTypes;
        var let = false;
        var counterDestroyedPiecesByTypeID = {};
        var pieceTypeID = null;

        this.drawMatchPatch([]);
        this.drawBonusComboPatch([]);

        this.pieceBonusCounter = 0;

        if (this.selectedPieces.length >= 3) {

            for (i = 0, l = this.selectedPieces.length; i < l; i += 1) {
                if (this.selectedPieces[i].type.bonusPieceTypesIDs) {
                    bonusTypes = this.selectedPieces[i].type.bonusPieceTypesIDs;
                    break;
                }
            }

            if (this.selectedPieces.length > 3) {
                //комбо создает бунусную фишку

                piece = this.selectedPieces[this.selectedPieces.length - 1];
                //определяем тип бонусной фишки
                if (this.selectedPieces.length < 8) {

                    pa = this.selectedPieces[this.selectedPieces.length - 1];
                    pb = this.selectedPieces[this.selectedPieces.length - 2];

                    if (pa.row === pb.row) {
                        //бонсная фишка типа X
                        pieceType = bonusTypes.x;
                    } else if (pa.column === pb.column) {
                        //бонусная фишка типа Y
                        pieceType = bonusTypes.y;
                    } else {
                        //бонусная фишка типа Bomb
                        pieceType = bonusTypes.bomb;
                    }


                } else if (this.selectedPieces.length >= 8) {
                    //бонусная фишка типа Multi
                    pieceType = bonusTypes.multi;
                }

                //удаление старой фишки
                this.selectedPieces.splice(this.selectedPieces.length - 1, 1);

                this.bonusPieces = removeElementOfArray(this.bonusPieces, piece);

                this.grid.replacePiece(piece, pieceType);

            }

            let = true;

        } else if (this.selectedPieces.length === 2) {
            //если выбраны две вишки смотрим являются ли они бонусными фишками
            pa = this.selectedPieces[this.selectedPieces.length - 1];
            pb = this.selectedPieces[this.selectedPieces.length - 2];
            //если две фишки бонус фишки или хоть одна из них бонус фишка типа мульти
            if (pa.type.bonus && pb.type.bonus || ((pa.type.bonus && pa.type.bonus === PRApp.ObjectTypes.bonus.multi) || (pb.type.bonus && pb.type.bonus === PRApp.ObjectTypes.bonus.multi))) {
                let = true;
            }
        }

        if (let) {
            this.selectedPieces = this.bonusPieces.concat(this.selectedPieces);

            if (this.replasePiece) {

                for (i = 0, l = this.selectedPieces.length; i < l; i += 1) {

                    this.selectedPieces[i] = this.grid.replacePiece(this.selectedPieces[i], this.replasePiece.typeID);

                }
                if (this.replasePiece.type.bonus) {
                    this.selectedPieces = [
                    ];
                } else {
                    this.selectedPieces = this.getPiecesByCombo(this.selectedPieces);
                }

            }

            for (i = 0, l = this.selectedPieces.length; i < l; i += 1) {

                piece = this.selectedPieces[i];
                pieceTypeID = piece.typeID;

                this.grid.removePiece(piece);

                if (!counterDestroyedPiecesByTypeID[pieceTypeID]) {
                    counterDestroyedPiecesByTypeID[pieceTypeID] = 0;
                }

                counterDestroyedPiecesByTypeID[pieceTypeID] += 1;

            }
        }

        this.replasePiece = null;
        this.selectedPieces = [];

        this.grid.putDownPieces();        
       
        if(let){
            this.play.onEventDestroyedPieces(counterDestroyedPiecesByTypeID);
            this.play.addUnitToMoveCounter();
            
            if(this.needSelectPiecesByID){
                this.play.finishTutorialAction();
                this.needSelectPiecesByID = null;
                this.needSelectPieceCords = null;
            }
            
            PRApp.playSound(PRApp.resources.audio.bite_carrot_02);
        }
     
    },
    /**
     * Функция возвращает все фишки попавшие в комбо
     * @param {type} pieces
     * @returns {game.board.getPiecesByCombo.comboPieces|Array}
     */
    getPiecesByCombo: function(pieces) {

        //Проверка задел ли эфект от бонсных фишек бонсные фишки
        var isNotBonus = false;
        var xP = [];
        var yP = [];
        var bombP = [];
        var multiP = [];
        var checkPieces = pieces.concat();
        var comboPieces = [];
        var bonusPieces = [];
        var i, l, piece;

        while (!isNotBonus) {

            isNotBonus = true;
            xP = [];
            yP = [];
            bombP = [];
            multiP = [];

            for (i = 0, l = checkPieces.length; i < l; i += 1) {

                piece = checkPieces[i];

                if (piece.type.bonus) {

                    if (isNotBonus) {
                        isNotBonus = false;
                    }

                    bonusPieces.push(piece);

                    switch (piece.type.bonus) {

                        case PRApp.ObjectTypes.bonus.x:
                            //задело бонусную фишку X
                            xP.push(piece);
                            break;

                        case PRApp.ObjectTypes.bonus.y:
                            //задело бонусную фишку Y
                            yP.push(piece);
                            break;

                        case PRApp.ObjectTypes.bonus.bomb:
                            //задело бонусную фишку bomb
                            bombP.push(piece);
                            break;
                        case PRApp.ObjectTypes.bonus.multi:
                            //задело бонусную фишку bomb
                            multiP.push(piece);
                            break;
                    }
                }
            }

            if (xP.length) {
                while (xP.length > 0) {
                    piece = xP.pop();
                    comboPieces = comboPieces.concat(this.grid.getPiecesByRow(piece.row));
                    checkPieces = removeElementOfArray(checkPieces, piece);
                }
            }

            if (yP.length) {
                while (yP.length > 0) {
                    piece = yP.pop();
                    comboPieces = comboPieces.concat(this.grid.getPiecesByColumn(piece.column));
                    checkPieces = removeElementOfArray(checkPieces, piece);
                }
            }

            if (bombP.length) {
                while (bombP.length > 0) {
                    piece = bombP.pop();
                    comboPieces = comboPieces.concat(this.grid.getPiecesByRect(piece, 1));
                    checkPieces = removeElementOfArray(checkPieces, piece);
                }
            }

            if (multiP.length) {
                while (multiP.length > 0) {
                    piece = multiP.pop();
                    checkPieces = removeElementOfArray(checkPieces, piece);
                }
            }

        }

        comboPieces = comboPieces.concat(bonusPieces);

        return comboPieces;

    },
    /**
     * Этот медот проверяет находится ли переданнаю фишка в уже выбранных вишках
     * @param {type} piece - фишка
     * @returns {Boolean} result == true - фишка уже выбрана, result != true - фишка еще не выбрана
     */
    checkSelectedPiece: function(piece) {

        var result = false;
        var i, l;
        
        for (i = 0, l = this.selectedPieces.length; i < l; i += 1) {
            if (this.selectedPieces[i] === piece) {
                result = true;
                break;
            }
        }

        return result;
    },
    /**
     * Функция проверяет прекратил ли пользователь выбирать фишки, если прекратил то вызывает необходимую функцию.
     * @returns {undefined}
     */
    checkUserInputUp: function() {

        if (this.game.input.activePointer.isUp && this.selectedPieces.length > 0) {
            if(this.needSelectPieceCords){
                if (this.selectedPieces.length < this.needSelectPieceCords.length){
                    this.selectedPieces = [];
                }
            }
            this.endSelectPiece();              
        }

    },
    /**
     * Функция рисует поть через выбранные фишки
     * @param {type} pieces
     * @returns {undefined}
     */
    drawMatchPatch: function(pieces) {

        var i,
            l,
            piece,
            border,
            particle = this.game.make.sprite(px, py, PRApp.resources.img.particle), oldX, oldY, px, py;
        var scale =  1 / (particle.width / (this.grid.piecesSize / 15));

        this.borderSelectedLayer.removeAll();

        if (!this.graphicsMatchPatch) {
            this.graphicsMatchPatch = this.game.add.graphics(0, 0);            
        } else {
            this.graphicsMatchPatch.destroy();
            this.graphicsMatchPatch = this.game.add.graphics(0, 0);
        }
        
        if(!this.particleLayer){
            this.particleLayer = this.game.add.group();
            this.matchPatchLeyar.add(this.particleLayer);
        } else {
            this.particleLayer.removeAll();
        }

        this.matchPatchLeyar.add(this.graphicsMatchPatch);
        //this.matchPatchLeyar.bringToTop(this.particleLayer);

        if (pieces.length > 0) {

            this.graphicsMatchPatch.beginFill(0x8B4513, 0.5);
            this.graphicsMatchPatch.lineStyle(10, 0x8B4513, 0.5);

            this.graphicsMatchPatch.moveTo(pieces[0].cx, pieces[0].cy);
            oldX = pieces[0].cx;
            oldY = pieces[0].cy;

            for (i = 1, l = pieces.length; i < l; i += 1) {
                piece = pieces[i];
                this.graphicsMatchPatch.lineTo(piece.cx, piece.cy);
                this.graphicsMatchPatch.moveTo(piece.cx, piece.cy);
                
                /*if(oldX === piece.cx){
                   py = oldY;
                   px = oldX;
                 
                    if (piece.cy > oldY) {
                        while (py < piece.cy) {
                            px = this.game.rnd.integerInRange(piece.cx - (this.grid.piecesSize / 5), piece.cx + (this.grid.piecesSize / 5));
                            scale =  1 / (this.game.make.sprite(px, py, PRApp.resources.img.particle).width / (this.grid.piecesSize / this.game.rnd.integerInRange(15, 25)));
                            particle = this.game.add.sprite(px, py, "particle");
                            particle.scale.x = particle.scale.y = scale;
                            particle.anchor.set(0.5,0.5);
                            this.particleLayer.add(particle);
                            py =  py + 4;
                        }
                    } else {
                        while (py > piece.cy) {                                                     
                            particle = this.game.add.sprite(px, py, "particle");
                            particle.scale.x = particle.scale.y = scale;
                            this.particleLayer.add(particle);
                            py =  py - particle.width;   
                        }
                    }
              
                   
                    
                } else {
                    
                }
                
                oldX = piece.cx;
                oldY = piece.cy;*/
            }

            this.graphicsMatchPatch.endFill();

            for (i = 0, l = pieces.length; i < l; i += 1) {
                piece = pieces[i];

                border = this.game.add.sprite(piece.x, piece.y, "us");
                border.scale.x = border.scale.y = 1 / (border.texture.width / PRApp.Grid.PIECE_SIZE);
                this.borderSelectedLayer.add(border);
            }

            this.drawPieces = pieces;
        }
    },
    drawBonusComboPatch: function(pieces) {

        var i,
            l,
            piece,
            border;

        this.borderBonusLayer.removeAll();

        for (i = 0, l = pieces.length; i < l; i += 1) {
            piece = pieces[i];
            border = this.game.add.sprite(piece.x, piece.y, "bs");
            border.scale.x = border.scale.y = 1 / (border.texture.width / PRApp.Grid.PIECE_SIZE);
            this.borderBonusLayer.add(border);
        }
    },
    playAnimtionPieces: function() {
        
        if (this.eventAnimationPieces) {
            if (this.selectedPieces.length <= 0) {

                var combo = this.grid.combination[this.game.rnd.integerInRange(0, this.grid.combination.length - 1)] || [];

                for (var i = 0, l = combo.length; i < l; i += 1) {
                    combo[i].playAnimation();
                }
            }

            this.currentAnimationPieces = combo || [];
        }

        this.eventAnimationPieces = this.game.time.events.add(Phaser.Timer.SECOND * 10, this.playAnimtionPieces, this);        
    },
    stopAnimationPieces: function(){
        
        for(var i = 0, l = this.currentAnimationPieces.length;  i < l; i += 1){
            this.currentAnimationPieces[i].stopAnimation();
        }
        
        this.currentAnimationPieces = [];
        
        if(this.eventAnimationPieces){
            this.game.time.events.remove(this.eventAnimationPieces);
        }
    },
    setNeedSelectPieces: function(coordsPieces){
        
        var piece = null;
        var i, l;
        this.needSelectPiecesByID = {};
        
        for(i = 0, l = coordsPieces.length; i < l; i += 1){
            piece = this.grid.getPiece(coordsPieces[i].y, coordsPieces[i].x);
            this.needSelectPiecesByID[piece.ID] = piece;
        }
        
        this.needSelectPieceCords = coordsPieces;
        
    },
    setInputEnable: function(isEnable){
        
        var pieces = this.grid.getAllPieces();
        var i, l;
        
        for(i = 0, l = pieces.length; i < l; i += 1){
          pieces[i].setInputEnable(isEnable);           
        }   
        
        this.inputEnabled = isEnable;
    }
};