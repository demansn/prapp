PRApp.Grid = function(game, board, data, w, h) {

    this.game = game;
    this.board = board;
    this.data = data;

    this.width = data.grid[0].length;
    this.height = data.grid.length;
    this.piecesSize = w / this.width;

    var piecesSize = this.piecesSize;
    var gridWidth = piecesSize * this.width;
    var gridHeight = piecesSize * this.width;
    var startX = 2;
    var startY = 2;
    var rowCounter = 0;
    var columnCounter = 0;
    var x = startX;
    var y = startY;
    var piece = {};
    var backgoundPiece = {};
    var pieceType = 0;
    var backgoundPieceType = 0;
    var typeIndex = 0;
    var typesCounter = {};
    var pieces = [];

    var piecesTypes = data.piecesTypes.concat();
    var grid = data.grid;
    var i,
            j,
            il,
            jl;
    var piecesCounter = 0;
    var loadGrid = [];
    var isLoaded = true;

    for (i = 0, il = grid.length; i < il; i += 1) {
        for (j = 0, jl = grid[i].length; j < jl; j += 1) {
            if (grid[i][j] === 1) {
                piecesCounter += 1;
            }
        }
    }

    var maxNumberPiecesOneType = Math.round(piecesCounter / 100 * PRApp.Grid.MAX_PIECES_ONE_TYPE);

    this.rowsNumber = this.height;
    this.columnsNumber = this.width;
    this.piecesTypes = data.piecesTypes;
    this.cellsBackgounr = {};
    this.cells = {};
    this.combination = [];
    this.loadColumns = {}; 
    
    if (data.hasLoadTutorial && data.tutorial) {
        this.loadColumns = data.tutorial.loadColumns || {};
        loadGrid = data.tutorial.initGrid || [];
        isLoaded = (loadGrid.length <= 0);
    }

    while (columnCounter < this.columnsNumber) {
        while (rowCounter < this.rowsNumber) {

            backgoundPieceType = grid[rowCounter][columnCounter];
           

            if (!this.cellsBackgounr[rowCounter]) {
                this.cellsBackgounr[rowCounter] = {};
                this.cells[rowCounter] = {};
            }

            if (grid[rowCounter][columnCounter] === 1) {
               
                if(loadGrid.length > 0 && !isLoaded){
                    if(loadGrid[rowCounter][columnCounter] !== 0){
                        typeIndex = loadGrid[rowCounter][columnCounter] - 1;
                    } else {
                        typeIndex = -1;
                    } 
                } else {
                   typeIndex = this.game.rnd.integerInRange(0, piecesTypes.length - 1); 
                }
                
                if (typeIndex >= 0 && !this.cells[rowCounter][columnCounter]) {
                    if (typesCounter[typeIndex]) {
                        typesCounter[typeIndex] += 1;
                    } else {
                        typesCounter[typeIndex] = 1;
                    }
              
                    pieceType = piecesTypes[typeIndex];
                    backgoundPiece = new PRApp.PieceBackgound(this.game, this, this.board.x + x, this.board.y + y, piecesSize, backgoundPieceType, this.board.backgoundPiecesLeyar);
                    piece = new PRApp.Piece(this.game, this, rowCounter, columnCounter, this.board.x + x, this.board.y + y, piecesSize, pieceType, this.board.piecesLayer);
                    
                    this.cells[rowCounter][columnCounter] = {
                        piece: piece,
                        background: backgoundPiece,
                        position: {
                            x: this.board.x + x,
                            y: this.board.y + y,
                            row: rowCounter,
                            column: columnCounter
                        }
                    };
                    
                    if (typesCounter[pieceType] >= maxNumberPiecesOneType) {
                        for (var j = 0; j < piecesTypes.length; j += 1) {
                            if (piecesTypes[j] === pieceType) {
                                piecesTypes.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
            }

            y += piecesSize;
            rowCounter += 1;
        }

        
        y = startY;
        rowCounter = 0;
        x += piecesSize;
        columnCounter += 1;
        
        if (!isLoaded && columnCounter === this.columnsNumber) {
            isLoaded = true;
            x = startX;
            y = startY;
            rowCounter = 0;
            columnCounter = 0;
        }  
        
    }

    this.initPiecesNeighbors();
    this.combination = this.getAllCombination();

    if (this.checkShuffle()) {
        
        pieces = this.getAllPieces();
        
        for (i = 0, il = pieces.length; i < il; i += 1) {
            pieces.setDefualtPosition();
        }
    }

};
PRApp.Grid.PIECE_SIZE = 40;
/*
 * РњР°РєСЃРёРјР°Р»СЊРЅРѕ РІРѕР·РјРѕР¶РЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ С„РёС€РµРє РѕРґРЅРѕРіРѕ С‚РёРїР° РЅР° СѓСЂРѕРІРЅРµ (Р·РЅР°С‡РµРЅРёРµ РІ РїСЂРѕС†РµРЅС‚Р°С…)
 * @type Number
 */
PRApp.Grid.MAX_PIECES_ONE_TYPE = 30;
PRApp.Grid.prototype = {
    cellsBackgounr: {},
    cells: {},
    combination: [],
    /**
     * РљРѕР»РёС‡РµСЃС‚РІРѕ СЃС‚СЂРѕРє РЅР° С‚РµРєСѓС‰РµРј РїРѕР»Рµ.
     * @type Number|Number
     */
    rowsNumber: 0,
    /**
     * РљРѕР»РёС‡РµСЃС‚РІРѕ СЃС‚РѕР»Р±С†РѕРІ РЅР° С‚РµРєСѓС‰РµРј РїРѕР»Рµ.
     * @type Number|Number
     */
    columnsNumber: 0,
    /**
     * Р¤СѓРЅРєС†РёСЏ РёРЅРёС†РёР°Р»РёР·РёСЂСѓРµС‚ РґР»СЏ РєР°Р¶РґРѕР№ С„РёС€РєРё СЃРѕСЃРµРґРЅРёРё Р±Р»РѕРєРё.
     * @returns {undefined}
     */
    initPiecesNeighbors: function() {

        var rowCounter,
                columnCounter;

        for (rowCounter in this.cells) {
            if (this.cells.hasOwnProperty(rowCounter)) {
                for (columnCounter in this.cells[rowCounter]) {
                    if (this.cells[rowCounter].hasOwnProperty(columnCounter) && this.cells[rowCounter][columnCounter]) {
                        if (this.cells[rowCounter][columnCounter].piece) {
                            this.cells[rowCounter][columnCounter].piece.initNeighbors();
                        } else {
                            console.log("grid.initPiecesNeighbors none piece: row - " + rowCounter + " column - " + columnCounter);
                        }
                    }
                }
            }
        }
    },
    destroy: function() {

        var rowCounter,
                columnCounter;

        for (rowCounter in this.cells) {
            if (this.cells.hasOwnProperty(rowCounter)) {
                for (columnCounter in this.cells[rowCounter]) {
                    if (this.cells[rowCounter].hasOwnProperty(columnCounter)) {
                        this.cells[rowCounter][columnCounter].piece.destroy();
                    }
                }
            }
        }
    },
    createPiece: function(row, column, x, y, typeID) {

        var newTypeID = null;
        var newPiece = PRApp.Piece;
        
        if(this.loadColumns[column] && this.loadColumns[column].length > 0){
            newTypeID = this.piecesTypes[this.loadColumns[column].shift() - 1];
        }
        
        if(!newTypeID){
            newTypeID = typeID !== undefined ? typeID : this.piecesTypes[this.game.rnd.integerInRange(0, this.piecesTypes.length - 1)];
        }
        
        newPiece = new PRApp.Piece(this.game, this, row, column, x, y, this.piecesSize, newTypeID, this.board.piecesLayer);
       
        if (!this.board.inputEnabled) {
            newPiece.setInputEnable(false);
        }

        this.cells[row][column].piece = newPiece;

        return newPiece;

    },
    replacePiece: function(piece, typeID) {

        var newPiece = new PRApp.Piece(this.game, this, piece.row, piece.column, piece.x, piece.y, this.piecesSize, typeID, this.board.piecesLayer);
        var row = piece.row;
        var column = piece.column;  
        
        if (this.cells[row] && this.cells[row][column]) {

            piece.destroy();
            
            if (!this.board.inputEnabled) {
                newPiece.setInputEnable(false);
            }

            this.cells[row][column].piece = newPiece;

        }

        return newPiece;

    },
    removePiece: function(piece) {

        piece.destroy();

        this.getCell(piece.row, piece.column).piece = null;

    },
    /**
     * Р¤СѓРЅРєС†РёСЏ РІРѕР·РІСЂР°С‰Р°РµС‚ РѕРґРЅСѓ С„РёС€РєСѓ РїРѕ Р·Р°РґР°РЅРЅРѕРјСѓ РЅРѕРјРµСЂСѓ СЃС‚СЂРѕРєРё Рё СЃС‚РѕР»Р±С†Р°.
     * @param {Number} rowNumber - РЅРѕРјРµСЂ СЃС‚СЂРѕРєРё РїРѕР»СЏ
     * @param {Number} columnNumber - РЅРѕРјРµСЂ СЃС‚РѕР»Р±С†Р° РїРѕР»СЏ
     * @returns {Piece}
     */
    getPiece: function(rowNumber, columnNumber) {

        var piece = null;

        if (this.cells[rowNumber] && this.cells[rowNumber][columnNumber]) {

            piece = this.cells[rowNumber][columnNumber].piece;

        }

        return piece;
    },
    /**
     * Р¤СѓРЅРєС†РёСЏ РІРѕР·РІСЂР°С‰Р°РµС‚ СЏС‡РµР№РєСѓ РїРѕР»СЏ РїРѕ Р·Р°РґР°РЅРЅРѕРјСѓ РЅРѕРјРµСЂСѓ СЃС‚СЂРѕРєРё Рё СЃС‚РѕР»Р±С†Р°.
     * @param {Number} rowNumber - РЅРѕРјРµСЂ СЃС‚СЂРѕРєРё РїРѕР»СЏ
     * @param {Number} columnNumber - РЅРѕРјРµСЂ СЃС‚РѕР»Р±С†Р° РїРѕР»СЏ
     * @returns {game.board@arr;@arr;grid}
     */
    getCell: function(rowNumber, columnNumber) {

        var piece = null;

        if (this.cells[rowNumber] && this.cells[rowNumber][columnNumber]) {

            piece = this.cells[rowNumber][columnNumber];

        }

        return piece;
    },
    getAllCells: function(){
        
        var cells = [];
        var rowCounter, columnCounter;

        for (rowCounter in this.cells) {
            if (this.cells.hasOwnProperty(rowCounter)) {
                for (columnCounter in this.cells[rowCounter]) {
                    if (this.cells[rowCounter].hasOwnProperty(columnCounter)) {                        
                       cells.push(this.cells[rowCounter][columnCounter]);
                    }
                }
            }
        }

        return cells;
        
    },
    /**
     * Р¤СѓРЅРєС†РёСЏ РІРѕР·РІСЂР°С‰Р°РµС‚ РјР°СЃСЃРёРІ С„РёС€РµРє РѕРїСЂРµРґРµР»РµРЅРЅРѕР№ СЃС‚СЂРѕРєРё.
     * @param {Number} rowNumber - РЅРѕРјРµСЂ СЃС‚СЂРѕРєРё
     * @returns {Array} pieces
     */
    getPiecesByRow: function(rowNumber) {

        var pieces = [
        ],
                piece;

        var rowCounter,
                columnCounter;

        for (rowCounter in this.cells) {

            if (this.cells.hasOwnProperty(rowCounter)) {

                for (columnCounter in this.cells[rowCounter]) {

                    if (this.cells[rowCounter].hasOwnProperty(columnCounter)) {

                        piece = this.cells[rowCounter][columnCounter].piece;

                        if (piece.row === rowNumber) {
                            pieces.push(piece);
                        }
                    }
                }
            }
        }

        return pieces;

    },
    /**
     * Р¤СѓРЅРєС†РёСЏ РІРѕР·РІСЂР°С‰Р°РµС‚ РјР°СЃСЃРёРІ С„РёС€РµРє РѕРїСЂРµРґРµР»РµРЅРЅРѕРіРѕ СЃС‚РѕР»Р±С†Р°.
     * @param {Number} columnNumber - РЅРѕРјРµСЂ СЃС‚РѕР»Р±С†Р°
     * @returns {Array} pieces
     */
    getPiecesByColumn: function(columnNumber) {

        var pieces = [
        ],
                piece;

        var rowCounter,
                columnCounter;

        for (rowCounter in this.cells) {

            if (this.cells.hasOwnProperty(rowCounter)) {

                for (columnCounter in this.cells[rowCounter]) {

                    if (this.cells[rowCounter].hasOwnProperty(columnCounter)) {

                        piece = this.cells[rowCounter][columnCounter].piece;

                        if (piece.column === columnNumber) {
                            pieces.push(piece);
                        }
                    }
                }
            }
        }

        return pieces;
    },
    /**
     * Р¤СѓРЅРєС†РёСЏ РІРѕР·РІСЂР°С‰Р°РµС‚ РјР°СЃСЃРёРІ С„РёС€РµРє РѕРїСЂРµРґРµР»РµРЅРЅРѕРіРѕ С‚РёРїР°.
     * @param {Number} typeID - РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ С‚РёРїР° С„РёС€РµРє.
     * @returns {Array} pieces
     */
    getPiecesByTypeID: function(typeID) {

        var pieces = [
        ],
                piece;

        var rowCounter,
                columnCounter;

        for (rowCounter in this.cells) {

            if (this.cells.hasOwnProperty(rowCounter)) {

                for (columnCounter in this.cells[rowCounter]) {

                    if (this.cells[rowCounter].hasOwnProperty(columnCounter)) {

                        piece = this.cells[rowCounter][columnCounter].piece;

                        if (piece.typeID === typeID) {
                            pieces.push(piece);
                        }
                    }
                }
            }
        }

        return pieces;
    },
    /**
     * Р¤СѓРЅРєС†РёСЏ РІРѕР·РІСЂР°С‰Р°РµС‚ РІСЃРµ С„РёС€РєРё РІРѕРєСЂСѓРі РїРµСЂРµРґР°РЅРЅРѕР№ РІ СЂР°Р·РјРµСЂРµ size.
     * @param {Number} piece - С„РёС€РєР°.
     * @param {Number} size - СЂР°Р·РјРµСЂ РєРІР°РґСЂР°С‚Р°.
     * @returns {Array} pieces
     */
    getPiecesByRect: function(piece, size) {

        var pieces = [
        ];
        var piece;
        var maxRowN = piece.row + size;
        var maxColumnN = piece.column + size;
        var row = piece.row - size;
        var column = piece.column - size;

        while (row <= maxRowN) {

            while (column <= maxColumnN) {
                if (this.cells[row] && this.cells[row][column]) {
                    pieces.push(this.cells[row][column].piece);
                }
                column += 1;
            }

            column = piece.column - size;
            row += 1;
        }

        return pieces;
    },
    /**
     * Р¤СѓРЅРєС†РёСЏ РІРѕР·РІСЂР°С‰Р°РµС‚ РІСЃРµ С„РёС€РєРё РЅР°С…РѕРґСЏС‰РёРµСЃСЏ РЅР° РїРѕР»Рµ
     * @returns {game.board.getAllPieces.pieces|Array}
     */
    getAllPieces: function() {

        var pieces = [],
            rowCounter,
            columnCounter;

        for (rowCounter in this.cells) {
            if (this.cells.hasOwnProperty(rowCounter)) {
                for (columnCounter in this.cells[rowCounter]) {
                    if (this.cells[rowCounter].hasOwnProperty(columnCounter)) {
                        pieces.push(this.cells[rowCounter][columnCounter].piece);
                    }
                }
            }
        }

        return pieces;
    },
    getNeighborsPieceByTypeID: function(piece, typeID, bonus) {

        var index;
        var pieces = [];
        var neighbors = piece.neighbors;
        var combinePieceTypesIDs = piece.type.combinePieceTypesIDs;

        for (index in neighbors) {
            if (neighbors[index]) {                
                
                if(bonus){                    
                    if (neighbors[index].typeID === typeID) {
                        pieces.push(neighbors[index]);
                    } else {
                        for (var i = 0, l = combinePieceTypesIDs.length; i < l; i += 1) {
                            if (combinePieceTypesIDs[i] === neighbors[index].typeID) {
                                pieces.push(neighbors[index]);
                                break;
                            }
                        }
                    }
                } else {
                    if (neighbors[index].typeID === typeID) {
                        pieces.push(neighbors[index]);
                    }
                }
                
            }
        }

        return pieces;

    },    
    /**
     * Р¤СѓРЅРєС†РёСЏ РїРµСЂРµС‚Р°СЃРѕРІС‹РІР°РµС‚ РїРѕР»РѕР¶РµРЅРёРµ РІСЃРµС… С„РёС€РµРє РЅР° РїРѕР»Рµ
     */
    checkShuffle: function() {
   
        var pieces = [];
        var cells = [];
        var piece = {};    
        var i, l;
        var cell, ci;       
        var isShuffle = false;
     
        while (this.combination.length === 0) {          
            isShuffle = true;
            
            pieces = this.getAllPieces();
            cells = this.getAllCells();
            
            for (i = 0, l = pieces.length; i < l; i += 1) {

                piece = pieces[i];
                ci = this.game.rnd.integerInRange(0, cells.length - 1);
                cell = cells[ci];
                cells.splice(ci, 1);

                this.cells[cell.position.row][cell.position.column].piece = piece;
                piece.setNewPosition(cell.position.row, cell.position.column, cell.position.x, cell.position.y);

            }
            
            this.initPiecesNeighbors();
            this.combination = this.getAllCombination();
        }
        
        return isShuffle;
    },
    /**
     * Р­С‚РѕС‚ РјРµРґРѕС‚ РѕРїСѓСЃРєР°РµС‚ С„РёС€РєРё РЅР° СЃРІРѕР±РѕРґРЅРѕРµ РјРµСЃС‚Рѕ Рё СЃРѕР·РґР°РµС‚ РЅРµРґРѕСЃС‚Р°СЋС‰РёРµ С„РёС€РєРё.
     * @returns {undefined}
     */
    putDownPieces: function() {

        var cell,
            cn,
            rn,
            piece,
            isNotFreePlace,
            yPositions = {};

        //С€Р°РіР°РµРј РїРѕ СЃС‚РѕР»Р±С†Р°Рј
        for (cn = this.columnsNumber - 1; cn >= 0; cn -= 1) {

            isNotFreePlace = false;

            //РїРµСЂРµР±РµСЂР°РµРј СЃС‚РѕР»Р±РµС† РїРѕРєР° РІ РЅРµРј РµСЃС‚СЊ СЃРІРѕР±РѕРґРЅРѕРµ РјРµСЃС‚Рѕ
            while (!isNotFreePlace) {

                isNotFreePlace = true;
                piece = null;
                cell = null;

                //С€Р°РіР°РµРј РїРѕ СЃС‚СЂРѕРєР°Рј
                for (rn = this.rowsNumber - 1; rn >= 0; rn -= 1) {

                    //РµС‰РµРј РїСѓСЃС‚СѓСЋ СЏС‡РµР№РєСѓ РїРѕР»СЏ
                    cell = this.getCell(rn, cn);

                    if (cell && !cell.piece) {

                        if (isNotFreePlace) {
                            isNotFreePlace = false;
                        }

                        //РёС‰РµРј С„РёС€РєСѓ РЅР°Рґ РїСѓСЃС‚РѕР№ СЏС‡РµР№РєРѕР№
                        while (!piece && rn > 0) {
                            rn -= 1;
                            piece = this.getPiece(rn, cn);
                        }

                        if (!piece) {
                            //this.removePiece(piece);
                            if (!yPositions[cell.position.column]) {
                                yPositions[cell.position.column] = 0;
                            }

                            yPositions[cell.position.column] -= PRApp.Grid.PIECE_SIZE;

                            piece = this.createPiece(cell.position.row, cell.position.column, cell.position.x, yPositions[cell.position.column]);
                        }

                        this.setNewPositionPiece(cell.position, piece);                       
                        
                        break;

                    }
                }

            }

        }

        this.initPiecesNeighbors();
        this.combination = this.getAllCombination();
        this.startPutDownPiecesAnimation();

    },
    startPutDownPiecesAnimation: function(){
        
        var pieces = this.getAllPieces();
        var counter = 0;       
        var number = pieces.length;
        var grid = this;
        
        var onCompleteAnimation = function(){
            
            counter += 1;
            
            if(counter === number){
                if(grid.checkShuffle()){
                    grid.startShuffleAnimation();
                } else {
                    PRApp.play.offWaitFinisheActions();
                }
            }
        };
        
        PRApp.play.onWaitFinisheActions();
        
        for(var i = 0, l = pieces.length; i < l; i += 1){
            pieces[i].startMoveToNewPosition(onCompleteAnimation);
        }
        
        
    },
    startShuffleAnimation: function(){
        
        var pieces = this.getAllPieces();
        var counter = 0;       
        var number = pieces.length;        
        
        var onCompleteAnimation = function(){
            
            counter += 1;
            
            if(counter === number){               
               PRApp.play.offWaitFinisheActions();
            }
        };
        
        PRApp.play.onWaitFinisheActions();
        
        for(var i = 0, l = pieces.length; i < l; i += 1){
            pieces[i].startMoveUpDown(onCompleteAnimation);
        }
        
    },
    setNewPositionPiece: function(position, piece) {

        this.cells[piece.row][piece.column].piece = null;
        this.cells[position.row][position.column].piece = piece;

        piece.setNewPosition(position.row, position.column, position.x, position.y);
        

    },
    getCombinationByPiece: function(piece, comboPieces){
        
        var nPieces = this.getNeighborsPieceByTypeID(piece, piece.typeID);
        var nPiece = null;
        var combination = [];
        var combinationByNPiece = [];
        var combo = [];
        var comboByNPiece = [];
        
        if (nPieces.length > 0) {
            for (var i = 0, l = nPieces.length; i < l; i += 1) {
                nPiece = nPieces[i];
                combo = [piece];
                combinationByNPiece = [];
                
                if(!this.hasPieceInArray(nPiece, comboPieces)){
                    
                    combinationByNPiece = this.getCombinationByPiece(nPiece, combo.concat(comboPieces));
                    
                    if(combinationByNPiece.length > 0){
                        
                        for(var j = 0, jl = combinationByNPiece.length; j < jl; j += 1){
                            comboByNPiece = combo.concat(combinationByNPiece[j]);
                            combination.push(comboByNPiece);
                        }
                        
                    } else {
                        combo.push(nPiece);
                        combination.push(combo);
                    } 
                }
            }
        } else {
            combination.push([piece]);
        }        
        
        return combination;
        
    },
    getAllCombination: function(){
        
        var pieces = this.getAllPieces();
        var piece = null;      
        var combo = [];
        var combination = [];
        var combinationByPiece = [];
        var combinationByPieceTemp = [];            
        var isInCombination = false;
    
        for (var i = 0, il = pieces.length; i < il; i += 1) {
           
            combo = [];
            combinationByPiece = [];
            isInCombination = false;
            piece = pieces[i];

            for (var v = 0, vl = combination.length; v < vl; v += 1) {
                if (this.hasPieceInArray(piece, combination[v])) {
                    isInCombination = true;
                    break;
                }
            }

            if (isInCombination) {
                continue;
            }
            
            combinationByPieceTemp = this.getCombinationByPiece(piece, []);            
           
           if(combinationByPieceTemp.length > 1){
               
                combinationByPieceTemp.sort(function(a, b) {

                    if (a.length < b.length) {
                        return -1;
                    }
                    if (a.length > b.length) {
                        return 1;
                    }
                    return 0;
                });
                
                combo = combinationByPieceTemp[combinationByPieceTemp.length - 1];
                combinationByPiece = this.getCombinationByPiece(combo[combo.length - 1], []);               
             
            } else {
                combo = (combinationByPieceTemp[0] || []);
                
                if (combo.length > 2) {
                    combinationByPiece.push(combo);
                }
            }
            
            combinationByPiece.sort(function(a, b) {

                if (a.length < b.length) {
                    return -1;
                }
                if (a.length > b.length) {
                    return 1;
                }
                return 0;
            });

            if (combinationByPiece.length > 0) {
                combination.push(combinationByPiece[combinationByPiece.length - 1]);
            }           
        }        
        
        return combination;
    },
    hasPieceInArray: function(piece, array){
        
        var has = false;
        
        for(var i = 0, l = array.length; i < l; i += 1){
            if(piece === array[i]){
                has = true;
                break;
            }
        }
        
        return has;        
    },
    /**
     * РЈРґР°Р»РµРЅРёРµ С„РёС€РєРё РёР· РјР°СЃСЃРёРІР°
     * @param {type} piece
     * @param {type} array
     * @returns {Array}
     */
    removePieceByArray: function(piece, array) {

        var newArray = [];

        for (var i = 0, l = array.length; i < l; i += 1) {
            if (piece === array[i]) {
                newArray = array.splice(i - 1, i);
                break;
            }
        }

        return newArray;
    }
};