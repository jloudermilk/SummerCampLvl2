LootChest.Player = function(game,layer,x,y)
{		

		this.game = game;
		this.layer = layer;
		this.facing = 'left';
		this.jumpTimer = 0;
		this.cursors;
		this.jumpButton;
		
		Phaser.Sprite.call(this,game,x,y,'player');
		
		this.physics = game.physics.arcade;
		this.physics.enable(this);
		
		this.body.bounce.y  = 0.2;
		
		this.body.collideWorldBounds = true;
		
		this.body.setSize(20,32,5,16);
		
		this.animations.add('left',[0,1,2,3],10, true );
		this.animations.add('right',[5,6,7,8],10, true );
		this.animations.add('turn',[4],20,true);
		
		this.cursors = this.input.keyboard.createCursorKeys();
		this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

LootChest.Player.prototype = Object.create(Phaser.Sprite.prototype);
LootChest.Player.prototype.constructor = LootChest.Player;
LootChest.Player.prototype.update = function() 
{
};