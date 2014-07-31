LootChest.Game = function(game)
{	
		this.map;
		this.tileset;
		this.layer;
		this.player;
		this.chests;
		this.sword1;
		this.sword2;
		this.chips;
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
		
		this.player = new LootChest.Player(this.game,32,32);
		
		this.camera.follow(this.player);
		
		this.chests = this.add.group();
		
		this.chests.add(new LootChest.Chest(this.game,142,198));
		
		
	},
	
	update: function()
	{
	this.physics.arcade.collide(this.player,this.layer);
	this.physics.arcade.collide(this.player,this.chests,open,null,this);
	this.player.update();
	
	
	},
	render: function()
	{
		this.game.debug.body(this.player);
		this.game.debug.bodyInfo(this.player,16,24);
		this.game.debug.body(this.chests);
	}
	
};