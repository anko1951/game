const D_WIDTH = 480;
const D_HEIGHT = 320;
const BACKGROUND_WIDTH = 1920; // 背景画像の幅
let player;
let background;
let spaceBar; // スペースキー用の変数
let cursors; // カーソルキー用の変数
<<<<<<< HEAD
let lives = 1; // 残機
let liveText; // 残機テキスト
let gameOverText; // ゲームオーバーテキスト
let gameOver = false;
=======
let lives = 2; // 残機
let heartGroup; // ハート画像のグループ
let gameOverText; // ゲームオーバーテキスト
let gameOver = false;
let retryKey;
let retryText;
let lastDirection = 'right'
let score = 0;
let coinCount = 0;
let scoreText;
>>>>>>> dev

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
<<<<<<< HEAD
            debug: true,
            gravity: { y: 300 }
=======
            debug: false,
            gravity: { y: 650 }
>>>>>>> dev
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
<<<<<<< HEAD
=======
    this.load.image("life", "./assets/Life.png"); // ハート画像
    this.load.image("clearArea","./assets/clear.png")
    this.load.spritesheet("player","./assets/playerSprite.png",{
        frameWidth:32,
        frameHeight:32
    });
>>>>>>> dev
}

function create() {
    console.log("create!!");

    // 背景をタイル状に設定
    background = this.add.tileSprite(0, 0, BACKGROUND_WIDTH, D_HEIGHT, "back").setOrigin(0, 0);

    // プレイヤーを追加
<<<<<<< HEAD
    player = this.physics.add.sprite(240, 80, "tanuki");

    // 残機表示のテキストを作成
    liveText = this.add.text(16, 16, `Lives: ${lives}`, {
        fontSize: '32px',
        fill: '#333'
    });
=======
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

    const clearArea = this.add.image(BACKGROUND_WIDTH - 40,D_HEIGHT -40,"clearArea");
    clearArea.setOrigin(0.5)
>>>>>>> dev

    // ゲームオーバーのテキストを作成
    gameOverText = this.add.text(0, 0, 'Game Over', {
        fontSize: '64px',
        fill: '#ff0000'
    });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false); // 初期は非表示

<<<<<<< HEAD
=======
    // リトライショートカットのテキスト
    retryText = this.add.text(0, 0, 'R push!', {
        fontSize: '32px',
        fill: '#fff'
    });
    retryKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    retryText.setOrigin(0.5);
    retryText.setVisible(false);

>>>>>>> dev
    // スペースキーとカーソルキーを登録
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    cursors = this.input.keyboard.createCursorKeys();

    // 静的グループを作成してオブジェクトを配置
    let staticGroup = this.physics.add.staticGroup();
    staticGroup.create(D_WIDTH / 0.81, D_HEIGHT, "ground1");
    staticGroup.create(1375, D_HEIGHT, "ground2");
    staticGroup.create(1810, D_HEIGHT, "ground3");
    staticGroup.create(240, 240, "block");
<<<<<<< HEAD
    staticGroup.create(600, 120, "block");
    staticGroup.create(350, 230, "post");
    staticGroup.create(400, 160, "pillar");
    staticGroup.create(740, 160, "pillar");
=======
    staticGroup.create(1300, D_HEIGHT -40, "post");
    staticGroup.create(1550, 280, "block");
    staticGroup.create(1650, 200, "block");
    staticGroup.create(1715, D_HEIGHT -110, "pillar");
>>>>>>> dev

    // プレイヤーと静的グループの衝突
    this.physics.add.collider(player, staticGroup);

    // コインのグループを作成
    let coinGroup = this.physics.add.group();
<<<<<<< HEAD
    coinGroup.create(190, 0, "coin");
    coinGroup.create(240, 0, "coin");
    coinGroup.create(290, 0, "coin");
=======
    coinGroup.create(240, 220, "coin");
    coinGroup.create(1300, 0, "coin");
    coinGroup.create(1550, 0, "coin");
    coinGroup.create(1650, 0, "coin");
    coinGroup.create(1715, 0, "coin");
>>>>>>> dev
    this.physics.add.collider(coinGroup, staticGroup);

    // プレイヤーとコインのオーバーラップ処理
    this.physics.add.overlap(player, coinGroup, (p, c) => {
        c.destroy(); // コインを破壊
<<<<<<< HEAD
=======
        coinCount++;
        score += 100;
        scoreText.setText(`Coins: ${coinCount} Score: ${score}`);
>>>>>>> dev
    }, null, this);

    // カメラの設定
    this.cameras.main.setBounds(0, 0, BACKGROUND_WIDTH, D_HEIGHT);
    this.cameras.main.startFollow(player);
<<<<<<< HEAD
    liveText.setScrollFactor(0);
=======

    this.physics.world.setBounds(0, 0, BACKGROUND_WIDTH, D_HEIGHT);

    // 残機のハート画像を初期表示
    updateLives();
}

function updateLives() {
    heartGroup.clear(true, true); // 既存のハートを削除

    for (let i = 0; i < lives; i++) {
        heartGroup.create(16 + i * 40, 16, 'life').setScrollFactor(0); // ハート画像を表示
    }
>>>>>>> dev
}

function update() {
    console.log("update!!");

<<<<<<< HEAD
    // 残機表示を画面の上部に固定
    liveText.setText(`Lives: ${lives}`); // 残機テキストを更新

    // プレイヤーの移動
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
=======
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
>>>>>>> dev
    }

    // ジャンプ処理
    if (spaceBar.isDown && player.body.touching.down) {
<<<<<<< HEAD
        player.setVelocityY(-300); // ジャンプの高さ
    }

    // プレイヤーが画面外に落ちた場合
    if (player.y > D_HEIGHT && !gameOver) {
        lives--; // 残機を減らす
=======
        player.setVelocityY(-350); // ジャンプの高さ
    }

    //ステージ両端領域制限
    if(player.x < 0){
        player.setX(0);
    }else if(player.x > BACKGROUND_WIDTH - player.width){
        player.setX(BACKGROUND_WIDTH - player.width);
    }


    // プレイヤーが画面外に落ちた場合
    if (player.y > D_HEIGHT && !gameOver) {
        lives--; // 残機を減らす
        updateLives(); // 残機のハート画像を更新
>>>>>>> dev

        if (lives <= 0) {
            this.physics.pause(); // 物理を一時停止
            gameOver = true;
<<<<<<< HEAD
=======
            coinCount = 0;
            score = 0;
            scoreText.setText(`Coins: ${coinCount} Score: ${score}`);
>>>>>>> dev
            gameOverText.setVisible(true); // ゲームオーバーのテキストを表示
        } else {
            player.setPosition(240, 80); // プレイヤーを初期位置に戻す
        }
    }
<<<<<<< HEAD
=======
    if(player.x >= BACKGROUND_WIDTH - player.width){
        gameOver = true;
        gameOverText.setText('Game Clear');
        gameOverText.setVisible(true);
    }

    if (gameOver && retryKey.isDown) {
        scoreText.setText(`Coins: ${coinCount} Score: ${score}`);
        resetGame(this);
    }
>>>>>>> dev

    // ゲームオーバー時のテキストの位置をカメラの中心に設定
    if (gameOver) {
        gameOverText.setPosition(
            this.cameras.main.scrollX + D_WIDTH / 2,
            this.cameras.main.scrollY + D_HEIGHT / 2
        );
<<<<<<< HEAD
    }
=======
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
        coinCount = 0;
        score = 0;
        scoreText.setText(`Coins: ${coinCount} Score: ${score}`);
        lives = 2; // 残機をリセット
        updateLives(); // 残機表示を更新

        scene.physics.resume();
    }

>>>>>>> dev
}
