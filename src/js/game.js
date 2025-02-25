const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const rows = 31;
const cols = 56;

// Expanded "dope" maze (1 = wall, 0 = path, 2 = dot, 3 = PFC, 4 = power pellet, 5 = Grand Prize)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 0, 0, 0, 2, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1],
    [1, 4, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 4, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Center grand prize
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Four players at corners
const players = [
    { id: 1, x: 1, y: 1, dx: 0, dy: 0, color: "#ffd700", score: 0, pfc: 0, power: false, keys: { up: "w", down: "s", left: "a", right: "d" } }, // Top-left
    { id: 2, x: 54, y: 1, dx: 0, dy: 0, color: "#ff4500", score: 0, pfc: 0, power: false, keys: { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" } }, // Top-right
    { id: 3, x: 1, y: 29, dx: 0, dy: 0, color: "#00ff00", score: 0, pfc: 0, power: false, keys: { up: "i", down: "k", left: "j", right: "l" } }, // Bottom-left
    { id: 4, x: 54, y: 29, dx: 0, dy: 0, color: "#00ffff", score: 0, pfc: 0, power: false, keys: { up: "t", down: "g", left: "f", right: "h" } } // Bottom-right
];

// Ghosts
const ghosts = [
    { x: 27, y: 3, dx: 1, dy: 0, color: "#ff69b4" },
    { x: 28, y: 3, dx: -1, dy: 0, color: "#00ffff" }
];

let totalPFC = 0;
let playersConnected = [];

function drawMaze() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y] && maze[y][x] === 1) {
                ctx.fillStyle = "#4b0082";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                ctx.strokeStyle = "#ffd700";
                ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (maze[y] && maze[y][x] === 2) {
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 6, 0, Math.PI * 2);
                ctx.fill();
            } else if (maze[y] && maze[y][x] === 3) {
                ctx.fillStyle = "#ffd700";
                ctx.beginPath();
                ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#000";
                ctx.font = "12px Arial";
                ctx.fillText("PF", x * tileSize + tileSize / 2 - 6, y * tileSize + tileSize / 2 + 4);
            } else if (maze[y] && maze[y][x] === 4) {
                ctx.fillStyle = "#00ff00";
                ctx.beginPath();
                ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 8, 0, Math.PI * 2);
                ctx.fill();
            } else if (maze[y] && maze[y][x] === 5) { // Grand Prize
                ctx.fillStyle = "#ff00ff";
                ctx.beginPath();
                ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, 15, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#fff";
                ctx.font = "16px Arial";
                ctx.fillText("Grand PFC", x * tileSize + tileSize / 2 - 40, y * tileSize + tileSize / 2 + 5);
            }
        }
    }
}

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(player.x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
    ctx.fill();
    ctx.shadowBlur = player.power ? 20 : 0;
    ctx.shadowColor = player.color;
}

function drawGhost(ghost) {
    ctx.fillStyle = ghost.color;
    ctx.beginPath();
    ctx.arc(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2, tileSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = ghost.color;
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
            updateScores();
        } else if (maze[newY][newX] === 3) {
            player.pfc += 1;
            totalPFC += 1;
            document.getElementById("pfc-total").textContent = totalPFC;
            maze[newY][newX] = 0;
            updateScores();
        } else if (maze[newY][newX] === 4) {
            player.power = true;
            maze[newY][newX] = 0;
            setTimeout(() => player.power = false, 5000);
        } else if (maze[newY][newX] === 5) { // Grand Prize
            player.score += 1000;
            maze[newY][newX] = 0;
            updateScores();
            alert(`${player.color} Pac-Man won the Grand PFC!`);
        }
    }
    broadcastPosition(player);
}

function moveGhost(ghost) {
    const newX = ghost.x + ghost.dx;
    const newY = ghost.y + ghost.dy;
    if (maze[newY] && maze[newY][newX] !== 1) {
        ghost.x = newX;
        ghost.y = newY;
    } else {
        ghost.dx = Math.random() > 0.5 ? 1 : -1;
        ghost.dy = Math.random() > 0.5 ? 1 : -1;
    }
}

function checkCollision() {
    players.forEach(player => {
        ghosts.forEach(ghost => {
            if (player.x === ghost.x && player.y === ghost.y) {
                if (player.power) {
                    ghost.x = 27;
                    ghost.y = 3;
                    player.score += 100;
                    updateScores();
                } else {
                    player.score -= 50;
                    player.x = player.id === 1 ? 1 : player.id === 2 ? 54 : player.id === 3 ? 1 : 54;
                    player.y = player.id === 1 || player.id === 2 ? 1 : 29;
                    updateScores();
                }
            }
        });
    });
}

function updateScores() {
    const scoreElements = document.getElementById("scores").getElementsByTagName("p");
    players.forEach((player, i) => {
        scoreElements[i].textContent = `Player ${player.id}: ${player.score} | PFC: ${player.pfc}`;
    });
}

function broadcastPosition(player) {
    // Simulate real-time updates by updating all players' positions locally
    playersConnected.forEach(p => {
        if (p.id !== player.id) {
            p.x = player.x;
            p.y = player.y;
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
    ghosts.forEach(ghost => {
        moveGhost(ghost);
        drawGhost(ghost);
    });
    checkCollision();

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

// Chat functionality
const chatMessages = document.getElementById("chat-messages");
window.sendMessage = function () {
    const username = document.getElementById("username").value || "Anon" + Math.floor(Math.random() * 1000);
    const message = document.getElementById("chat-input").value;
    if (message) {
        const msgDiv = document.createElement("div");
        msgDiv.textContent = `${username}: ${message}`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        document.getElementById("chat-input").value = "";
    }
};

// Simulate player connections (local only)
playersConnected = [...players];

updateScores();

// Place items
maze[1][5] = 3;  // PFC
maze[1][50] = 3; // PFC
maze[4][1] = 4;  // Power Pellet
maze[4][54] = 4; // Power Pellet
maze[15][27] = 5; // Grand Prize in the middle

update();