Breakout = 
{

};
Breakout.Boot = function(game)
{
	
		this.ball;
		this.paddle;
		this.bricks;
		
		this.ballOnPaddle = true;
		
		this.lives = 3;
		this.score = 0;
		
		this.scoreText;
		this.livesText;
		this.introText;
		
		this.s;
};


Breakout.Boot.prototype = {

preload: function () {
			this.load.atlas('breakout','assets/sprites/breakout.png','assets/sprites/breakout.json');
			this.load.image('starfield', 'assets/sprites/starfield.jpg');
        },
create: function()
{
	 this.state.start('Game');
}
		

      

    };