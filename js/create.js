function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    for(i = 0 ; i < 2 ; i ++){
        var ground = platforms.create(i * 800, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
    }

    var ledge_arr = [{x: 100, y: 400},{x: 600, y: 200},{x: game.world.width-200, y: 400},{x: game.world.width-350, y: 0}];
    for(i = 0; i< 4; i++){
        var ledge = platforms.create(ledge_arr[i].x,ledge_arr[i].y, 'ground');
        ledge.body.immovable = true;
    }

    player = game.add.sprite(game.world.width / 2, game.world.height - 140, 'dude');
    bull = game.add.sprite(game.world.width / 2 + 100, 120, 'bull');
    game.camera.setPosition(player.x/2, player.y);

    game.physics.arcade.enable([player, bull]);

    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    bull.body.gravity.y = 300;
    bull.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1], 5, true);
    player.animations.add('right', [4, 5], 5, true);

    bull.animations.add('left', [0, 1], 5, true);
    bull.animations.add('right', [2, 3], 5, true);

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    cursors = game.input.keyboard.createCursorKeys();
    space_bar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    f = game.input.keyboard.addKey(Phaser.KeyCode.F);

    bull_weapon = this.add.weapon(10, 'bullet');

    coco_weapon = this.add.weapon(1000, 'coco_bullet');
    coco_weapon.fireRate = 200;
    coco_weapon.bulletSpeed = 500;

    game.input.onDown.add(goFull, this);

    bull_life_text = game.add.text(game.camera.x + 100, game.camera.y + 50, 'Boss LP: ' + bull_life, { fontSize: '16px', fill: '#fff' });
    bull_life_text.anchor.setTo(0.5, 0.5);

}
