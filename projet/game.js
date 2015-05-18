animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;


ArenaWidth = ;
ArenaHeight = ;
tics = 0; //Compteur global, incrémenté à chaque frame.

//Boucle de jeu
function recursiveAnim (){
    clearGame();
	updateGame();
    drawGame();
    animFrame( recursiveAnim );
};
updateGame = function() {
    tics++;
    //updateScene(); //Pour faire évoluer l'arrière-plan
    updateItems();
};
clearGame = function() {
    clearItems();
};
drawGame = function() {
    //drawScene();
    drawItems();
};
updateItems = function() {
    enemies.update();
    towers.update();
	target.update();
};
drawItems = function() {
    enemies.draw();
    towers.draw();
	target.draw();
};
clearItems = function() {
    enemies.clear();
    towers.clear();
	target.clear();
};


//Fonction permettant d'initialiser le jeu.
init = function(divId){
    var divArena = document.getElementById(divId);
    this.canArena = document.createElement("canvas");
    this.canArena.setAttribute("id", "canArena");
    this.canArena.setAttribute("width", ArenaWidth);
    this.canArena.setAttribute("height", ArenaHeight);
    this.conArena = this.canArena.getContext("2d");
    divArena.appendChild(this.canArena);  
    
    enemies = new Enemy();
    towers = new Tower();
	target = new Target();
    
    animFrame( recursiveAnim ); //Début de la boucle de jeu.
};



Enemy = function(x,y,speed,life,damage,faiblesse,valeur){

	this.x=x;
	this.y=y;
	this.xOrigine=x;
    this.yOrigine=y;
	this.exists=true;
    this.width =  this.animation.width;
    this.height = this.animation.height;
	this.valeur = valeur;
	this.speed = speed;
	this.life = life;
	this.damage = damage;
	this.faiblesse;
	this.animation = new Animation();
	this.KO = new Animation();
};

//Enemy doit avancer

Enemy.prototype.draw=function(){
	
	if(this.life>0){ this.animation.draw(this.x,this.y);
    } else {
		this.KO.draw(this.x,this.y);
	}
}


Tower = function(x,y,type,aspect){

	this.xPos=x;
	this.yPos=y;
	this.width;
	this.height;
	this.portee;// mettre en correlation avec level
	this.damage;// mettre en correlation avec level
	this.attac-speed;// mettre en correlation avec level
	this.level = 1;
	this.type;
	this.aspect;
	this.projectileSet = new Array();
	
};

// Tower doit tirer et evoluer

Tower.prototype.evoluer=function(){

	if(this.type='feu'){
		if(this.level=1){
		this.portee=20;
		this.damage=15;
		this.attack-speed=10;
		this.aspect= new image;
		}
		else if(this.level=2){
		this.portee=25;
		this.damage=20;
		this.attack-speed=15;
		}
		else{
		this.portee=30;
		this.damage=25;
		this.attack-speed=20;
		}
	}
	else if(this.type='eau'){
		if(this.level=1){
		this.portee=25;
		this.damage=10;
		this.attack-speed=10;
		this.aspect= new image;
		}
		else if(this.level=2){
		this.portee=30;
		this.damage=15;
		this.attack-speed=15;
		}
		else{
		this.portee=35;
		this.damage=20;
		this.attack-speed=20;
		}
	}
	else{
		if(this.level=1){
		this.portee=20;
		this.damage=10;
		this.attack-speed=15;
		this.aspect= new image;
		}
		else if(this.level=2){
		this.portee=25;
		this.damage=15;
		this.attack-speed=20;
		}
		else{
		this.portee=30;
		this.damage=20;
		this.attack-speed=25;
		}
	}

};

Tower.prototype.fire=function(){

	if(this.portee>=sqrt((this.x-Enemy.x)^2+(this.y-Enemy.y)^2)){
	
	}


}




Target = function(x,y,life){

	this.xPos=x;
	this.yPos=y;
	this.life;

}




Animation = function(url, length, width, height){
    this.tabOffscreenCanvas = new Array();
    this.width = width;
    this.height = height; 
    this.length = length;
    this.ready = false;
    this.cpt = 0; //Compteur désignant l'avancement de l'animation
    var image = new Image();
    image.src = url;
    var that = this;
    image.onload = function(){
        that.ready = true;
        var offscreenCanvas, offscreenContext;
        for(var j=0;j<that.length;j++){ 
			offscreenCanvas = document.createElement("canvas");
			offscreenCanvas.width = that.width;
			offscreenCanvas.height = that.height;
			offscreenContext = offscreenCanvas.getContext("2d");
            offscreenContext.drawImage(image,0,j*that.height,that.width,that.height,0,0,that.width,that.height);
			that.tabOffscreenCanvas.push(offscreenCanvas);
        }
    }
}

Animation.prototype.clear = function(x,y){
    conArena.clearRect(x,y,this.width,this.height);
}
Animation.prototype.update = function(){
    if(tics % 5 == 1) {
        this.cpt = (this.cpt + 1) % this.length; //On augmente le compteur de l'animation toutes les 5 frames.
    }
}
Animation.prototype.draw = function(x,y){
    if(this.ready){
        conArena.drawImage(this.tabOffscreenCanvas[this.cpt],x,y); //On ne dessine l'animation que si celle-ci a finie de précharger.
    }
}
