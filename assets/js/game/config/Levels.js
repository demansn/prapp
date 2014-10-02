PRApp.Levels = {
    "1": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID],
        grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]           
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2_11,
        moves: 30,
        starsNamber:0,
        isLock:false,
        hasLoadTutorial: true,
        tutorial:{
            name: "base",
            actions: 2,
            initGrid: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
            loadColumns: {
                1: [1,1,1,1,1]
            },
            selectedPieces: {
                1: [
                    {x:2, y: 2},
                    {x:3, y: 2},
                    {x:4, y: 2}
                ]
            },
            text: {
                1: "Swipe\n3 in a row to\ncollect",
                2: "Here are your\ncurrent objective and\nremaining moves"
            }
        }
    },
    "2": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
           ],
        grid: [
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0]   
        ],
        goals: [
            {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2_11,
        moves: 30,
        starsNamber:0,
        isLock:true,
        hasLoadTutorial: true,
        tutorial:{
            name: PRApp.TUTORIAL.BONUS,
            actions: 5,
            initGrid: [
                [0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 2, 0],
                [0, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
            loadColumns: {},
            selectedPieces: {
                1: [
                    {x:2, y: 4},
                    {x:3, y: 4},
                    {x:4, y: 4},
                    {x:5, y: 4}
                ],
                2: [
                    {x:5, y: 0},
                    {x:5, y: 1},
                    {x:5, y: 2},
                    {x:5, y: 3}
                ],
                5: [
                    {x:5, y: 3},
                    {x:5, y: 4}                    
                ]
            },
            text: {
                1: "Swipe 4\nor more in a row\nto get bonus chips",
                2: "Swipe 4\nor more in a row\nto get bonus chips",
                3: "You should make\na match with bonus\nchip to activate it",
                4: "Also you could combine different\nbonuses for additional effects.\nTry it now and complete the level"
            }
        }
    },
    "3": {
        piecesTypes: [ 
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.corn.ID,
            PRApp.ObjectTypes.pieces.onion.ID
        ],
        grid: [
            [0, 0, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 0, 0]   
        ],
        goals: [
            {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2_11,
        moves: 30,
        starsNamber:0,
        isLock:true,
        hasLoadTutorial: true,
        tutorial:{
            name: PRApp.TUTORIAL.MULTI,
            actions: 2,
            initGrid: [
                [0, 0, 1, 1, 1, 1, 0],
                [0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
            loadColumns: {
                5: [1,1]
            },
            selectedPieces: {
                1: [
                    {x:2, y: 2},
                    {x:2, y: 1},
                    {x:2, y: 0},
                    {x:3, y: 0},
                    {x:4, y: 0},
                    {x:5, y: 0},
                    {x:5, y: 1},
                    {x:5, y: 2}   
                ],
                2: [
                    {x:5, y: 2},
                    {x:5, y: 1},
                    {x:5, y: 0}
                ]
            },
            text: {
                1: "Swipe 8\nor more in a row\nto get multibonus",
                2: "Multibonus could be used\nto clear the field of\nthe chips of one type.\nTry it now and\ncomplete the level.\nGood Luck!"
            }
        }
    },
    "4": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID
        ],
        grid: [
            [0, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 0, 0]   
        ],
        goals: [
           {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2_11,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "5": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.tomato.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2_11,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "6": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID],
        grid: [
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "7": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.corn.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.corn.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "8": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "9": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "10": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID],
        grid: [
            [0, 0, 0, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0, 0, 0]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.tomato.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_2,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "11": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID],
        grid: [
            [1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.tomato.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.corn.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "12": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            },{
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            },{
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "13": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID],
        grid: [
            [1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "14": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "15": {
        piecesTypes: [
             PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.corn.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    },
    "16": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID],
        grid: [
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "17": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.corn.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "18": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID
            ],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "19": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID],
        grid: [
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 0, 1, 1, 0],
            [1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "20": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID],
        grid: [
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "21": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID
        ],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "22": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID,
            PRApp.ObjectTypes.pieces.onion.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.onion.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "23": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "24": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID],
        grid: [
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.carrot.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.tomato.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "25": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID
        ],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 0, 1],
            [1, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 0, 0, 1],
            [1, 0, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "26": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID,
            PRApp.ObjectTypes.pieces.corn.ID,
            PRApp.ObjectTypes.pieces.onion.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "27": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID],
        grid: [
            [1, 1, 1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.tomato.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "28": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 0, 0],
            [1, 0, 0, 1, 0, 0, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "29": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID,
            PRApp.ObjectTypes.pieces.tomato.ID],
        grid: [
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.bacon.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }, 
    "30": {
        piecesTypes: [
            PRApp.ObjectTypes.pieces.cheese.ID,
            PRApp.ObjectTypes.pieces.bacon.ID,
            PRApp.ObjectTypes.pieces.broccoli.ID,
            PRApp.ObjectTypes.pieces.carrot.ID
        ],
        grid: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]   
        ],
        goals: [
             {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.cheese.ID,
                number: 15
            }, {
                id: "collectPieces",
                piceTypeID: PRApp.ObjectTypes.pieces.broccoli.ID,
                number: 15
            }
        ],
        background: PRApp.resources.backgrounds.picninc_background_3,
        moves: 30,
        starsNamber:0,
        isLock:true
    }
};


