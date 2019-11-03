function Scene(params) {
    var exemplo ={
        pc: null,
        boss: null,
        spritesE: [],
        spritesT: [],
        spritesPoder: [],
        spritesTE: [],
        spritesXP: [],
        spritesTP: [],
        spritesO: [],
        spritesD: [],
        spritesEV: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null,
        stageIndex: 0,
        estagio: null,
        gamer: null,
        spriteCounter: 0,
        dialogo: "",
        bruxa: null
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

//adiciona os sprites ao scene
Scene.prototype.adicionar = function(sprite){
    if(sprite.props.tipo == "pc"){
        this.pc = sprite;
    }
    if(sprite.props.tipo == "bruxa"){
        this.bruxa = sprite;
    }
    if(sprite.props.tipo == "tiro"){
        this.spritesT.push(sprite);
    }
    if(sprite.props.tipo == "eventador"){
        this.spritesEV.push(sprite);
    }
    if(sprite.props.tipo == "npc"){
        if(sprite.props.boss == 1) {
            this.boss = sprite;
        }
        this.spritesE.push(sprite);
    }
    if(sprite.props.tipo == "objeto"){
        this.spritesO.push(sprite);
    }
    if(sprite.props.tipo == "poder"){
        this.spritesPoder.push(sprite);
    }
    if(sprite.props.tipo == "tiroE" || sprite.props.tipo == "tiroQ"){
        this.spritesTE.push(sprite);
    }
    if(sprite.props.tipo == "disparador"){
        this.spritesD.push(sprite);
    }
    if(sprite.props.tipo == "boom"){
        this.spritesXP.push(sprite);
    }
    if(sprite.props.tipo == "teleporte"){
        console.log("Adicionando teleporte");
        this.spritesTP.push(sprite);
    }
    
    sprite.scene = this;
};

//desenha os sprites. os ifs são para colcoar o sprites em cima ou não do pc
Scene.prototype.desenhar = function(){
    
    for(var i = 0; i<this.spritesE.length; i++){
        this.spritesE[i].desenhar(this.ctx);
    }  
    for(var i = 0; i<this.spritesD.length; i++){
        if(this.spritesD[i].y <= this.pc.y)this.spritesD[i].desenhar(this.ctx);
    } 
    for(var i = 0; i<this.spritesEV.length; i++){
        if(this.spritesEV[i].y <= this.pc.y)this.spritesEV[i].desenhar(this.ctx);
    } 
     
    if(this.pc.direcao == 0) {
        if(this.pc.desenhar){this.pc.desenhar(this.ctx);}  
    }
    for(var i = 0; i<this.spritesXP.length; i++){
    this.spritesXP[i].desenhar(this.ctx);
    } 
    for(var i = 0; i<this.spritesT.length; i++){
        this.spritesT[i].desenhar(this.ctx);
    }  
    for(var i = 0; i<this.spritesPoder.length; i++){
        this.spritesPoder[i].desenhar(this.ctx);
    } 

    if(this. bruxa != null && this.bruxa.desenhar){this.bruxa.desenhar(this.ctx);}  

    for(var i = 0; i<this.spritesTE.length; i++){
        this.spritesTE[i].desenhar(this.ctx);
    } 

    for(var i = 0; i<this.spritesO.length; i++){
        this.spritesO[i].desenhar(this.ctx);
    } 
    
    for(var i = 0; i<this.spritesTP.length; i++){
    this.spritesTP[i].desenhar(this.ctx);
    } 
    if(this.pc.direcao!=0){
        if(this.pc.desenhar){this.pc.desenhar(this.ctx);}  
    }

    for(var i = 0; i<this.spritesD.length; i++){
        if(this.spritesD[i].y > this.pc.y)this.spritesD[i].desenhar(this.ctx);
    } 
    for(var i = 0; i<this.spritesEV.length; i++){
        if(this.spritesEV[i].y > this.pc.y)this.spritesEV[i].desenhar(this.ctx);
    } 
};

//move os sprites
Scene.prototype.mover = function(dt){
    for(var i = 0; i<this.spritesE.length; i++){
        this.spritesE[i].mover(dt);
    }  
    for(var i = 0; i<this.spritesT.length; i++){
        this.spritesT[i].mover(dt);
    }  
    for(var i = 0; i<this.spritesPoder.length; i++){
        this.spritesPoder[i].mover(dt);
    } 
    for(var i = 0; i<this.spritesTE.length; i++){
        this.spritesTE[i].mover(dt);
    } 
    for(var i = 0; i<this.spritesO.length; i++){
        this.spritesO[i].mover(dt);
    } 
    for(var i = 0; i<this.spritesD.length; i++){
        this.spritesD[i].mover(dt);
    }
    for(var i = 0; i<this.spritesEV.length; i++){
        this.spritesEV[i].mover(dt);
    }
    for(var i = 0; i<this.spritesXP.length; i++){
        this.spritesXP[i].mover(dt);
    } 
    if(this.pc != null){
        this.pc.mover(dt);
    }

    if(this.bruxa != null){
        this.bruxa.mover(dt);
    }
};

//adiciona o comportamento dos sprites
Scene.prototype.comportar = function(){
    for(var i = 0; i<this.spritesE.length; i++){
        if(this.spritesE[i].comportar){
            this.spritesE[i].comportar();
        }
    } 
    for(var i = 0; i<this.spritesT.length; i++){
        if(this.spritesT[i].comportar){
            this.spritesT[i].comportar();
        }
    }
    for(var i = 0; i<this.spritesTE.length; i++){
        if(this.spritesTE[i].comportar){
            this.spritesTE[i].comportar();
        }
    }
    for(var i = 0; i<this.spritesO.length; i++){
        if(this.spritesO[i].comportar){
            this.spritesO[i].comportar();
        }
    }
    for(var i = 0; i<this.spritesD.length; i++){
        if(this.spritesD[i].comportar){
            this.spritesD[i].comportar();
        }
    }

    if(this.pc != null && this.pc.comportar){
        this.pc.comportar();
    }

    if(this.bruxa != null && this.bruxa.comportar){
        this.bruxa.comportar();
    }
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

//checa colisao entre sprites
Scene.prototype.checaColisao = function(){
    for(var i = 0; i < this.spritesE.length; i++){
        //colisao inimigo com pc
        if(this.spritesE[i].colidiuCom(this.pc)){
            if(this.pc.imune <= 0){
                this.pc.vidas--;
                this.pc.imune= 2;
                this.pc.atingido = 0.3;
                this.assets.play("damage");
            }    
        }
        for(var j = 0; j < this.spritesT.length; j++){
            //remoção do tiro do pc quando sai da tela
            if(this.spritesT[j].y > this.h - this.spritesT[j].h - 8 || this.spritesT[j].y < 0
            || this.spritesT[j].x > this.w || this.spritesT[j].x < 0){
            this.toRemove.push(this.spritesT[j]);
            }
                        

            //colisao tiro aliado com inimigo
            if(this.spritesE[i].colidiuCom(this.spritesT[j]) && this.spritesT[j].imune == 0 && this.spritesE[i].imune <= 0){
                this.spritesT[j].imune == 3;
                if(this.spritesT[j].props.modelo == "fireball") {
                    this.adicionar(new Animation({x: this.spritesE[i].x, y:this.spritesE[i].y, imagem: "explosion"}));
                    this.assets.play("explosion");
                    this.toRemove.push(this.spritesT[j]);
                    
                }
                if(this.spritesT[j].props.modelo == "espada") {
                    this.adicionar(new Animation({x: this.spritesE[i].x, y:this.spritesE[i].y, imagem: "sword"}));
                    this.assets.play("sword2");
                }
                this.spritesE[i].vidas--;
                if(this.spritesE[i].vidas == 0){
                    this.toRemove.push(this.spritesE[i]);
                } else {
                    this.spritesE[i].imune = 0.3;
                }          
            }
        }
    }
    //remoção de tiro ao sair da tela. por questões de desempenho foi necessário (quando o tiro ia pra baixo, 
    //o jogo ia pra 30 frames/seg)
    for(var i = 0; i < this.spritesTE.length; i++){
        if(this.spritesTE[i].colidiuCom(this.bruxa)){
            this.adicionar(new Animation({x: this.spritesTE[i].x, y:this.spritesTE[i].y, imagem: "explosion"}));
            this.assets.play("explosion");
            this.toRemove.push(this.spritesTE[i]);
            this.bruxa.vidas--;
            this.bruxa.imune = 0.3;
        }
        if(this.spritesTE[i]!=null){
            if(this.spritesTE[i].y > this.h - 32 - this.spritesTE[i].h || this.spritesTE[i].y < 0 + 32
                || this.spritesTE[i].x > this.w - 32 || this.spritesTE[i].x < 0 + 32){
                this.ctx.globalAlpha = this.ctx.globalAlpha * 0.5;
            }

        }
        if(this.spritesTE[i]!=null){
            if(this.spritesTE[i].y > this.h - this.spritesTE[i].h || this.spritesTE[i].y < 0
                || this.spritesTE[i].x > this.w || this.spritesTE[i].x < 0){
                this.toRemove.push(this.spritesTE[i]);
            }

        }
        //colisao tiro com eventador
        for(var j = 0; j < this.spritesEV.length; j++) {
            if (this.spritesTE[i].colidiuCom(this.spritesEV[j]) && this.spritesTE[i].props.tipo == "tiroQ" 
                && this.spritesEV[j].evented == 0){
                this.adicionar(new Animation({x: this.spritesEV[j].x, y:this.spritesEV[j].y, imagem: "explosion"}));
                this.assets.play("explosion");
                this.toRemove.push(this.spritesTE[i]);
                this.spritesEV[j].evented = 1;
                this.spritesEV[j].evento();
                }
                
            
        }
        //colisao tiro inimigo com pc
        if(this.spritesTE[i].colidiuCom(this.pc) && this.spritesTE[i].props.tipo == "tiroE"){
            if(this.spritesTE[i].props.modelo == "fireball") {
                    this.adicionar(new Animation({x: this.pc.x, y:this.pc.y, imagem: "explosion"}));
                    this.assets.play("explosion");
                }
            if(this.spritesTE[i].props.modelo == "rocha") {
                    this.assets.play("earth2");
                }
            this.toRemove.push(this.spritesTE[i]);
            if(this.pc.imune<=0){    
                this.pc.atingido = 0.3;
                this.pc.vidas--;
                this.pc.imune=2;
            }
        }
    }
    //colisao pc com poder
    for (var i = 0; i < this.spritesPoder.length; i++){
        if(this.spritesPoder[i].colidiuCom(this.pc)){
            this.assets.play("heal");
            if(this.spritesPoder[i].props.modelo == "hp"){
                this.pc.vidas = 7;
            } else {
                this.pc.mana = 5;
            }
            var idx = this.estagio.sprites.indexOf(this.spritesPoder[i]);
            this.estagio.sprites.splice(idx, 1);
            this.toRemove.push(this.spritesPoder[i]);
        }

    }
    //colisao com teleporte
    for (var i = 0; i < this.spritesTP.length; i++) {
        if(this.pc.colidiuCom(this.spritesTP[i])) {
            this.stageIndex = this.spritesTP[i].props.idx;
            this.pc.x = this.spritesTP[i].tX;
            this.pc.y = this.spritesTP[i].tY;
            this.spritesTP = [];
            this.spritesE = [];
            this.spritesT = [];
            this.spritesO = [];
            this.spritesD = [];
            this.spritesTE = [];
            this.spritesEV = [];
            this.spritesXP = [];
            this.spritesPoder = [];
            this.spriteCounter = 0;

        }
    }

    //colisao com disparador
    for (var k = 0; k < this.spritesD.length; k++) {
        for (var j = 0; j < this.spritesT.length; j++){
            if(this.spritesT[j].colidiuCom(this.spritesD[k]) && this.spritesT[j].props.modelo == "espada" &&
             this.spritesD[k].swCD < 0){
                this.adicionar(criarFireball(1, "tiroQ", this.spritesD[k].direcao, this.spritesD[k].x, this.spritesD[k].y));
                this.spritesD[k].swCD = 1.2;
            }
        }
    }
};

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {

        if(this.toRemove[i].props.tipo == "npc"){
            var idx = this.estagio.sprites.indexOf(this.toRemove[i]);
            if(idx>=0){
                this.estagio.sprites.splice(idx,1);
            }
            idx = this.spritesE.indexOf(this.toRemove[i]);
            if(idx>=0){
                this.spritesE.splice(idx,1);
            }

        }
        if(this.toRemove[i] != null &&this.toRemove[i].props.tipo == "tiro"){
            var idx = this.spritesT.indexOf(this.toRemove[i]);
            if(idx>=0){
                this.spritesT.splice(idx,1);
            }
        }
        if(this.toRemove[i] != null && this.toRemove[i].props.tipo == "tiroE"){
            var idx = this.spritesTE.indexOf(this.toRemove[i]);
            if(idx>=0){
                this.spritesTE.splice(idx,1);
            }
        }
        if(this.toRemove[i] != null && this.toRemove[i].props.tipo == "boom"){
            var idx = this.spritesXP.indexOf(this.toRemove[i]);
            if(idx>=0){
                this.spritesXP.splice(idx,1);
            }
        }
        if(this.toRemove[i] != null && this.toRemove[i].props.tipo == "poder"){
            var idx = this.spritesPoder.indexOf(this.toRemove[i]);
            if(idx>=0){
                this.spritesPoder.splice(idx,1);
            }
        }
        if(this.toRemove[i] != null && this.toRemove[i].props.tipo == "tiroQ"){
            var idx = this.spritesTE.indexOf(this.toRemove[i]);
            if(idx>=0){
                this.spritesTE.splice(idx,1);
            }
        }
    }
    this.toRemove = [];
};

Scene.prototype.desenharMapa = function () {
    this.map.desenhar(this.ctx);
}

Scene.prototype.incluirInimigos = function() {
    while (this.spriteCounter < this.estagio.sprites.length) {
        var inimigo = this.estagio.sprites[this.spriteCounter];
        this.adicionar(inimigo);
        this.spriteCounter++;
    }
}

Scene.prototype.rodarEventos = function(evento) {
    evento();
}

Scene.prototype.gameDefiner = function () {
    this.estagio = this.gamer.estagios[this.stageIndex];
    this.map = this.estagio.mapa;
    this.incluirInimigos();
    this.estagio.eventos.forEach(this.rodarEventos);
}


Scene.prototype.desenharHUD = function() {
    //desenha a caixa preta
    ctx.restore();
    ctx.fillStyle = "black";
    ctx.fillRect(0,320,this.w, 120);
    //desenha o titulo e a imagem de lua
    ctx.font = "30px Medieval";
    ctx.fillStyle = "white";
    ctx.fillText("Blue Moon",133,this.h+100);
    ctx.save();
    ctx.drawImage(this.assets.img("moon"),
            140,this.h+100,
            16,13
            );
    //desenha as vidas
    var posCoracao = 12;
    for(var i = 0; i < this.pc.vidas; i++){
        ctx.drawImage(this.assets.img("heart"),
            posCoracao,this.h+86,
            16,13
            );
        posCoracao = posCoracao + 16;
    }
    //desenha a mana
    posCoracao = 275;
    for(var i = 0; i < this.pc.mana; i++){
        ctx.drawImage(this.assets.img("mana"),
            posCoracao,this.h+86,
            16,13
            );
        posCoracao = posCoracao + 16;
    }

    //desenha a caixa de dialogo
    var imgX = 2;
    var imgY = 7;
    this.desenharCaixaDialogo(imgX,imgY);
    var imgX = 1;
    this.desenharCaixaDialogo2(imgX,imgY);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    if(this.dialogo.includes("_")){
        var dialogos = this.dialogo.split("_");
        for(var i = 0; i < dialogos.length; i++){
            ctx.fillText(dialogos[i],16,this.h+20 + i*12);
        }
    } else{
        ctx.fillText(this.dialogo,16,this.h+20);
    }
}

Scene.prototype.desenharCaixaDialogo = function (imgX,imgY) {
    var pX = 0
    var pY = 0
    for (var i = 0; i < 23; i ++) {
        for (var j = 0; j < 3; j ++){
            ctx.drawImage(
            this.assets.img("hud"),
            288 + 96*imgX + 32*pX+5,
            96*imgY + 32*pY,
            32,
            32,
            i*16,
            this.h + j*16,
            16,
            16,
            );
        }
        ctx.drawImage(
        this.assets.img("hud"),
        288 + 96*imgX + 32*(pX+1),
        96*imgY + 32*(pY+2),
        32,
        32,
        i*16,
        this.h + 48,
        16,
        16,
        );
            
        }
        pY = 1;
        pX = 2;
        for (var i = 0; i < 3; i ++) {
            ctx.drawImage(
            this.assets.img("hud"),
            288 + 96*imgX + 32*(pX),
            96*imgY + 32*(pY),
            32,
            32,
            this.w-16,
            this.h + i*16,
            16,
            16,
            );
        }
        
        pY = 2;
        ctx.drawImage(
            this.assets.img("hud"),
            288 + 96*imgX + 32*(pX),
            96*imgY + 32*(pY),
            32,
            32,
            this.w -16,
            this.h+48,
            16,
            16,
            );

}

Scene.prototype.desenharCaixaDialogo2 = function (imgX,imgY) {
    var pY = 0;
    var pX = 0;

    ctx.drawImage(
        this.assets.img("hud"),
        96*imgX + 32*pX,
        96*imgY + 32*pY,
        32,
        32,
        0,
        this.h,
        16,
        16,
    );

    pY = 2

    ctx.drawImage(
        this.assets.img("hud"),
        96*imgX + 32*pX,
        96*imgY + 32*pY,
        32,
        32,
        0,
        this.h+48,
        16,
        16,
    );

    pX = 2
    pY = 0;

    ctx.drawImage(
        this.assets.img("hud"),
        96*imgX + 32*pX,
        96*imgY + 32*pY,
        32,
        32,
        this.w-16,
        this.h,
        16,
        16,
    );


    pX = 1
    for (var i = 1; i < 23; i ++) {
        
        ctx.drawImage(
        this.assets.img("hud"),
        96*imgX + 32*pX + 5,
        96*imgY + 32*pY,
        32,
        32,
        i*16,
        this.h,
        16,
        16,
        );
    
        ctx.drawImage(
        this.assets.img("hud"),
        96*imgX + 32*(pX) - 5,
        96*imgY + 32*(pY+2),
        32,
        32,
        i*16,
        this.h + 48,
        16,
        16,
        );
            
        }
        pY = 1;
        for (var i = 1; i < 3; i ++) {
            pX = 2;
            ctx.drawImage(
            this.assets.img("hud"),
            96*imgX + 32*(pX),
            96*imgY + 32*(pY),
            32,
            32,
            this.w-16,
            this.h + i*16,
            16,
            16,
            );
            pX = 0;
            ctx.drawImage(
            this.assets.img("hud"),
            96*imgX + 32*(pX),
            96*imgY + 32*(pY),
            32,
            32,
            0,
            this.h + i*16,
            16,
            16,
            );
        }
        pX = 2;
        pY = 2;
        ctx.drawImage(
            this.assets.img("hud"),
            96*imgX + 32*(pX),
            96*imgY + 32*(pY),
            32,
            32,
            this.w -16,
            this.h+48,
            16,
            16,
            );
}

Scene.prototype.passo = function(dt){
    this.gameDefiner();
    this.limpar();
    this.desenharMapa();
    this.comportar();
    this.mover(dt);
    this.desenhar();
    this.checaColisao();
    this.removeSprites();
    this.desenharHUD();
}