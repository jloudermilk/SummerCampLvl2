LootChest.Chest = function(game,x,y)
{
		this.game = game;
		this.opened = false;
		
		this.chipAmount = 2;
		
		Phaser.Sprite.call(this,game,x,y,'chest');
		
		game.physics.enable(this,Phaser.Physics.ARCADE);
		this.body.allowGravity = false;
		this.body.immovable = true;
		
		
		this.body.setSize(26,16,0,0);
		this.animations.add('idle',[2,3,4,5,6],10, true );
		this.animations.add('open',[0,7,8,9,10,11],10, false );
		this.animations.add('empty',[1],20,true);
		
		this.animations.play('idle');
		
		game.add.existing(this);
};

LootChest.Chest.prototype = Object.create(Phaser.Sprite.prototype);
LootChest.Chest.prototype.constructor = LootChest.Chest;
LootChest.Chest.prototype.open = function(player,thing)
{
	if(!this.opened){
	player.chipAmount += this.chipAmount;
	this.opened = true;
	}
	
}