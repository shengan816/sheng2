// 遊戲物件和變數
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 10,
    speed: 8,
    dx: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

let score = 0;

// 事件監聽器
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// 按鍵控制
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left'
    ) {
        paddle.dx = 0;
    }
}

// 更新球拍位置
function movePaddle() {
    paddle.x += paddle.dx;

    // 檢查邊界
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

// 更新球的位置
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // 檢查左右邊界碰撞
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }

    // 檢查上邊界碰撞
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // 檢查球拍碰撞
    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.speed;
        score += 10;
        scoreElement.innerHTML = score;
    }

    // 檢查遊戲結束
    if (ball.y + ball.radius > canvas.height) {
        resetGame();
    }
}

// 重置遊戲
function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ball.speed;
    ball.dy = -ball.speed;
    score = 0;
    scoreElement.innerHTML = score;
}

// 繪製球拍
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// 繪製球
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// 遊戲主循環
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();

    movePaddle();
    moveBall();

    requestAnimationFrame(gameLoop);
}

// 開始遊戲
gameLoop();