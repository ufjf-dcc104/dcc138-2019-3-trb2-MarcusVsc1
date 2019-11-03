/*
variaveis globais:
0: libera a passagem do estagio 3, derrotando os inimigos do 4 e do 5
*/
function GameManager(pc) {
    this.pc = pc;
    this.estagios = [];
    this.criarEstagios();
    this.tema = new Audio();
    this.globalVar = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

}

//modelos de teletransporte
// cima para baixo: spriteLista.push(this.criarTeleporte(x.2,0.2,nX.5,8.9,m));
// baixo para cima: spriteLista.push(this.criarTeleporte(x,9.8,nX.5,1,m));
// direita para esquerda: spriteLista.push(this.criarTeleporte(11.8,y.2,1.5,nY.5,m));
// esquerda para direita: spriteLista.push(this.criarTeleporte(0.2,y.2,11,y.5,m));

/*modelo de mapa
mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });*/

GameManager.prototype.criarEstagios = function(){
    var spriteLista = [];
    var eventoLista = [];
    //estagio 1

    var mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,0,6,6,6,6,6,6,6,6],
        [6,11,6,0,6,11,11,11,11,11,11,6],
        [6,0,11,0,11,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [7,7,7,7,7,7,7,7,7,7,7,7],
        ]
        });
    spriteLista.push(this.criarTeleporte(3.2,0.2,1.5,8.9,1));    

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));
   

    //estagio 2
    
    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [6,0,0,6,0,0,0,0,0,0,0,0],
        [6,0,0,6,0,0,0,0,0,0,0,6],
        [6,0,0,6,6,6,0,6,6,6,6,6],
        [6,0,0,0,0,6,0,6,6,0,0,6],
        [6,0,0,6,0,6,0,6,0,0,0,6],
        [6,0,0,6,0,0,0,0,0,0,0,6],
        [6,0,0,6,0,0,0,0,0,0,0,6],
        [6,0,0,6,0,0,0,0,0,0,0,6],
        [6,0,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];
    var evento1 = function(){
        gerenciador.tema.loop = true;
        gerenciador.tema.src = "assets/tema1.mp3";
        gerenciador.tema.play();
        cena1.dialogo = "";
        var idx = cena1.estagio.eventos.indexOf(this);
        cena1.estagio.eventos.splice(idx);
    }
    eventoLista.push(evento1);
    spriteLista.push(this.criarTeleporte(2,9.8,3.5,1,0));
    spriteLista.push(this.criarTeleporte(11.8,1.2,1.5,8.5,2));
    spriteLista.push(this.criarInimigo(2, 5, 1));
    spriteLista.push(this.criarInimigo(1, 1, 2));
    spriteLista.push(this.criarInimigo(2, 10, 5));
    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 3

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,10,10,6,6,6,6,6],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,6,6,6,6,1,3,6,6,6,6,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,2,6,6,6,6,6,6,6,6,6,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,6,6,6,6,6,6,6,6,6,2,6],
        [0,0,0,0,0,0,0,0,0,0,0,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    evento1 = function(){
        if(gerenciador.globalVar[0] == 2){
            console.log("entrou.");
            gerenciador.estagios[2].mapa.cells[5][0].tipo = 0;
            gerenciador.estagios[2].mapa.cells[6][0].tipo = 0;
            gerenciador.estagios[2].sprites.push(gerenciador.criarTeleporte(6.2,0.2,6.5,8.9,5))
            gerenciador.estagios[2].sprites.push(gerenciador.criarTeleporte(5.2,0.2,5.5,8.9,5))
            var idx = cena1.estagio.eventos.indexOf(this);
            cena1.estagio.eventos.splice(idx);
        }
    }
    spriteLista.push(this.criarTeleporte(0.2,9,11,1.5,1));
    spriteLista.push(this.criarTeleporte(11.8,1.2,1.5,1.2,3));
    spriteLista.push(this.criarTeleporte(0.2,1.2,11,1.5,4));
    spriteLista.push(this.criarInimigo(2, 9, 8));
    spriteLista.push(this.criarInimigo(1, 1, 6));
    spriteLista.push(this.criarInimigo(2, 9, 4));
    eventoLista.push(evento1);
    

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 4

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [0,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,8,7,7,7,7,7,7,7,0,6],
        [6,0,9,9,9,9,9,9,9,9,0,6],
        [6,0,9,9,9,0,0,0,0,0,0,6],
        [6,0,9,9,9,0,0,0,0,0,0,6],
        [6,0,9,9,9,7,7,7,7,7,0,6],
        [6,0,9,9,9,9,9,9,9,9,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];
    evento1 = function () {
        if (cena1.spritesE.length == 0){
            gerenciador.globalVar[0]+= 1;
            var idx = cena1.estagio.eventos.indexOf(this);
            if(gerenciador.globalVar[0] == 2){
                cena1.assets.play("quest");
            }
            cena1.estagio.eventos.splice(idx);
        }
    }

    spriteLista.push(this.criarTeleporte(0.2,1.2,11,1.5,2));
    spriteLista.push(this.criarInimigo(2, 5, 5));
    spriteLista.push(this.criarInimigo(1, 1, 8));
    spriteLista.push(this.criarInimigo(2, 9, 1));
    eventoLista.push(evento1);

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 5

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [6,8,7,7,7,7,7,7,7,0,0,0],
        [6,9,9,9,9,9,9,9,0,0,8,6],
        [6,9,9,9,9,9,9,0,0,8,9,6],
        [6,9,9,9,9,9,0,0,8,9,9,6],
        [6,9,9,9,9,0,0,8,9,9,9,6],
        [6,9,9,9,0,0,8,9,9,9,9,6],
        [6,9,9,0,0,8,9,9,9,9,9,6],
        [6,0,0,0,8,9,9,9,9,9,9,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];
    evento1 = function () {
        if (cena1.spritesE.length == 0){
            gerenciador.globalVar[0]+= 1;
            var idx = cena1.estagio.eventos.indexOf(this);
            if(gerenciador.globalVar[0] == 2){
                cena1.assets.play("quest");
            }
            cena1.estagio.eventos.splice(idx);
        }
    }

    spriteLista.push(this.criarTeleporte(11.8,1.2,1.5,1.2,2));
    spriteLista.push(this.criarInimigo(0, 1, 8));
    spriteLista.push(this.criarInimigo(0, 4, 6));
    eventoLista.push(evento1);

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 6

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [0,0,0,0,0,0,0,0,0,0,0,6],
        [6,8,7,7,7,0,0,8,7,7,7,6],
        [6,0,9,9,9,0,0,9,9,9,9,6],
        [6,8,9,9,9,0,0,9,9,9,9,6],
        [6,9,9,9,9,0,0,9,9,9,0,6],
        [6,9,9,9,9,0,0,9,9,9,7,6],
        [6,0,9,9,9,0,0,9,9,9,9,6],
        [6,8,9,9,9,0,0,9,9,9,9,6],
        [6,6,6,6,6,0,0,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    spriteLista.push(this.criarTeleporte(5.2,9.8,5.5,1,2));
    spriteLista.push(this.criarTeleporte(6.2,9.8,6.5,1,2));
    spriteLista.push(this.criarTeleporte(0.2,1.2,11,1.5,6));
    spriteLista.push(this.criarObjeto(0, 1, 7, 2));
    spriteLista.push(this.criarObjeto(0, 1, 3, 2));
    spriteLista.push(this.criarObjeto(0, 10, 5, 1));

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 7

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,0,6,6,6,6,6,6,6,6,6,6],
        [6,0,6,6,6,0,6,6,6,6,0,0],
        [6,0,6,6,6,6,6,6,0,0,0,6],
        [6,0,6,6,0,0,6,6,1,3,6,6],
        [6,0,6,6,0,0,6,6,1,3,6,6],
        [6,0,0,0,0,0,0,0,0,0,6,6],
        [6,0,0,0,0,0,0,0,0,0,6,6],
        [6,0,0,0,0,0,0,0,0,0,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    spriteLista.push(this.criarObjeto(0, 5, 1, 0));
    spriteLista.push(this.criarTeleporte(11.8,1.2,1.5,1.5,5));
    spriteLista.push(this.criarTeleporte(1.2,0.2,6,8.9,7));

    spriteLista.push(this.criarInimigo(0, 4, 3));
    spriteLista.push(this.criarInimigo(3, 1, 6));

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 8

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,1,3,6,6,6,6,6],
        [6,9,9,9,9,1,3,9,9,9,9,6],
        [6,9,9,9,9,1,3,9,9,9,9,6],
        [6,9,9,4,4,4,4,4,4,9,9,6],
        [6,9,9,4,4,4,4,4,4,9,9,6],
        [6,9,9,4,4,4,4,4,4,9,9,6],
        [6,9,9,7,7,1,3,8,7,9,9,6],
        [6,9,9,9,9,1,3,9,9,9,9,6],
        [6,9,9,9,9,1,3,9,9,9,9,6],
        [6,6,6,6,6,4,4,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    spriteLista.push(this.criarTeleporte(5,9.8,1.5,1,6));
    spriteLista.push(this.criarTeleporte(6,9.8,1.5,1,6));
    spriteLista.push(this.criarTeleporte(5.2,0.2,1.5,8.9,8));
    spriteLista.push(this.criarTeleporte(6.2,0.2,1.5,8.9,8));
    spriteLista.push(this.criarPoder(0,3,4));
    spriteLista.push(this.criarPoder(1,8,4));

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 9

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,0,6],
        [6,0,0,0,6,0,0,6,6,6,0,6],
        [6,0,6,0,0,0,0,0,0,0,0,6],
        [6,0,6,6,6,6,6,6,6,6,6,6],
        [6,0,6,6,0,6,6,0,6,6,6,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,6,6,6,6,6,6,6,6,6,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,6,6,0,6,6,0,6,6,6,6],
        [6,0,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    spriteLista.push(this.criarTeleporte(1,9.8,5.5,1,7));
    spriteLista.push(this.criarTeleporte(10.2,0.2,5.5,8.9,9))
    spriteLista.push(this.criarObjeto(0, 5, 1, 1));
    spriteLista.push(this.criarObjeto(0, 6, 1, 2));
    spriteLista.push(this.criarInimigo(4, 10, 7));
    spriteLista.push(this.criarInimigo(5, 0.6, 5));
    

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 10

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,12,12,12,12,12,12,12,12,12,12,6],
        [6,11,11,11,11,11,11,11,11,11,11,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,8,7,0,8,7,0,8,7,0,6],
        [6,0,9,9,0,9,9,0,9,9,0,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,6,0,0,6,0,0,6,0,0,6,6],
        [6,6,6,0,0,0,0,0,0,6,6,6],
        [6,6,6,6,0,0,0,0,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    var evento2 = function () {
        gerenciador.tema.src = "assets/bluemoon.ogg";
        gerenciador.tema.play();
        var idx = cena1.estagio.eventos.indexOf(this);
        console.log(cena1.estagio.eventos.splice(idx, 1));
        cena1.dialogo = "\"Você não irá passar!!\"";
        
    }

    evento1 = function () {
        if (cena1.spritesE.length == 0){
            gerenciador.estagios[9].mapa.cells[5][0].tipo = 0;
            gerenciador.estagios[9].mapa.cells[6][0].tipo = 0;
            gerenciador.estagios[9].mapa.cells[5][1].tipo = 0;
            gerenciador.estagios[9].mapa.cells[6][1].tipo = 0;
            gerenciador.estagios[9].mapa.cells[5][9].tipo = 0;
            gerenciador.estagios[9].mapa.cells[6][9].tipo = 0;
            gerenciador.tema.src = "assets/tema1.mp3";
            gerenciador.tema.play();
            var idx = cena1.estagio.eventos.indexOf(this);
            cena1.assets.play("quest");
            cena1.estagio.eventos.splice(idx, 1);
            cena1.dialogo = "";
        }
    }
    eventoLista.push(evento1);
    eventoLista.push(evento2);

    spriteLista.push(this.criarInimigo(6, 5, 2));
    spriteLista.push(this.criarTeleporte(5.2,0.2,5.5,8.9,10));
    spriteLista.push(this.criarTeleporte(6.2,0.2,6.5,8.9,10));
    spriteLista.push(this.criarTeleporte(5.2,9.8,10.5,1,8));
    spriteLista.push(this.criarTeleporte(6.2,9.8,10.5,1,8))

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 11

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,8,7,7,7,0,0,8,7,7,7,6],
        [6,9,9,9,9,7,7,9,9,9,0,6],
        [6,9,9,9,0,9,9,9,9,9,7,6],
        [6,0,0,9,7,0,9,9,9,9,0,6],
        [6,0,7,9,9,7,9,0,9,9,7,6],
        [6,8,9,9,9,0,9,7,9,9,9,6],
        [6,9,0,0,0,0,0,0,0,0,0,6],
        [6,6,6,6,6,0,0,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    spriteLista.push(this.criarTeleporte(5.2,9.8,5.5,1,9));

    var event = function () {
        gerenciador.estagios[10].mapa.cells[3][5].tipo = 0;
        gerenciador.estagios[10].mapa.cells[3][6].tipo = 0;
        gerenciador.estagios[10].mapa.cells[3][7].tipo = 0;
    }


    spriteLista.push(this.criarEventador(2,5,event));

    event = function () {
        gerenciador.estagios[10].mapa.cells[5][1].tipo = 8;
        gerenciador.estagios[10].mapa.cells[6][1].tipo = 7;
        gerenciador.estagios[10].mapa.cells[2][4].tipo = 0;
        gerenciador.estagios[10].mapa.cells[2][3].tipo = 0;
        gerenciador.estagios[10].mapa.cells[2][2].tipo = 0;
    }

    spriteLista.push(this.criarEventador(1,1,event));

    event = function () {
        gerenciador.estagios[10].mapa.cells[4][6].tipo = 7;
        gerenciador.estagios[10].mapa.cells[4][5].tipo = 0;
    }

    spriteLista.push(this.criarEventador(4,4,event));

    event = function () {
        gerenciador.estagios[10].mapa.cells[4][2].tipo = 0;
        gerenciador.estagios[10].mapa.cells[7][2].tipo = 0;
        gerenciador.estagios[10].mapa.cells[4][3].tipo = 7;
        gerenciador.estagios[10].mapa.cells[7][3].tipo = 7;
    }

    spriteLista.push(this.criarEventador(10,5,event));

    event = function () {
        gerenciador.estagios[10].mapa.cells[9][1].tipo = 9;
        gerenciador.estagios[10].mapa.cells[9][2].tipo = 9;
        cena1.assets.play("quest");
    }

    spriteLista.push(this.criarEventador(5,7,event));

    event = function () {
        gerenciador.estagios[10].mapa.cells[5][6].tipo = 0;
        gerenciador.estagios[10].mapa.cells[6][6].tipo = 0;
        gerenciador.estagios[10].mapa.cells[6][7].tipo = 8;
    }

    spriteLista.push(this.criarEventador(10,3,event));

    event = function () {
        gerenciador.estagios[10].mapa.cells[5][1].tipo = 0;
        gerenciador.estagios[10].mapa.cells[6][1].tipo = 0;
        gerenciador.estagios[10].mapa.cells[5][0].tipo = 0;
        gerenciador.estagios[10].mapa.cells[6][0].tipo = 0;
    }

    spriteLista.push(this.criarEventador(1,6,event));

    event = function () {
        gerenciador.estagios[10].mapa.cells[3][5].tipo = 9;
        gerenciador.estagios[10].mapa.cells[3][6].tipo = 9;
        gerenciador.estagios[10].mapa.cells[3][7].tipo = 9;
        gerenciador.estagios[10].mapa.cells[5][1].tipo = 0;
        gerenciador.estagios[10].mapa.cells[6][1].tipo = 0;
        gerenciador.estagios[10].mapa.cells[2][2].tipo = 7;
        gerenciador.estagios[10].mapa.cells[2][3].tipo = 9;
        gerenciador.estagios[10].mapa.cells[2][4].tipo = 9;
        gerenciador.estagios[10].mapa.cells[4][6].tipo = 9;
        gerenciador.estagios[10].mapa.cells[4][5].tipo = 7;
        gerenciador.estagios[10].mapa.cells[4][2].tipo = 7;
        gerenciador.estagios[10].mapa.cells[7][2].tipo = 8;
        gerenciador.estagios[10].mapa.cells[4][3].tipo = 9;
        gerenciador.estagios[10].mapa.cells[7][3].tipo = 9;
        gerenciador.estagios[10].mapa.cells[9][1].tipo = 0;
        gerenciador.estagios[10].mapa.cells[9][2].tipo = 7;
        gerenciador.estagios[10].mapa.cells[5][6].tipo = 7;
        gerenciador.estagios[10].mapa.cells[5][0].tipo = 6;
        gerenciador.estagios[10].mapa.cells[6][0].tipo = 6;
        gerenciador.estagios[10].mapa.cells[6][6].tipo = 9;
        gerenciador.estagios[10].mapa.cells[6][7].tipo = 9;

        cena1.spritesEV.forEach( function (sprite){
            sprite.evented = 0;
        })
        
    }

    spriteLista.push(this.criarEventador(9,8,event));

    spriteLista.push(this.criarTeleporte(6.2,9.8,6.5,1,9)); 
    spriteLista.push(this.criarTeleporte(5.2,0.2,6.5,8.9,11)); 
    spriteLista.push(this.criarTeleporte(6.2,0.2,6.5,8.9,11));
    spriteLista.push(this.criarDisparador(7,8,2));
    spriteLista.push(this.criarDisparador(2,8,3));
    spriteLista.push(this.criarDisparador(1,5,3));
    spriteLista.push(this.criarDisparador(5,5,2));
    spriteLista.push(this.criarDisparador(4,1,0));
    spriteLista.push(this.criarDisparador(5,2,0));
    spriteLista.push(this.criarDisparador(10,1,0));
    spriteLista.push(this.criarDisparador(7,6,1));    

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 12

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,10,10,6,6,6,6,6],
        [6,0,0,0,0,0,0,0,0,0,0,6],
        [6,0,0,0,6,1,3,6,0,0,0,6],
        [6,0,0,6,6,1,3,6,6,0,0,6],
        [6,1,3,6,4,4,4,4,6,1,3,6],
        [6,1,3,4,4,4,4,4,4,1,3,6],
        [6,1,3,6,6,4,4,6,6,1,3,6],
        [6,0,0,0,6,6,6,6,0,0,0,6],
        [6,6,0,0,0,0,0,0,0,0,6,6],
        [6,6,6,6,6,0,0,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    spriteLista.push(this.criarTeleporte(5.2,9.8,5.5,1,10)); 
    spriteLista.push(this.criarTeleporte(6.2,9.8,6.5,1,10)); 
    spriteLista.push(this.criarTeleporte(0.2,1.2,11,1.5,12));
    spriteLista.push(this.criarTeleporte(11.8,1.2,1.5,1.5,13));

    spriteLista.push(this.criarInimigo(7,7,4))
    spriteLista.push(this.criarInimigo(7,4,4))

    spriteLista.push(this.criarDisparador(5,6,3)); 
    spriteLista.push(this.criarDisparador(6,6,3));

    event = function () {
        gerenciador.estagios[11].mapa.cells[0][1].tipo = 0;
    }

    spriteLista.push(this.criarEventador(5,1,event));

    event = function () {
        gerenciador.estagios[11].mapa.cells[11][1].tipo = 0;
    }

    spriteLista.push(this.criarEventador(6,1,event));

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 13

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [6,8,7,7,7,7,7,7,7,7,0,0],
        [6,0,0,9,0,9,9,9,9,9,0,6],
        [6,0,8,0,7,0,9,9,9,9,0,6],
        [6,0,9,7,0,7,0,9,9,9,0,6],
        [6,0,0,9,7,0,7,0,0,9,0,6],
        [6,0,8,9,9,7,0,7,0,9,0,6],
        [6,0,9,9,9,9,0,0,8,9,0,6],
        [6,0,9,0,9,9,7,7,0,0,0,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    
    spriteLista.push(this.criarInimigo(7,1,6));
    spriteLista.push(this.criarTeleporte(11.8,1.2,1.5,1.5,11));
    spriteLista.push(this.criarInimigo(0,4,1));

    spriteLista.push(this.criarDisparador(2,5,2)); 
    spriteLista.push(this.criarDisparador(8,8,1)); 

    event = function () {
        gerenciador.estagios[12].mapa.cells[3][2].tipo = 0;
        gerenciador.estagios[12].mapa.cells[4][3].tipo = 0;
        gerenciador.estagios[12].mapa.cells[5][4].tipo = 0;
        gerenciador.estagios[12].mapa.cells[6][5].tipo = 0;
        gerenciador.estagios[12].mapa.cells[7][6].tipo = 0;
        gerenciador.estagios[12].mapa.cells[8][7].tipo = 0;
    }

    spriteLista.push(this.criarEventador(3,8,event));


    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

    //estagio 14

    mapa = new Map({COLUMNS:12, LINES:10, assets: assetsMng, m:
        [
        [6,6,6,6,6,6,6,6,6,6,6,6],
        [0,0,0,0,0,0,0,8,0,0,0,6],
        [6,8,7,7,7,7,9,9,0,0,0,6],
        [6,9,9,9,0,0,0,9,1,2,3,6],
        [6,9,9,0,0,8,7,9,1,2,3,6],
        [6,9,0,0,8,9,9,9,1,2,3,6],
        [6,9,0,8,8,9,9,9,1,2,3,6],
        [6,0,0,9,9,9,9,0,1,2,3,6],
        [6,0,0,0,0,0,0,0,8,0,8,6],
        [6,6,6,6,6,6,6,6,6,6,6,6],
        ]
        });
    spriteLista = [];
    eventoLista = [];

    spriteLista.push(this.criarInimigo(7,2,5));
    spriteLista.push(this.criarInimigo(8,8,2));
    spriteLista.push(this.criarInimigo(8,10,3));
    spriteLista.push(this.criarInimigo(8,9,4));
    spriteLista.push(this.criarTeleporte(0.2,1.2,11,1.5,11));

    this.estagios.push(this.fabricaDeEstagios(mapa,spriteLista,eventoLista));

}

//direcao => 0: baixo 1: esquerda, 2: direita, 3: cima
GameManager.prototype.criarInimigo = function(tipo, posX, posY) {
    var inimigo;
    switch (tipo){
        //morcego
        case 0:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm:40 + Math.random()*25, imgX:0, imgY:0, 
                imagem: "monster", comportar: persegue(this.pc), props: { tipo: "npc" }});
            break;
        //diabinho
        case 1:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm:20, imgX:0, imgY:1, 
                imagem: "monster", comportar: persegue(this.pc), props: { tipo: "npc" }});
            break;
        //caveira
        case 2:
             inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm: 30, imgX:1, imgY:1, 
                imagem: "monster", comportar: persegue(this.pc), props: { tipo: "npc" }});
             break;
        //ogro
        case 3:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm: 20, imgX:2, imgY:0, 
               vidas: 2, imagem: "monster", comportar: persegue(this.pc), props: { tipo: "npc" }});
            break;
        //touro a esquerda
        case 4:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm: 0, imgX:3, imgY:0, vx:0, vy:0,
                direcao: 1, imagem: "monster", comportar: atirarRochas, props: { tipo: "npc" }});
            break;
        //touro a direita
        case 5:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm: 0, imgX:3, imgY:0, vx:0, vy:0,
                direcao: 2, imagem: "monster", comportar: atirarRochas, props: { tipo: "npc" }});
            break;
        //chefe 1
        case 6:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 24, h: 24, vm: 50, imgY:2, vidas: 20, vx: 1, rockCount: 0,
                imagem: "bigboss", globalCD: 2, baseCD: 2, desenhar: desenharChefe, comportar: atirarRochas2, mover: moverChefe, 
                props: { tipo: "npc", boss: 1 }});
            break;
        //necromante
        case 7:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm: 0, imgX:3, imgY:1, vx:0, vy:0, globalCD: 1.5,
                vidas: 3, imagem: "monster", comportar: necromancia, props: { tipo: "npc" }});
            break;
        case 8:
            inimigo = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm: 0, imgX:3, imgY:0, vx:0, vy:0,
                direcao: 0, imagem: "monster", comportar: atirarRochas, props: { tipo: "npc" }});
            break;
    }
    return inimigo;
}

//criador de teleporte
GameManager.prototype.criarTeleporte = function (posX, posY, telX, telY, idxMapa) {
    var teleporte = new Sprite({ x: posX*32, y: posY*32, w: 40, h: 40, vm: 50, imgX:2, imgY:1, tX: telX*32, tY: telY*32,
                 comportar: undefined, props: { tipo: "teleporte" ,  idx: idxMapa }, desenhar: function(){}});
    return teleporte;
}

//cria estagios
GameManager.prototype.fabricaDeEstagios = function (map, spriteLista, eventoLista) {
    var estagio = {
        mapa: null,
        eventos: [],
        sprites: []
    }
    estagio.mapa = map;
    estagio.sprites = spriteLista;
    estagio.eventos = eventoLista;
    return estagio;
}

//cria objetos. ate o momento somente dispara bolas de fogo
GameManager.prototype.criarObjeto = function (numero, posX, posY, direct) {
    var objeto;
    switch (numero) {
        case 0:
            objeto = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm:0, direcao: direct, imgX:0, imgY:0, 
                imagem: "gargoyle", mover: moverObjeto, comportar: atirarFireball, props: { tipo: "objeto" }});
            break;
    }
    return objeto;
}

//cria poder de recuperar hp e mana
GameManager.prototype.criarPoder = function (numero, posX, posY) {
    var poder;
    switch (numero) {
        case 0:
            poder = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm:0, direcao: 0, imgX:numero, imgY: 1, 
                imagem: "crystal", desenhar: desenhaTiro, props: { tipo: "poder", modelo: "hp" }});
            break;
        case 1:
            poder = new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm:0, direcao: 0, imgX:numero, imgY: 1, 
                imagem: "crystal", desenhar: desenhaTiro, props: { tipo: "poder", modelo: "mana" }});
            break;
    }
    return poder;
}

//cria disparador de bolas de fogo quando entram em contato com a espada
GameManager.prototype.criarDisparador = function (posX, posY, direct) {
    return new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm:0, direcao: direct, imgX:2, imgY:1, 
                swCD: 0.6, imagem: "object", props: { tipo: "disparador" }});
}

//cria um eventador. dispara um evento quando uma bola de fogo do disparador entra em contato
GameManager.prototype.criarEventador = function (posX, posY, event) {
    return new Sprite({ x: posX*32+16, y: posY*32+16, w: 12, h: 12, vm:0, imgX:3, imgY:0, evented: 0,
                imagem: "crystal", desenhar: desenhaTiro, evento: event, props: { tipo: "eventador" }});
}








