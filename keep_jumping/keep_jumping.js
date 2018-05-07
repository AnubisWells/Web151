var mainState = {
	preload: function(){
		game.load.image('player','assets/cloud.png');
		game.load.image('wall','assets/block.png');
		game.load.image('coin','assets/coin.png');
		game.load.image('enemy','assets/bomb.png');
	},
	create: function(){
	
		game.stage.backgroundColor = '#000000'
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
		this.cursor = game.input.keyboard.createCursorKeys();
		this.player = game.add.sprite(70, 50, 'player');
		this.player.body.gravity.y = 710;
		this.walls = game.add.group();
		this.coins = game.add.group();
		this.enemies = game.add.group();
		var level = [
			'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
			'!                    	         o         !',
			'!               o   	               o   !',
			'!                   	         o      !!!!',
			'!                                   !!!',
			'!     o                     o      !!',
			'!                                   !',
			'!!!o!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    !',
			'  !o!                           ! o   !',
			' !   !                          !     !',
			'!  o  !                         !      !',
			'!!! !!!                         !     o!',
			'!      !!!!!!!!!!!!!!!!!!!!!!!!!!      !',
			'!  oo   o         o   o         o      !',
			'!  oo   o         o   o         o      !',
			'!       o         o   o         o      !',
			'!                                      !',
			'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
		];
		for (var i = 0; i < level.length; i++) {
			for (var j = 0; j < level[i].length; j++) {
				if (level[i][j] == 'x') {
					var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
					this.walls.add(wall);
					wall.body.immovable = true;
				}
				else if (level[i][j] == 'o') {
					var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
					this.coins.add(coin);
				}
				else if (level[i][j] == '!') {
					var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
					this.enemies.add(enemy);
				}
			}
		}
	},
	update: function(){
		if (this.cursor.left.isDown) 
			this.player.body.velocity.x = -200;
		else if (this.cursor.right.isDown) 
			this.player.body.velocity.x = 200;
		else if (this.cursor.up.isDown)
			this.player.body.velocity.y = -200;
		else 
			this.player.body.velocity.x = 0;
		if (this.cursor.up.isDown || this.player.body.touching.down)
			this.player.body.velocity.y = -100;
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
		game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
	},
	takeCoin: function(player,coin){
		coin.kill();
	},
	restart: function(){
		game.state.start('main');
	}
};

var game = new Phaser.Game(1000,600);
game.state.add('main',mainState);
game.state.start('main');