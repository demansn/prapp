PRApp.PieceBackgound = function(game, grid, x, y, size, typeID, layer) {
    this.game = game;
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = PRApp.ObjectTypes.pieceBackgound[typeID];

    if (this.type.spriteID) {
        this.image = this.game.add.sprite(x, y, "ui", this.type.spriteID);
        this.image.scale.x = this.image.scale.y = 1 / (this.image.width / (size - 1));
        this.image.z = 3;
        layer.add(this.image);
    }
};


