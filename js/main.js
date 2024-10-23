const D_WIDTH = 480;
const D_HEIGHT = 320;
const BACKGROUND_WIDTH = 1920; // 背景画像の幅
let player;
let background;
let spaceBar; // スペースキー用の変数
let cursors; // カーソルキー用の変数
let lives = 5; // 残機
let heartGroup; // ハート画像のグループ
let gameOverText; // ゲームオーバーテキスト
let gameOver = false;
let retryKey;
let retryText;
let lastDirection = 'right'
let score = 0;
let coinCount = 0;
let scoreText;

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
    this.load.image("ground1", "./assets/ground1.png");
    this.load.image("ground2", "./assets/ground2.png");
    this.load.image("ground3", "./assets/ground3.png");
    this.load.image("pillar", "./assets/pillar.png");
    this.load.image("post", "./assets/post.png");
    this.load.image("back", "./assets/back.png");
    this.load.image("tanuki", "./assets/tanuki.png");
    this.load.image("coin", "./assets/coin.png");
    this.load.image("life", "./assets/Life.png"); // ハート画像
    this.load.spritesheet("player","./assets/playerSprite.png",{
        frameWidth:32,
        frameHeight:32
    });
}

function create() {
    console.log("create!!");

    // 背景をタイル状に設定
    background = this.add.tileSprite(0, 0, BACKGROUND_WIDTH, D_HEIGHT, "back").setOrigin(0, 0);

    // プレイヤーを追加
    player = this.physics.add.sprite(240, 80, "player");

    this.anims.create({
        key: 'walk_right',
        frames:[{
            key: 'player', frame: 15
        },
        {
            key: 'player', frame: 16
        },
        {
            key: 'player', frame: 17
        }],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walk_left',
        frames:[{
            key: 'player', frame: 45
        },
        {
            key: 'player', frame: 46
        },
        {
            key: 'player', frame: 47
        }],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idle_right',
        frames:[{key: 'player', frame: 16}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idle_left',
        frames:[{key: 'player', frame: 46}],
        frameRate: 10,
        repeat: -1
    });

    //player.anims.play('idle_right');

    // ハートのグループを作成
    heartGroup = this.add.group();

    //コインのスコア
    scoreText = this.add.text(D_HEIGHT -50,16,'Coins: 0 Score: 0',{
        fontSize: '16px',
        fill: '#000'
    });
    scoreText.setScrollFactor(0);

    // ゲームオーバーのテキストを作成
    gameOverText = this.add.text(0, 0, 'Game Over', {
        fontSize: '64px',
        fill: '#ff0000'
    });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false); // 初期は非表示

    // リトライショートカットのテキスト
    retryText = this.add.text(0, 0, 'R push!', {
        fontSize: '32px',
        fill: '#fff'
    });
    retryKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    retryText.setOrigin(0.5);
    retryText.setVisible(false);

    // スペースキーとカーソルキーを登録
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    cursors = this.input.keyboard.createCursorKeys();

    // 静的グループを作成してオブジェクトを配置
    let staticGroup = this.physics.add.staticGroup();
    staticGroup.create(D_WIDTH / 0.81, D_HEIGHT, "ground1");
    staticGroup.create(1375, D_HEIGHT, "ground2");
    staticGroup.create(1810, D_HEIGHT, "ground3");
    staticGroup.create(240, 240, "block");
    staticGroup.create(1300, D_HEIGHT -40, "post");
    staticGroup.create(1550, 280, "block");
    staticGroup.create(1650, 200, "block");
    staticGroup.create(1715, D_HEIGHT -110, "pillar");

    // プレイヤーと静的グループの衝突
    this.physics.add.collider(player, staticGroup);

    // コインのグループを作成
    let coinGroup = this.physics.add.group();
    coinGroup.create(240, 220, "coin");
    coinGroup.create(1300, 0, "coin");
    coinGroup.create(1550, 0, "coin");
    coinGroup.create(1650, 0, "coin");
    coinGroup.create(1715, 0, "coin");
    this.physics.add.collider(coinGroup, staticGroup);

    // プレイヤーとコインのオーバーラップ処理
    this.physics.add.overlap(player, coinGroup, (p, c) => {
        c.destroy(); // コインを破壊
        coinCount++;
        score += 100;
        scoreText.setText(`Coins: ${coinCount} Score: ${score}`);
    }, null, this);

    // カメラの設定
    this.cameras.main.setBounds(0, 0, BACKGROUND_WIDTH, D_HEIGHT);
    this.cameras.main.startFollow(player);

    // 残機のハート画像を初期表示
    updateLives();
}

function updateLives() {
    heartGroup.clear(true, true); // 既存のハートを削除

    for (let i = 0; i < lives; i++) {
        heartGroup.create(16 + i * 40, 16, 'life').setScrollFactor(0); // ハート画像を表示
    }
}

function update() {
    console.log("update!!");

    // プレイヤーの移動
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play('walk_left', true);
        lastDirection = 'left'
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play('walk_right', true);
        lastDirection = 'right'
    } else {
        player.setVelocityX(0);
        if(lastDirection === 'left'){
            player.anims.play('idle_left');
        }else{
            player.anims.play('idle_right')
        }
    }

    // ジャンプ処理
    if (spaceBar.isDown && player.body.touching.down) {
        player.setVelocityY(-300); // ジャンプの高さ
    }

    // プレイヤーが画面外に落ちた場合
    if (player.y > D_HEIGHT && !gameOver) {
        lives--; // 残機を減らす
        updateLives(); // 残機のハート画像を更新

        if (lives <= 0) {
            this.physics.pause(); // 物理を一時停止
            gameOver = true;
            gameOverText.setVisible(true); // ゲームオーバーのテキストを表示
        } else {
            player.setPosition(240, 80); // プレイヤーを初期位置に戻す
        }
    }

    if (gameOver && retryKey.isDown) {
        resetGame(this);
    }

    // ゲームオーバー時のテキストの位置をカメラの中心に設定
    if (gameOver) {
        gameOverText.setPosition(
            this.cameras.main.scrollX + D_WIDTH / 2,
            this.cameras.main.scrollY + D_HEIGHT / 2
        );
        retryText.setPosition(
            this.cameras.main.scrollX + D_WIDTH / 2,
            this.cameras.main.scrollY + D_HEIGHT / 2 + 40
        );
        retryText.setVisible(true);
    }

    function resetGame(scene) {
        // ゲームオーバー解除
        gameOver = false;
        gameOverText.setVisible(false);
        retryText.setVisible(false);

        // プレイヤーを初期位置にリセット
        player.setPosition(240, 80);
        lives = 5; // 残機をリセット
        updateLives(); // 残機表示を更新

        scene.physics.resume();
    }
}
