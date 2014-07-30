
Preloader = function (game)
{
	this.asset = null;
	
	this.ready = false;
}

Preloader.prototype = {
	
	preload: function()
	{
	this.load.tilemap('level1', 'assets/sprites/level1.json', null, Phaser.Tilemap.TILED_JSON);
	this.load.image('tiles-1', 'assets/sprites/tiles-1.png');
	this.load.spritesheet('dude', 'assets/sprites/dude.png',32,48);
	this.load.spritesheet('droid','assets/sprites/droid.png',32,32);
	this.load.image('starSmall', 'assets/sprites/star.png');
	this.load.image('starBig', 'assets/sprites/star2.png');
	this.load.image('background', 'assets/sprites/background2.png');
	},
	
	create: function(){
		this.state.start('Game');
	},
	onLoadComplete: function()
	{
		this.ready = true;
	}
}