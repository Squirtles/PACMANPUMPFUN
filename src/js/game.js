const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const rows = 31;
const cols = 28;

// Simple maze layout (1 = wall, 0 = path, 2 = dot, 3 = Pump Fun Coin)
const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,0,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,1,0,0,1,2,1,0,0,0,1,2,1,1,2,1,0,0,0,1,2,1,0,0,1,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // Simplified: Repeat or expand for full maze
];

// Players
const players = [
    { x: 1, y: 1, dx: 0, dy: 0, color: "yellow", score: 0, pfc: 0, keys: { up: "w", down: "s", left: "a", right: "d" } },
    { x: 26, y: 1, dx: 0, dy: 0, color: "red", score: 0, pfc: 0, keys: { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" } }
];

// Ghost (basic AI)
const ghost = { x: 13, y: 3, dx: 1, dy: 0, color: "pink" };

function drawMaze() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y] && maze[y][x] === 1) {
                ctx.fillStyle = "blue";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (maze[y] && maze[y][x] === 2) {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 4, 0, Math.PI * 2);
                ctx.fill();
            } else if (maze[y] && maze[y][x] === 3) {
                ctx.fillStyle = "gold";
                ctx.beginPath();
                ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.font = "10px Arial";
                ctx.fillText("PF", x * tileSize + tileSize / 2 - 5, y * tileSize + tileSize / 2 + 3);
            }
        }
    }
}

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawGhost() {
    ctx.fillStyle = ghost.color;
    ctx.beginPath();
    ctx.arc(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2, tileSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

function movePlayer(player) {
    const newX = player.x + player.dx;
    const newY = player.y + player.dy;
    if (maze[newY] && maze[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
        if (maze[newY][newX] === 2) {
            player.score += 10;
            maze[newY][newX] = 0;
        } else if (maze[newY][newX] === 3) {
            player.pfc += 1;
            maze[newY][newX] = 0;
        }
    }
}

function moveGhost() {
    const newX = ghost.x + ghost.dx;
    const newY = ghost.y + ghost.dy;
    if (maze[newY] && maze[newY][newX] !== 1) {
        ghost.x = newX;
        ghost.y = newY;
    } else {
        ghost.dx = -ghost.dx;
        ghost.dy = -ghost.dy;
    }
}

function checkCollision() {
    players.forEach(player => {
        if (player.x === ghost.x && player.y === ghost.y) {
            player.score -= 50;
            player.x = 1;
            player.y = 1;
        }
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    players.forEach(player => {
        movePlayer(player);
        drawPlayer(player);
    });
    moveGhost();
    drawGhost();
    checkCollision();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    players.forEach((player, i) => {
        ctx.fillText(`Player ${i + 1}: ${player.score} | PFC: ${player.pfc}`, 10, 20 + i * 30);
    });

    requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
    players.forEach(player => {
        if (e.key === player.keys.up) { player.dx = 0; player.dy = -1; }
        else if (e.key === player.keys.down) { player.dx = 0; player.dy = 1; }
        else if (e.key === player.keys.left) { player.dx = -1; player.dy = 0; }
        else if (e.key === player.keys.right) { player.dx = 1; player.dy = 0; }
    });
});

document.addEventListener("keyup", (e) => {
    players.forEach(player => {
        if (e.key === player.keys.up || e.key === player.keys.down) player.dy = 0;
        if (e.key === player.keys.left || e.key === player.keys.right) player.dx = 0;
    });
});

// Place some Pump Fun Coins
maze[1][5] = 3;
maze[3][10] = 3;

update();
