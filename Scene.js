function Scene(params) {
    var exemplo ={
        spritesE: [],
        spritesT: [],
        spritesPoder: [],
        spritesTE: [],
        spritesXP: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null
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
    if(sprite.props.tipo == "npc"){
        this.spritesE.push(sprite);
    }
    if(sprite.props.tipo == "poder"){
        this.spritesPoder.push(sprite);
    }
    if(sprite.props.tipo == "tiroE"){
        this.spritesTE.push(sprite);
    }
    if(sprite.props.tipo == "boom"){
        this.spritesXP.push(sprite);
    }
    
    sprite.scene = this;
};

Scene.prototype.desenhar = function(){
    if(this.pc.desenhar){this.pc.desenhar(this.ctx);}  
    for(var i = 0; i<this.spritesE.length; i++){
        this.spritesE[i].desenhar(this.ctx);
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
        for(var i = 0; i<this.spritesXP.length; i++){
        this.spritesXP[i].desenhar(this.ctx);
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

    if(this.pc != null && this.pc.comportar){
        this.pc.comportar();
    }
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

Scene.prototype.checaColisao = function(){
    for(var i = 0; i < this.spritesE.length; i++){
        if(this.spritesE[i].colidiuCom(this.pc)){
            if(this.pc.imune <= 0){
                this.pc.vidas--;
                this.pc.imune=2;
            }    
        }
        for(var j = 0; j < this.spritesT.length; j++){
            if(this.spritesE[i].colidiuCom(this.spritesT[j])){
                this.adicionar(new Explosion({x: this.spritesE[i].x, y:this.spritesE[i].y}));
                this.assets.play("explosion");
                this.toRemove.push(this.spritesT[j]);
                this.spritesE[i].vidas--;
                if(this.spritesE[i].vidas == 0){
                    this.toRemove.push(this.spritesE[i]);
                    
                }
            if(this.spritesT[j] != null){
            if(((this.spritesT[j].x <= 0 - this.spritesT[j].w/2) || (this.spritesT[j].y <= 0 - this.spritesT[j].h/2) || 
          (this.spritesT[j].x >= this.w + this.spritesT[j].w/2) || (this.spritesT[j].y >= this.h - 100 + this.spritesT[j].h/2)))
              {this.toRemove.push(this.spritesT[j]);}
            }
                
        }
    }
    for(var i = 0; i < this.spritesTE.length; i++){
        if(this.spritesTE[i].colidiuCom(this.pc)){
            if(this.pc.imune<=0){
                this.toRemove.push(this.spritesTE[i]);
            this.pc.vidas--;
            this.pc.imune=2;
            }
        }
        if(this.spritesTE[i] != null){
            if(((this.spritesTE[i].x <= 0 - this.spritesTE[i].w/2) || (this.spritesTE[i].y <= 0 - this.spritesTE[i].h/2) || 
          (this.spritesTE[i].x >= this.w + this.spritesTE[i].w/2) || (this.spritesTE[i].y >= this.h - 100 + this.spritesTE[i].h/2)))
            {this.toRemove.push(this.spritesTE[i]);}
        }
        
    }
}
};

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        if(this.toRemove[i].props.tipo == "npc"){
            var idx = this.spritesE.indexOf(this.toRemove[i]);
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

    }
    this.toRemove = [];
};

Scene.prototype.desenharMapa = function () {
    this.map.desenhar(this.ctx);
}

Scene.prototype.passo = function(dt){
    this.limpar();
    this.desenharMapa();
    this.comportar();
    this.mover(dt);
    this.desenhar();
    this.checaColisao();
    this.removeSprites();
}