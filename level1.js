

var game = new Phaser.Game(1600, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('ground2', 'assets/platform2.png')
    game.load.image('vertPlatform', 'assets/vertplatform.png')
    game.load.image('vertPlatformShort', 'assets/vertplatformshort.png')
    game.load.image('star', 'assets/star.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('enemyBullet', 'assets/enemyBullet.png');
    game.load.image('bossBullet', 'assets/bossBullet.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    // game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

    game.load.atlasJSONHash('baddie', 'assets/baddie.png', 'assets/baddie.json');

    game.load.atlasJSONHash('flyer', 'assets/flyer.png', 'assets/flyer.json');

    game.load.atlasJSONHash('boss', 'assets/boss.png', 'assets/boss.json');

    game.load.atlasJSONHash('char', 'assets/char.png', 'assets/char.json');
    game.level = 'boss'

}

var player;
var baddieOne;
var baddieTwo;
var baddiesThree;
var flyerOne;
var flyerTwo;
var flyerThree;
var boss;
var platforms;
var cursors;

var enemiesAlive = []

var intervals = []


var bullets;
var bulletTime = 0;
var bullet;

var enemyBullet;
var enemyBullets; 
var enemyBulletTime = 0; 

var bossBullet;
var bossBullets; 
var bossBulletTime = 0; 

var stars;
var score = 0;
var scoreText;

var hp = 5;
var hpText;

var goLeftA = false
var goLeftB = true
var animationA
var speedDirA = 0
var animationB
var speedDirB = 0
var clearFlyerOne
var clearFlyerTwo
var playerFacingLeft = false
var velocity = 100
var posOrNegX = 1
var posOrNegY = -1
var posOrNegArray = [1, -1, 1, -1]

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
    game.add.sprite(800, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    platforms2 = game.add.group();
    vertPlatforms = game.add.group();
    vertPlatformsShort = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    platforms2.enableBody = true;
    vertPlatforms.enableBody = true;
    vertPlatformsShort.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 80, 'ground');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground = platforms.create(400, game.world.height - 80, 'ground');
    ground.body.immovable = true;

    ground = platforms.create(800, game.world.height - 80, 'ground');
    ground.body.immovable = true;

    ground = platforms.create(1200, game.world.height - 80, 'ground');
    ground.body.immovable = true;

    var ground2 = platforms2.create(0, game.world.height - 48, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground2 = platforms2.create(400, game.world.height - 48, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground2 = platforms2.create(800, game.world.height - 48, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground2 = platforms2.create(1200, game.world.height - 48, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground2 = platforms2.create(0, game.world.height - 16, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground2 = platforms2.create(400, game.world.height - 16, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground2 = platforms2.create(800, game.world.height - 16, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    ground2 = platforms2.create(1200, game.world.height - 16, 'ground2');
    // ground.scale.setTo(1, 1);
    ground.body.immovable = true;

   

    //  Now let's create two ledges
    if (game.level === 'level1') {
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(800, 300, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1.25, 1);

        ledge = platforms.create(900, 268, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = platforms.create(1000, 236, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(1100, 204, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.5, 1);

        ledge = platforms.create(1200, 172, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.25, 1);


        ledge = vertPlatforms.create(1000, 300, 'vertPlatform');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatforms.create(1032, 300, 'vertPlatform');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatforms.create(1064, 300, 'vertPlatform');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = platforms.create(1200, 450, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = platforms.create(1375, 350, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.25, 1);
    } else if (game.level === 'level2') {
        var ledge = platforms.create(850, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        var ledge = platforms.create(950, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = platforms.create(450, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(50, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = vertPlatformsShort.create(200, 400, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1000, 400, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(600, 400, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = platforms.create(800, 230, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(400, 230, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(0, 230, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = vertPlatformsShort.create(200, 230, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1000, 230, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(600, 230, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = platforms.create(1000, 80, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(600, 80, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(200, 80, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = vertPlatformsShort.create(200, 40, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatforms.create(600, 80, 'vertPlatform');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1000, 40, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1200, 200, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1232, 200, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1264, 200, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1296, 200, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1328, 200, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        ledge = vertPlatformsShort.create(1360, 200, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

    } else {

        ledge = platforms.create(50, 450, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(50, 300, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(1100, 450, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = platforms.create(1100, 300, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.75, 1);

        ledge = vertPlatformsShort.create(125, 200, 'vertPlatformShort');
        ledge.body.immovable = true;
        ledge.scale.setTo(1, 1);

        // ledge = vertPlatformsShort.create(300, 450, 'vertPlatformShort');
        // ledge.body.immovable = true;
        // ledge.scale.setTo(1, 1);


    }



    // ground enemies
    baddies = game.add.physicsGroup();



    if (game.level === 'level1') {
        baddieOne = baddies.create(0, game.world.height - 490, 'baddie');

        baddieTwo = baddies.create(500, game.world.height - 400, 'baddie');

        baddieThree = baddies.create(600, game.world.height - 130, 'baddie');
    } else if (game.level === 'level2') {
        baddieOne = baddies.create(1200, game.world.height - 300, 'baddie');

        baddieTwo = baddies.create(850, game.world.height - 500, 'baddie');

        baddieThree = baddies.create(600, game.world.height - 200, 'baddie');
    } else {

    }

    baddies.setAll('enableBody', true);
    baddies.physicsBodyType = Phaser.Physics.ARCADE;
    baddies.setAll('body.bounce.y', 0.2);
    baddies.setAll('body.gravity.y', 300);
    baddies.setAll('body.collideWorldBounds', true);
    
    baddies.forEach(function(baddie){
        baddie.animations.add('badleft', [0, 1, 2, 3 ,4 , 5], 10, true);
        baddie.animations.add('badright', [0, 1, 2, 3, 4, 5], 10, true);
        baddie.animations.add('badhit', [6], 10, true);
        baddie.animations.add('badattack', [7, 8, 9], 10, false);
        baddie.hp = 3
        baddie.body.setSize(50, 30, 0, 0);
        baddie.name = 'baddie'
        baddie.anchor.x = 0.5
        baddie.anchor.y = 0.5
        enemiesAlive.push(baddie)
    })

    // flyers

    flyers = game.add.physicsGroup();

    if (game.level === 'level1') {

        flyerOne = flyers.create(500, game.world.height - 500, 'flyer');

        flyerTwo = flyers.create(800, game.world.height - 400, 'flyer');
    } else if (game.level === 'level2') {
        flyerOne = flyers.create(500, game.world.height - 500, 'flyer');

        flyerTwo = flyers.create(800, game.world.height - 300, 'flyer');

        flyerThree = flyers.create(1200, game.world.height - 400, 'flyer');
    } else {
        boss = game.add.sprite(720, game.world.height - 375, 'boss');

        boss.scale.setTo(2,2)
        game.physics.arcade.enable(boss);

        // boss.body.setSize(32, 40, 0, -5);
        boss.anchor.x = 0.5
        boss.anchor.y = 0.5
        boss.scale.x = 2
        boss.scale.x = 2
        boss.body.immovable = true
        boss.hp = 99

        // player.body.bounce.y = 0.2;
        // player.body.gravity.y = 300;
        // player.body.collideWorldBounds = true;
        // player.invincible = false

        //  Our two animations, walking left and right.
        boss.animations.add('firstForm', [0, 1, 2, 3, 4], 10, true);
        boss.animations.add('transform', [5, 6, 7, 8, 9, 10, 11, 12], 10, false);

        boss.animations.add('secondForm', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, true);

        boss.animations.add('finalForm', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);

        }

    flyers.setAll('enableBody', true);
    flyers.physicsBodyType = Phaser.Physics.ARCADE;
    flyers.setAll('body.collideWorldBounds', true);
    flyers.forEach(function(flyer){
        flyer.animations.add('flyleft', [0, 1, 2, 3, 4, 5, 6], 10, true);
        flyer.animations.add('flyright', [0, 1, 2, 3, 4, 5, 6], 10, true);
        flyer.hp = 5
        flyer.body.setSize(100, 60, 0, -15);
        flyer.anchor.x = 0.5
        flyer.anchor.y = 0.5
        flyer.name = 'flyer'
        enemiesAlive.push(flyer)
    })

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++)
    {
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true; 
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE; 
    enemyBullets.createMultiple(50, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    bossBullets = game.add.group();
    bossBullets.enableBody = true; 
    bossBullets.physicsBodyType = Phaser.Physics.ARCADE; 
    bossBullets.createMultiple(70, 'bossBullet');
    bossBullets.setAll('anchor.x', 0.5);
    bossBullets.setAll('anchor.y', 1);
    bossBullets.setAll('outOfBoundsKill', true);
    bossBullets.setAll('checkWorldBounds', true);



    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'char');
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.setSize(32, 40, 0, -5);
    player.anchor.x = 0.5
    player.anchor.y = 0.5

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.invincible = false

    //  Our two animations, walking left and right.
    player.animations.add('left', [3, 4, 5, 6], 10, true);
    player.animations.add('right', [3, 4, 5, 6], 10, true);
    player.animations.add('attack', [10, 9, 8], 3, true);
    player.animations.add('hit', [7], 10, true);
    player.animations.add('idle', [0, 1, 2], 10, true);



    // //  Finally some stars to collect
    // stars = game.add.group();

    // //  We will enable physics for any star that is created in this group
    // stars.enableBody = true;

    // //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 12; i++)
    // {
    //     //  Create a star inside of the 'stars' group
    //     var star = stars.create(i * 70, 0, 'star');

    //     //  Let gravity do its thing
    //     star.body.gravity.y = 300;

    //     //  This just gives each star a slightly random bounce value
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    hpText = game.add.text(180, 16, `Hp: ${hp}`, { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    if (game.level === 'level1') {
        speedDirA = -50;
        animationA = 'badright';
        directionIntervalA = setInterval(function() {
            if (goLeftA === true) {
                // debugger
                animationA = 'badleft';
                speedDirA = -150;
                goLeftA = false
            } else {
                animationA = 'badright';
                speedDirA = 150;
                goLeftA = true
            }

        }, 1000) 
        intervals.push(directionIntervalA)

        speedDirB = -50;
        animationB = 'badright';
        directionIntervalB = setInterval(function() {
            if (goLeftB === true) {
                // debugger
                animationB = 'badleft';
                speedDirB = -150;
                goLeftB = false
            } else {
                animationB = 'badright';
                speedDirB = 150;
                goLeftB = true
            }

        }, 1250) 
        intervals.push(directionIntervalB)

        clearFlyerOne = setInterval(function() {
            fireEnemyBullet(flyerOne)
        }, 500)
        intervals.push(clearFlyerOne)

        clearFlyerTwo = setInterval(function() {
            fireEnemyBullet(flyerTwo)
        }, 650)
        intervals.push(clearFlyerTwo)

    } else if (game.level === 'level2') {
        speedDirA = -50;
        animationA = 'badright'
        directionIntervalA = setInterval(function() {
            if (goLeftA === true) {
                // debugger
                animationA = 'badleft';
                speedDirA = -150;
                goLeftA = false
            } else {
                animationA = 'badright';
                speedDirA = 150;
                goLeftA = true
            }

        }, 1000) 
        intervals.push(directionIntervalA)
        speedDirB = -50;
        animationB = 'badright';
        directionIntervalB = setInterval(function() {
            if (goLeftB === true) {
                // debugger
                animationB = 'badleft';
                speedDirB = -150;
                goLeftB = false
            } else {
                animationB = 'badright';
                speedDirB = 150;
                goLeftB = true
            }

        }, 1250) 
        intervals.push(directionIntervalB)

        clearFlyerOne = setInterval(function() {
            fireEnemyBullet(flyerOne)
        }, 254)
        intervals.push(clearFlyerOne)

        clearFlyerTwo = setInterval(function() {
            fireEnemyBullet(flyerTwo)
        }, 374)
        intervals.push(clearFlyerTwo)

        clearFlyerThree = setInterval(function() {
            fireEnemyBullet(flyerThree)
        }, 490)
        intervals.push(clearFlyerThree)
    } else {
        clearBoss = setInterval(function() {
            fireBossBullet(boss)
        }, 75)
        clearBossTargeted = setInterval(function() {
            posOrNegX = _.sample(posOrNegArray)
            posOrNegY = _.sample(posOrNegArray)
            fireTargetedBossBullet(boss)
        }, 50)
        intervals.push(clearBoss)
        intervals.push(clearBossTargeted)
    }
}



function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, vertPlatforms);
    game.physics.arcade.collide(player, vertPlatformsShort);
    game.physics.arcade.collide(baddies, platforms);
    game.physics.arcade.collide(baddies, vertPlatforms);
    game.physics.arcade.collide(baddies, vertPlatformsShort);
    game.physics.arcade.collide(flyers, platforms);
    game.physics.arcade.collide(flyers, vertPlatforms);
    game.physics.arcade.collide(flyers, vertPlatformsShort);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(player, baddies, killPlayer);
    game.physics.arcade.collide(player, flyers, killPlayer);
    game.physics.arcade.collide(bullets, platforms, resetBullet);

    game.physics.arcade.collide(bossBullets, platforms, resetBullet);

    game.physics.arcade.collide(bossBullets, vertPlatformsShort, resetBullet);

    game.physics.arcade.collide(bullets, vertPlatforms, resetBullet);

    game.physics.arcade.collide(bullets, vertPlatformsShort, resetBullet);

    game.physics.arcade.collide(bullets, enemyBullets, bulletOnBullet);

    game.physics.arcade.overlap(bullets, baddies, collisionHandler, null, this);

    game.physics.arcade.overlap(enemyBullets, player, killPlayerFromBullet, null, this);

    game.physics.arcade.overlap(bossBullets, player, killPlayerFromBullet, null, this);

    game.physics.arcade.overlap(bullets, flyers, collisionHandler, null, this);

    game.physics.arcade.overlap(bullets, boss, bossCollisionHandler, null, this);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

   
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;


    if (baddieOne) {
        baddieOne.animations.play(animationA);
        baddieOne.body.velocity.x = speedDirA * 1.5;
        if (speedDirA > 0) {
                baddieOne.scale.x = -1;
            } else {
                baddieOne.scale.x = 1;
        }

        baddieTwo.animations.play('badleft');
        if (baddieTwo.body.touching.down) {
            baddieTwo.body.velocity.y = -250;
        }



        baddieThree.animations.play(animationB);
        baddieThree.body.velocity.x = speedDirB * 1.5;
        if (speedDirB > 0) {
            baddieThree.scale.x = -1;
        } else {
            baddieThree.scale.x = 1;
        }
    }

    if (flyerOne) {
        flyerOne.animations.play('flyleft');
        flyerOne.body.velocity.x = speedDirB;
        flyerOne.body.velocity.y = speedDirA;
        if (speedDirB > 0) {
            flyerOne.scale.x = -1;
        } else {
            flyerOne.scale.x = 1;
        }

        if (flyerOne.hp <= 0) {
            clearInterval(clearFlyerOne)
        }


        flyerTwo.animations.play('flyleft');
        flyerTwo.body.velocity.x = speedDirA;
        flyerTwo.body.velocity.y = speedDirB;
        if (speedDirA > 0) {
            flyerTwo.scale.x = -1;
        } else {
            flyerTwo.scale.x = 1;
        }

        if (flyerTwo.hp <= 0) {
            clearInterval(clearFlyerTwo)
        }
    }

    if (flyerThree) {

        flyerThree.animations.play('flyleft');
        flyerThree.body.velocity.x = speedDirA;
        flyerThree.body.velocity.y = speedDirB;
        if (speedDirA > 0) {
            flyerThree.scale.x = -1;
        } else {
            flyerThree.scale.x = 1;
        }
        if (flyerThree.hp <= 0) {
            clearInterval(clearFlyerThree)
        }
    }

    if (boss) {
        if (boss.hp > 50) {
            boss.animations.play('firstForm');
        } else if (boss.hp < 66 && boss.hp >= 64) {
            boss.animations.play('transform');
        } else if (boss.hp < 64 && boss.hp > 33) {
            boss.animations.play('secondForm');
        } else {
            boss.animations.play('finalForm');
        }
    }


    if (player.invincible === true) {
        player.tint = 0xff0000;
    } else {
        player.tint = 0xffffff;
    }

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');

        playerFacingLeft = true

        player.scale.x = 1;

    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');

        playerFacingLeft = false

        player.scale.x = -1;

    } else {

        if (player.animations.currentAnim.name === 'attack' || player.animations.currentAnim.name === 'hit') {
            setTimeout(function() {
                player.animations.play('idle');  
            }, 300) 
        } else {
            player.animations.play('idle');
        }

    }

    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireBullet();
    }
    }

    function collectStar (player, star) {
        
        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

    }

    function killPlayer(player, baddieOrFlyer) { 
        baddieOrFlyer.body.velocity.x = 0
        baddieOrFlyer.body.velocity.y = 0
        if (baddieOrFlyer.name === 'baddie') {
            baddieOrFlyer.animations.play('badattack')
        } 
        if (!player.invincible) {
            player.animations.play('hit');
            hp -= 1;
            hpText.text = 'Hp: ' + hp;
            if ( hp <= 0) {
            player.kill();
            }
            toggleInvincible();             
            game.time.events.add(2000, toggleInvincible, this);
        }
    }

    function killPlayerFromBullet(player, enemyBullet) { 
        enemyBullet.kill();
        if (!player.invincible) {
            player.animations.play('hit');
            hp -= 1;
            hpText.text = 'Hp: ' + hp;
            if ( hp <= 0) {
            player.kill();
            }
            toggleInvincible();             
            game.time.events.add(2000, toggleInvincible, this);
        }
    }

    function toggleInvincible() {    
        player.invincible = !player.invincible;
    }

    function fireBullet () {

        if (game.time.now > bulletTime) {
            bullet = bullets.getFirstExists(false);

            if (bullet) {
                player.animations.play('attack');
                bullet.reset(player.x , player.y - 15);
                if (playerFacingLeft === true) {
                    bullet.body.velocity.x = -300;
                    bulletTime = game.time.now + 150;
                } else {
                    bullet.body.velocity.x = 300;
                    bulletTime = game.time.now + 150;
                }
            }
        }
    }

    function fireEnemyBullet (enemy) {

        if (game.time.now > enemyBulletTime) {
            enemyBullet = enemyBullets.getFirstExists(false);

            if (enemyBullet) {
                // player.animations.play('attack');
                enemyBullet.reset(enemy.x , enemy.y - 15);
                enemyBullet.body.velocity.x = enemy.body.velocity.x;
                if (player.position.y > (enemy.position.y + 100)) {
                    if (enemy.body.velocity.y > 0) {
                        enemyBullet.body.velocity.y = enemy.body.velocity.y;
                    } else {
                        enemyBullet.body.velocity.y = (enemy.body.velocity.y * -1);
                    }
                }
                enemyBulletTime = game.time.now + 150;
            }
        }
    }

    function fireBossBullet (boss) {

        if (game.time.now > bossBulletTime) {
            bossBullet = bossBullets.getFirstExists(false);

            if (bossBullet) {
                bossBullet.reset(boss.x  , boss.y );
                bossBullet.body.velocity.x = velocity * (game.rnd.integerInRange(1, 30) / 10 * posOrNegX);
                bossBullet.body.velocity.y = velocity * (game.rnd.integerInRange(1, 30) / 10 * posOrNegY);
                // velocity += 10
                // if (velocity > 20) {
                //     velocity = 100
                // }
                // if (player.position.y > (enemy.position.y + 100)) {
                //     if (enemy.body.velocity.y > 0) {
                //         enemyBullet.body.velocity.y = enemy.body.velocity.y;
                //     } else {
                //         enemyBullet.body.velocity.y = (enemy.body.velocity.y * -1);
                //     }
                // }
                bossBulletTime = game.time.now + 150;
            }
        }
    }

    function fireTargetedBossBullet (boss) {

        if (game.time.now > bossBulletTime) {
            bossBullet = bossBullets.getFirstExists(false);

            if (bossBullet) {
                bossBullet.reset(boss.x  , boss.y );
                bossBullet.body.velocity.x = (boss.position.x - player.position.x) * -1;
                bossBullet.body.velocity.y = (boss.position.y - player.position.y) * -1;
                bossBullet.body.velocity.x = bossBullet.body.velocity.x / 3
                bossBullet.body.velocity.y = bossBullet.body.velocity.y / 3
                
                bossBulletTime = game.time.now + 150;
            }
        }
    }


    function resetBullet (bullet) {

        bullet.kill();

    }

    function bulletOnBullet (bullet, enemyBullet) {
        bullet.kill();
        enemyBullet.kill();
    }


    function collisionHandler (bullet, baddieOrFlyer) {

        bullet.kill();
        baddieOrFlyer.tint = 0xff0000;
        setInterval(function(){
            baddieOrFlyer.tint = 0xffffff;
        }, 200)
        baddieOrFlyer.hp -= 1
        if (baddieOrFlyer.hp <= 0) {
            baddieOrFlyer.kill();
            enemiesAlive.splice(0,1)
            if (enemiesAlive.length <= 0) {
                console.log('winner!')
                hp = 5
                intervals.forEach(function(interval) {
                    clearInterval(interval)
                })
                if (game.level === 'level1') {
                    game.level = 'level2'
                    create();
                } else if (game.level === 'level2') {
                    game.level = 'boss'
                    create();
                }
            }
            if (baddieOrFlyer.name === 'flyer') {
                score += 200;
                scoreText.text = 'Score: ' + score;
            } else {
                score += 100;
                scoreText.text = 'Score: ' + score;
            }
        }
        
    }

    function bossCollisionHandler (boss, bullet) {

        bullet.kill();
        boss.tint = 0xff0000;
        setInterval(function(){
            boss.tint = 0xffffff;
        }, 200)
        boss.hp -= 1
        if (boss.hp <= 0) {
            boss.kill();
            console.log('winner!')
            intervals.forEach(function(interval) {
                clearInterval(interval)
            })
            
        }
            
    }
        
