const D_WIDTH = 480;
const D_HEIGHT = 320;
let player;
let background;
let spaceBar; // スペースキー用の変数
let cursors; // カーソルキー用の変数
let lives = 1; // 残機
let liveText; // 残機テキスト
let gameOverText; // ゲームオーバーテキスト
let gameOver = false;

// Phaser3の設定データ
const config = {
    type: Phaser.AUTO,
    width: D_WIDTH,
    height: D_HEIGHT,
    antialias: false,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: {
        target: 24,
        forceSetTimeOut: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 300 }
        }
    }
};

// Phaser3オブジェクトを作成
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
}

function create() {
    console.log("create!!");

    // 背景をタイル状に設定
    background = this.add.tileSprite(0, 0, D_WIDTH * 4, D_HEIGHT, "sky").setOrigin(0, 0);

    // プレイヤーを追加
    player = this.physics.add.sprite(240, 80, "tanuki");

    // 残機表示のテキストを作成
    liveText = this.add.text(16, 16, `Lives: ${lives}`, {
        fontSize: '32px',
        fill: '#333'
    });

    // ゲームオーバーのテキストを作成
    gameOverText = this.add.text(0, 0, 'Game Over', {
        fontSize: '64px',
        fill: '#ff0000'
    });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false); // 初期は非表示

    // スペースキーとカーソルキーを登録
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    cursors = this.input.keyboard.createCursorKeys();

    // 静的グループを作成してオブジェクトを配置
    let staticGroup = this.physics.add.staticGroup();
    staticGroup.create(D_WIDTH / 2, D_HEIGHT - 32, "ground");
    staticGroup.create(D_WIDTH * 2, D_HEIGHT - 32, "ground");
    staticGroup.create(D_WIDTH * 3.5, D_HEIGHT - 32, "ground");
    staticGroup.create(240, 240, "block");
    staticGroup.create(600, 120, "block");
    staticGroup.create(350, 230, "post");
    staticGroup.create(400, 160, "pillar");
    staticGroup.create(740, 160, "pillar");

    // プレイヤーと静的グループの衝突
    this.physics.add.collider(player, staticGroup);

    // コインのグループを作成
    let coinGroup = this.physics.add.group();
    coinGroup.create(190, 0, "coin");
    coinGroup.create(240, 0, "coin");
    coinGroup.create(290, 0, "coin");
    this.physics.add.collider(coinGroup, staticGroup);

    // プレイヤーとコインのオーバーラップ処理
    this.physics.add.overlap(player, coinGroup, (p, c) => {
        c.destroy(); // コインを破壊
    }, null, this);

    // カメラの設定
    this.cameras.main.setBounds(0, 0, D_WIDTH * 4, D_HEIGHT);
    this.cameras.main.startFollow(player);
    liveText.setScrollFactor(0);
}

function update() {
    console.log("update!!");

    // プレイヤーの移動に合わせて背景がスクロール
    background.tilePositionX += player.body.velocity.x * 0.02;

    // 残機表示を画面の上部に固定
    liveText.setText(`Lives: ${lives}`); // 残機テキストを更新

    // プレイヤーの移動
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }

    // ジャンプ処理
    if (spaceBar.isDown && player.body.touching.down) {
        player.setVelocityY(-300); // ジャンプの高さ
    }

    // プレイヤーが画面外に落ちた場合
    if (player.y > D_HEIGHT && !gameOver) {
        lives--; // 残機を減らす

        if (lives <= 0) {
            this.physics.pause(); // 物理を一時停止
            gameOver = true;
            gameOverText.setVisible(true); // ゲームオーバーのテキストを表示
        } else {
            player.setPosition(240, 80); // プレイヤーを初期位置に戻す
        }
    }

    // ゲームオーバー時のテキストの位置をカメラの中心に設定
    if (gameOver) {
        gameOverText.setPosition(
            this.cameras.main.scrollX + D_WIDTH / 2,
            this.cameras.main.scrollY + D_HEIGHT / 2
        );
    }
}
