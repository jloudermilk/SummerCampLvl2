LootChest.Chip = function(game,x,y)
{
		this.game = game;
	
		Phaser.Sprite.call(this,game,x,y,'chip');
		
		game.physics.enable(this,Phaser.Physics.ARCADE);
		//this.body.drag.setTo(10,0);
		this.body.collideWorldBounds = true;	
		this.animations.add('idle',[0,1,2,3,4],10, true );
		this.animations.play('idle');
		
		game.add.existing(this);
};

LootChest.Chip.prototype = Object.create(Phaser.Sprite.prototype);
LootChest.Chip.prototype.constructor = LootChest.Chip;
LootChest.Chip.prototype.collect = function(player)
{
	player.chipAmount++;
	this.kill();
}