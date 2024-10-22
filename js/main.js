const D_WIDTH = 480;
const D_HEIGHT = 320;
let player;
let background;

// 1, Phaser3の設定データ
const config = {
    type: Phaser.AUTO,
    width: D_WIDTH,// ゲーム画面の横幅
    height: D_HEIGHT,// ゲーム画面の高さ
    antialias: false,
    scene: {
        preload: preload,// 素材の読み込み時の関数
        create: create,// 画面が作られた時の関数
        update: update// 連続実行される関数
    },
    fps: {
        target: 24,// 1秒間に24回update
        forceSetTimeOut: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,// デバッグモード
            gravity: { y: 300 }// 重力の強さ
        }
    }
};

// 2, Phaser3オブジェクトを作る
let phaser = new Phaser.Game(config);

function preload() {
    console.log("preload!!");
    this.load.image("block", "./assets/block.png");
    this.load.image("ground", "./assets/ground.png");
    this.load.image("pillar", "./assets/pillar.png");
    this.load.image("post", "./assets/post.png");
    this.load.image("sky", "./assets/sky.png");
    this.load.image("tanuki", "./assets/tanuki.png");
    this.load.image("coin", "./assets/coin.png");
};

function create() {
    console.log("create!!");

    background = this.add.tileSprite(0,0,D_WIDTH,D_HEIGHT,"sky").setOrigin(0,0);

    player = this.physics.add.sprite(240,80,"tanuki");

    let staticGroup = this.physics.add.staticGroup();
    staticGroup.create(D_WIDTH/2,D_HEIGHT-32, "ground");
    staticGroup.create(240,240,"block");
    staticGroup.create(350,230,"post");
    staticGroup.create(400,160,"pillar");
    this.physics.add.collider(player,staticGroup);

    let coinGroup = this.physics.add.group();
    coinGroup.create(190,0,"coin");
    coinGroup.create(240,0,"coin");
    coinGroup.create(290,0,"coin");
    this.physics.add.collider(coinGroup,staticGroup);

    this.physics.add.overlap(player,coinGroup,(p,c)=>{
        c.destroy();
    },null,this);

    this.cameras.main.startFollow(player);
};

function update() {
    console.log("update!!");

    background.tilePositionX += player.body.velocity.x * 0.02;

    let cursors = this.input.keyboard.createCursorKeys();
    if(cursors.up.isDown){
        player.setVelocityY(-200);
    }else if(cursors.left.isDown){
        player.setVelocityX(-200);
    }else if(cursors.right.isDown){
        player.setVelocityX(200);
    }else{
        player.setVelocityX(0)
    }
};