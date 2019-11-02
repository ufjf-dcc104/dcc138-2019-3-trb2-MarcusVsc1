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
        monsterCounter: 0,
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function(sprite){
    if(sprite.props.tipo == "pc"){
        this.pc = sprite;
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
};

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
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

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
    for(var i = 0; i < this.spritesTE.length; i++){
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
    for (var i = 0; i < this.spritesPoder.length; i++){
        if(this.spritesPoder[i].colidiuCom(this.pc)){
            this.assets.play("heal");
            if(this.spritesPoder[i].props.modelo == "hp"){
                this.pc.vidas = 7;
            } else {
                this.pc.mana = 5;
            }
            this.toRemove.push(this.spritesPoder[i]);
        }

    }
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
            this.spritesPoder = [];
            this.monsterCounter = 0;

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
    while (this.monsterCounter < this.estagio.sprites.length) {
        var inimigo = this.estagio.sprites[this.monsterCounter];
        this.adicionar(inimigo);
        this.monsterCounter++;
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