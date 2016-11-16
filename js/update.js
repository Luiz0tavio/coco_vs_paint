function update() {

    game.physics.arcade.collide( [bull, player] , platforms);
    //  game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, weapon.bullets, function(){
        bull_life = 5;
        game.state.restart();
    });
    game.physics.arcade.overlap(bull, coco_weapon.bullets, hitBull);
    player.body.velocity.x = 0;

    if(!bull_walk_away && bull_life > 0){
        if(bull.x < player.x){
            bull.body.velocity.x = +100;
            bull.animations.play('right');
            weapon.fireFrom.centerOn(bull.x+50, bull.y+20);
        } else {
            bull.body.velocity.x = -100;
            bull.animations.play('left');
            weapon.fireFrom.centerOn(bull.x + 10, bull.y + 20);
        }
        if(bull.y > player.y && bull.body.touching.down) {
            bull.body.velocity.y = -350;
        }
        weapon.fireAngle = (Math.atan2(player.y - weapon.y , player.x - weapon.x)) * (180/Math.PI);
        weapon.fire();
    } bull_walk_away = bull_walk_away == 80 ? 0 : bull_walk_away + 1;


    if(f.isDown){

        if(player_body_turn == 'right'){
            coco_weapon.fireAngle = 0;
            coco_weapon.fireFrom.centerOn(player.x+60, player.y + 30);
            player.frame = 6;
        }else{
            player.frame = 7;
            coco_weapon.fireFrom.centerOn(player.x, player.y +30 );
            coco_weapon.fireAngle = 180;
        }
        coco_weapon.fire();

    } else if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        game.camera.x -= 1;
        player_body_turn = 'left';
        if(player.body.touching.down){
            player.animations.play('left');
        } else {
            player.frame = 0;
        }
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player_body_turn = 'right';
        game.camera.x += 1;
        if(player.body.touching.down){
            player.animations.play('right');
        } else {
            player.frame = 5;
        }
    } else {
        player.frame = player.animations.currentAnim.name == 'right' ?  3  : 2;
        player.animations.stop();
    }

    if (space_bar.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}