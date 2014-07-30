 Breakout.Game = function(game)
{
		this.game = game;
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


Breakout.Game.prototype = {

 
 create: function () {

           this.physics.startSystem(Phaser.Physics.ARCADE);
		   
		   this.physics.arcade.checkCollision.down = false;
		   
		   this.s = this.add.tileSprite(0,0,800,600, 'starfield');
		   
		   this.bricks = this.add.group();
		   this.bricks.enableBody = true;
		   this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
		   
		   var brick;
		   
		   for( var y = 0; y < 4; y++)
		   {
				for(var x = 0; x < 15; x++)
				{
					brick = this.bricks.create(120 + (x * 36), 100 + (y * 52),'breakout','brick_' + (y+1) + '_1.png');
					brick.body.bounce.set(1);
					brick.body.immovable = true;
				}
		   }
		   
			this.paddle = this.add.sprite(this.world.centerX,500,'breakout', 'paddle_big.png');
			this.paddle.anchor.setTo(0.5,0.5);
		   
			this.physics.enable(this.paddle, Phaser.Physics.ARCADE);
			
			this.paddle.body.collideWorldBounds = true;
			this.paddle.body.bounce.set(1);
			this.paddle.body.immovable = true;
		    
			this.ball = this.add.sprite(this.world.centerX,this.paddle.y - 16,'breakout', 'ball_1.png');
			this.ball.anchor.set(0.5);
			this.ball.checkWorldBounds = true;
			
			this.physics.enable(this.ball, Phaser.Physics.ARCADE);
			
			this.ball.body.collideWorldBounds = true;
			this.ball.body.bounce.set(1);
			
			this.ball.animations.add('spin',['ball_1.png','ball_2.png','ball_3.png','ball_4.png','ball_5.png'], 50, true, false );
			
			this.ball.events.onOutOfBounds.add(this.ballLost, this);
			
			this.scoreText = this.add.text(32,550, 'score: 0',{font: "20px Arial", fill: "#ffffff", align: "left"} );
			this.livesText = this.add.text(680,550, 'lives: 3',{font: "20px Arial", fill: "#ffffff", align: "left"} );
			this.introText = this.add.text(this.world.centerX,400, '- click to start -',{font: "40px Arial", fill: "#ffffff", align: "center"} );
			this.introText.anchor.setTo(0.5,0.5);
	
			this.input.onDown.add(this.releaseBall, this);
        },
		
		update: function()
		{
		this.paddle.body.x = this.input.x;
		
		if(this.paddle.x < 24)
		{
			this.paddle.x = 24;
		}
		else if(this.paddle.x > this.width - 24)
		{
			this.paddle.x = this.width - 24;
		}
		if(this.ballOnPaddle)
		{
			this.ball.body.x = this.paddle.x;
		}
		else
		{
			this.physics.arcade.collide(this.ball,this.paddle, this.ballHitPaddle, null, this);
			this.physics.arcade.collide(this.ball,this.bricks, this.ballHitBrick, null, this);
		}
		},
		
		ballHitBrick: function(_ball, _brick)
		{
			_brick.kill();
			
			this.score += 10; //score = score + 10;
			this.scoreText.text = 'score: '  + this.score;
			if(this.bricks.countLiving() == 0)
			{	
				this.score += 1000;
				this.scoreText.text = 'score: '  + this.score;
				this.introText.text = '- Next Level -';
				
				this.ballOnPaddle = true;
				this.ball.body.velocity.set(0);
				this.ball.x = this.paddle.x + 16;
				this.ball.y = this.paddle.y - 16;
				this.ball.animations.stop();
				
				this.bricks.callAll('revive');
			}
		},
		ballHitPaddle: function(_ball,_paddle)
		{
			var diff = 0;
			if(_ball.x < _paddle.x)
			{
				// the ball is on the left hand side of the paddle
				diff = _paddle.x - _ball.x;
				_ball.body.velocity.x = (-10 * diff);
			}else if(_ball.x > _paddle.x)
			{	
				// the ball is on the right hand side of the paddle
				diff = _ball.x - _paddle.x;
				_ball.body.velocity.x = (10 * diff);
			}
			else
			{
				_ball.body.velocity.x = 2 + Math.random() * 8;
			}
		},
		
		releaseBall: function()
		{
			if(this.ballOnPaddle)
			{
				this.ballOnPaddle = false;
				this.ball.body.velocity.x = -300;
				this.ball.body.velocity.y = -75;
				this.ball.animations.play('spin');
				this.introText.visable = false;
			}
		},
		
		ballLost: function()
		{
			this.lives--;
			this.livesText.text = 'lives: ' + this.lives;
			this.ball.alive = false;
			if(this.lives === 0)
			{
				this.gameOver();
			}
			else
			{
				this.ballOnPaddle = true;
				this.ball.reset(this.paddle.body.x + 16, this.paddle.y - 16);
				this.ball.animations.stop();
			}
		},
		gameOver: function()
		{
			this.ball.body.velocity.setTo(0,0);
			this.introText.text = 'Game Over! Thanks Obama!';
			this.introText.visable = true;
		}
		};