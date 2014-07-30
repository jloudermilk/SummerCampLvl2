LootChest.Game = function(game)
{	
		this.map;
		this.tileset;
		this.layer;
		this.player;
		this.facing = 'left';
		this.jumpTimer = 0;
		this.cursors;
		this.jumpButton;
		this.chest;
		this.sword1;
		this.sword2;
		this.chip;
};

LootChest.Game.prototype = 
{
	preload: function()
	{},
	
	create: function()
	{
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.stage.backgroundColor = '#008800';
		
		this.map = this.add.tilemap('level');
		this.map.addTilesetImage('tiles-1');
		this.map.setCollisionByExclusion([13,15,16,46,47,48,49,50,51]);
		
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		
		this.physics.arcade.gravity.y = 250;
		
		this.player = new LootChest.Player(this,this.layer,32,32);
		
		//this.camera.follow(this.player);
		
		

	},
	
	update: function()
	{
		this.player.update();
	}
	
};