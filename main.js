var balletOfBullets = balletOfBullets || {};

balletOfBullets.game = new Phaser.Game(1600, 650, Phaser.AUTO, '', { preload: preload, create: create, update: update });
 
// balletOfBullets.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
 
balletOfBullets.game.state.add('Boot', balletOfBullets.Boot);
//uncomment these as we create them through the tutorial
//balletOfBullets.game.state.add('Preload', balletOfBullets.Preload);
//balletOfBullets.game.state.add('MainMenu', balletOfBullets.MainMenu);
//balletOfBullets.game.state.add('Game', balletOfBullets.Game);
 
balletOfBullets.game.state.start('level1');
