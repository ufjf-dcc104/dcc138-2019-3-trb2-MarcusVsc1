function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        h: 10,
        w: 10,
        a: 0,
        va: 0,
        vm: 0,
        w: 32,
        h: 32,
        imgX: 0,
        imgY: 0,
        direcao: 0,
        frame: 0,
        props: {},
        spCD: 0,
        swCD: 0,
        globalCD: 0,
        color: "blue",
        imune: 0,
        atirando: 0,
        comportar: undefined,
        scene: undefined,
        imagem: null,
        vidas: 1,
        mana: 5,
        charStop: 0,
        atingido: 0
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function (ctx) {

    ctx.save();
    ctx.fillStyle = "midnightblue";
    ctx.fillRect(this.x-this.w/2,this.y,this.w,this.h/2);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x-this.w/2,this.y,this.w,this.h/2);


    ctx.translate(this.x, this.y);
    if(this.imune > 0 && this.atingido <= 0){
      ctx.globalAlpha = 0.5*Math.cos(60*this.imune);
    }
    var d = this.direcao;
    var img = this.imagem;
    var picX = this.imgX;
    var picY = this.imgY;

    if(this.atingido > 0 && this.imune > 0){
        console.log("entrou!");
        d = 0;
        img = "expressoes";
        picX = 0;
        picY = 1;
    }
    
    var F = Math.floor(this.frame);
    if(this.vx == 0 && this.vy == 0 && this.props.tipo == "pc") {F = 1;}
    if(this.charStop > 0) {F = 0;}
    ctx.drawImage(
        this.scene.assets.img(img),
        144*picX + (F%3)*48,
        192*picY + d*48 + 1,
        48,
        48,
        -this.w-2,
        -this.h-12,
        30,
        30,
    );

    ctx.restore();
    ctx.globalAlpha = 1.0;
    
};

Sprite.prototype.mover = function (dt) {
    if(this.imune > 0 && this.atingido <= 0) {
           this.imune = this.imune - 1*dt;
        }
    if (this.charStop <= 0 && this.atingido <= 0){
        this.moverOrtogonal(dt);
        
    } else {
        if(this.imune <= 0){this.frame += 8*dt;}
        if(this.charStop > 0){ this.charStop = this.charStop - 1*dt;}
        if(this.atingido > 0){ this.atingido = this.atingido - 1*dt;}
        this.vx = 0;
        this.vy = 0;
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        this.mc = Math.floor(this.x / this.scene.map.SIZE);
        this.ml = Math.floor(this.y / this.scene.map.SIZE);
    }
    if(this.y >= 320){
        console.log("entrou")
    }
    
        
    
    
    
}

Sprite.prototype.moverCircular = function (dt) {
    this.a = this.a + this.va * dt;

    this.vx = this.vm * Math.cos(this.a);
    this.vy = this.vm * Math.sin(this.a);

    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.spCD = this.spCD - dt;
    this.swCD = this.swCD - dt;
    this.globalCD = this.globalCD - dt;
}

Sprite.prototype.moverOrtogonal = function (dt) {
    this.a = this.a + this.va*dt;
    this.frame += 8*dt;


    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    this.spCD = this.spCD - dt;
    this.swCD = this.swCD - dt;
    this.globalCD = this.globalCD - dt;
}
Sprite.prototype.aplicaRestricoes = function (dt) {

    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo >=6) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && this.scene.map.cells[this.mc - 1][this.ml].tipo >=6) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && this.scene.map.cells[this.mc][this.ml + 1].tipo >=6) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && this.scene.map.cells[this.mc][this.ml - 1].tipo >=6) {
        dny = this.scene.map.SIZE * (this.ml - 1 + 1) - (this.y - this.h / 2);
        dy = Math.max(dny, dy);
    }
    this.vy = dy / dt;
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.scene.map.SIZE * this.scene.map.COLUMNS - this.w / 2;
    var MAXY = this.scene.map.SIZE * this.scene.map.LINES - this.h / 2;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;

}


Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2) return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}