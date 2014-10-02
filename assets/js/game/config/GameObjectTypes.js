PRApp.ObjectTypes = {
    pieces: {
        cheese: {
            ID: "cheese",
            spriteID: PRApp.resources.pieces.cheese,            
            animationID: PRApp.resources.animations.cheese,
            name: "cheese",
            bonusPieceTypesIDs: {
                "x": "cheese_x",
                "y": "cheese_y",
                "bomb": "cheese_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["cheese_x", "cheese_y", "cheese_bomb", "multi"],
            deltaSize: 6
        },
        cheese_x: {
            ID: "cheese_x",
            spriteID: PRApp.resources.pieces.cheese_x,
            bonus: "x",
            ownerTypeID: "cheese",
            bonusPieceTypesIDs: {
                "x": "cheese_x",
                "y": "cheese_y",
                "bomb": "cheese_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["cheese", "cheese_y", "cheese_bomb", "multi"],
            deltaSize: 8
        },
        cheese_y: {
            ID: "cheese_y",
            spriteID: PRApp.resources.pieces.cheese_y,
            bonus: "y",
            ownerTypeID: "cheese",
            bonusPieceTypesIDs: {
                "x": "cheese_x",
                "y": "cheese_y",
                "bomb": "cheese_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["cheese", "cheese_y", "cheese_bomb", "multi"],
            deltaSize: 8
        },
        cheese_bomb: {
            ID: "cheese_bomb",
            spriteID: PRApp.resources.pieces.cheese_bomb,
            bonus: "bomb",
            ownerTypeID: "cheese",
            bonusPieceTypesIDs: {
                "x": "cheese_x",
                "y": "cheese_y",
                "bomb": "cheese_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["cheese", "cheese_y", "cheese_bomb", "multi"],
            deltaSize: 8
        }, 
        bacon: {
            ID: "bacon",
            spriteID: PRApp.resources.pieces.bacon,
            animationID: PRApp.resources.animations.bacon,
            name: "bacon",
            bonusPieceTypesIDs: {
                "x": "bacon_x",
                "y": "bacon_y",
                "bomb": "bacon_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["bacon_x", "bacon_y", "bacon_bomb", "multi"],
            deltaSize: -15,
            deltaY: 0.63
        },
        bacon_x: {
            ID: "bacon_x",
            spriteID: PRApp.resources.pieces.bacon_x,
            bonus: "x",
            ownerTypeID: "bacon",
            bonusPieceTypesIDs: {
                "x": "bacon_x",
                "y": "bacon_y",
                "bomb": "bacon_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["bacon", "bacon_y", "bacon_bomb", "multi"]
        },
        bacon_y: {
            ID: "bacon_y",
            spriteID: PRApp.resources.pieces.bacon_y,
            bonus: "y",
            ownerTypeID: "bacon",
            bonusPieceTypesIDs: {
                "x": "bacon_x",
                "y": "bacon_y",
                "bomb": "bacon_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["bacon", "bacon_y", "bacon_bomb", "multi"]
        },
        bacon_bomb: {
            ID: "bacon_bomb",
            spriteID: PRApp.resources.pieces.bacon_bomb,
            bonus: "bomb",
            ownerTypeID: "bacon",
            bonusPieceTypesIDs: {
                "x": "bacon_x",
                "y": "bacon_y",
                "bomb": "bacon_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["bacon", "bacon_y", "bacon_bomb", "multi"]
        }, 
        broccoli: {
            ID: "broccoli",
            spriteID: PRApp.resources.pieces.broccoli,
            animationID: PRApp.resources.animations.broccoli,
            name: "broccoli",
            bonusPieceTypesIDs: {
                "x": "broccoli_x",
                "y": "broccoli_y",
                "bomb": "broccoli_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["broccoli_x", "broccoli_y", "broccoli_bomb", "multi"],
            deltaSize: -5,
            deltaY: 0.58
        },
         broccoli_x: {
            ID: "broccoli_x",
            spriteID: PRApp.resources.pieces.broccoli_x,
            bonus: "x",
            ownerTypeID: "broccoli",
            bonusPieceTypesIDs: {
                "x": "broccoli_x",
                "y": "broccoli_y",
                "bomb": "broccoli_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["broccoli", "broccoli_y", "broccoli_bomb", "multi"]
        },
        broccoli_y: {
            ID: "broccoli_y",
            spriteID: PRApp.resources.pieces.broccoli_y,
            bonus: "y",
            ownerTypeID: "broccoli",
            bonusPieceTypesIDs: {
                "x": "broccoli_x",
                "y": "broccoli_y",
                "bomb": "broccoli_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["broccoli", "broccoli_y", "broccoli_bomb", "multi"]
        },
        broccoli_bomb: {
            ID: "broccoli_bomb",
            spriteID: PRApp.resources.pieces.broccoli_bomb,
            bonus: "bomb",
            ownerTypeID: "broccoli",
            bonusPieceTypesIDs: {
                "x": "broccoli_x",
                "y": "broccoli_y",
                "bomb": "broccoli_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["broccoli", "broccoli_y", "broccoli_bomb", "multi"]
        }, 
        carrot: {
            ID: "carrot",
            spriteID: PRApp.resources.pieces.carrot,
            animationID: PRApp.resources.animations.carrot,
            name: "carrot",
            bonusPieceTypesIDs: {
                "x": "carrot_x",
                "y": "carrot_y",
                "bomb": "carrot_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["carrot_x", "carrot_y", "carrot_bomb", "multi"],
            deltaSize: -5,
            deltaY: 0.55
        },
         carrot_x: {
            ID: "carrot_x",
            spriteID: PRApp.resources.pieces.carrot_x,
            bonus: "x",
            ownerTypeID: "carrot",
            bonusPieceTypesIDs: {
                "x": "carrot_x",
                "y": "carrot_y",
                "bomb": "carrot_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["carrot", "carrot_y", "carrot_bomb", "multi"]
        },
        carrot_y: {
            ID: "carrot_y",
            spriteID: PRApp.resources.pieces.carrot_y,
            bonus: "y",
            ownerTypeID: "carrot",
            bonusPieceTypesIDs: {
                "x": "carrot_x",
                "y": "carrot_y",
                "bomb": "carrot_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["carrot", "carrot_y", "carrot_bomb", "multi"]
        },
        carrot_bomb: {
            ID: "carrot_bomb",
            spriteID: PRApp.resources.pieces.carrot_bomb,
            bonus: "bomb",
            ownerTypeID: "carrot",
            bonusPieceTypesIDs: {
                "x": "carrot_x",
                "y": "carrot_y",
                "bomb": "carrot_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["carrot", "carrot_y", "carrot_bomb", "multi"]
        }, 
        corn: {
            ID: "corn",
            spriteID: PRApp.resources.pieces.corn,
            animationID: PRApp.resources.animations.corn,
            name: "carrot",
            bonusPieceTypesIDs: {
                "x": "corn_x",
                "y": "corn_y",
                "bomb": "corn_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["corn_x", "corn_y", "corn_bomb", "multi"],
            deltaSize: 5,
            deltaY: 0.52
        },
         corn_x: {
            ID: "corn_x",
            spriteID: PRApp.resources.pieces.corn_x,
            bonus: "x",
            ownerTypeID: "corn",
            bonusPieceTypesIDs: {
                "x": "corn_x",
                "y": "corn_y",
                "bomb": "corn_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["corn", "corn_y", "corn_bomb", "multi"]
        },
        corn_y: {
            ID: "corn_y",
            spriteID: PRApp.resources.pieces.corn_y,
            bonus: "y",
            ownerTypeID: "corn",
            bonusPieceTypesIDs: {
                "x": "corn_x",
                "y": "corn_y",
                "bomb": "corn_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["corn", "corn_y", "corn_bomb", "multi"]
        },
        corn_bomb: {
            ID: "corn_bomb",
            spriteID: PRApp.resources.pieces.corn_bomb,
            bonus: "bomb",
            ownerTypeID: "corn",
            bonusPieceTypesIDs: {
                "x": "corn_x",
                "y": "corn_y",
                "bomb": "corn_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["corn", "corn_y", "corn_bomb", "multi"]
        }, 
        onion: {
            ID: "onion",
            spriteID: PRApp.resources.pieces.onion,
            animationID: PRApp.resources.animations.onion,
            name: "onion",
            bonusPieceTypesIDs: {
                "x": "onion_x",
                "y": "onion_y",
                "bomb": "onion_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["onion_x", "onion_y", "onion_bomb", "multi"]
        },
         onion_x: {
            ID: "onion_x",
            spriteID: PRApp.resources.pieces.onion_x,
            bonus: "x",
            ownerTypeID: "onion",
            bonusPieceTypesIDs: {
                "x": "onion_x",
                "y": "onion_y",
                "bomb": "onion_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["onion", "onion_y", "onion_bomb", "multi"]
        },
        onion_y: {
            ID: "onion_y",
            spriteID: PRApp.resources.pieces.onion_y,
            bonus: "y",
            ownerTypeID: "onion",
            bonusPieceTypesIDs: {
                "x": "onion_x",
                "y": "onion_y",
                "bomb": "onion_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["onion", "onion_y", "onion_bomb", "multi"]
        },
        onion_bomb: {
            ID: "onion_bomb",
            spriteID: PRApp.resources.pieces.onion_bomb,
            bonus: "bomb",
            ownerTypeID: "onion",
            bonusPieceTypesIDs: {
                "x": "onion_x",
                "y": "onion_y",
                "bomb": "onion_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["onion", "onion_y", "onion_bomb", "multi"]
        }, 
        tomato: {
            ID: "tomato",
            spriteID: PRApp.resources.pieces.tomato,
            animationID: PRApp.resources.animations.tomato,
            name: "tomato",
            bonusPieceTypesIDs: {
                "x": "tomato_x",
                "y": "tomato_y",
                "bomb": "tomato_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["tomato_x", "tomato_y", "tomato_bomb", "multi"]
        },
         tomato_x: {
            ID: "tomato_x",
            spriteID: PRApp.resources.pieces.tomato_x,
            bonus: "x",
            ownerTypeID: "tomato",
            bonusPieceTypesIDs: {
                "x": "tomato_x",
                "y": "tomato_y",
                "bomb": "tomato_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["tomato", "tomato_y", "tomato_bomb", "multi"]
        },
        tomato_y: {
            ID: "tomato_y",
            spriteID: PRApp.resources.pieces.tomato_y,
            bonus: "y",
            ownerTypeID: "tomato",
            bonusPieceTypesIDs: {
                "x": "tomato_x",
                "y": "tomato_y",
                "bomb": "tomato_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["tomato", "tomato_y", "tomato_bomb", "multi"]
        },
        tomato_bomb: {
            ID: "tomato_bomb",
            spriteID: PRApp.resources.pieces.tomato_bomb,
            bonus: "bomb",
            ownerTypeID: "tomato",
            bonusPieceTypesIDs: {
                "x": "tomato_x",
                "y": "tomato_y",
                "bomb": "tomato_bomb",
                "multi": "multi"
            },
            combinePieceTypesIDs: ["tomato", "tomato_y", "tomato_bomb", "multi"]
        }, 
               
        multi: {
            ID: "multi",
            spriteID: PRApp.resources.pieces.multi,
            bonus: "multi",
            combinePieceTypesIDs: [
                "cheese",
                "bacon",
                "broccoli",
                "carrot",                
                "corn",
                "corn_x",
                "corn_y",
                "corn_bomb",
                "onion",
                "onion_x",
                "onion_y",
                "onion_bomb",
                "tomato",
                "tomato_x",
                "tomato_y",
                "tomato_bomb",
                "cheese_x",
                "cheese_y",
                "cheese_bomb",
                "bacon_x",
                "bacon_y", 
                "bacon_bomb",
                "broccoli_x",
                "broccoli_y",
                "broccoli_bomb",
                "carrot_x",
                "carrot_y",
                "carrot_bomb"]
        }


    },
    pieceBackgound: {
        0: {
            ID: "0"
        },
        1: {
            ID: "1",
            spriteID: PRApp.resources.img.item_bg
        }
    },
    bonus: {
        x: "x",
        y: "y",
        bomb: "bomb",
        multi: "multi"
    },
    goals: {
        collectPoints: {
            id: "collectPoints",
            message: "Collect points <number>"
        },
        collectPieces: {
            id: "collectPieces",
            message: "Collect <number> pieces type <pieceName>"
        }
    },
    mapItems: {
        1: {     
            background: "stone_1",
            lock: 'lock_1',
            scale: 1
            
        },
        2: {  
            background: "stone_2",
            lock: 'lock_2',
            scale: 0.9
        },
        3: {  
            background: "stone_3",
            lock: 'lock_3',
            scale: 0.8
        }
    }
};


