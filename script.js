var canvas = document.querySelector("#geometryDash");
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var square_width = 50;
var game_speed = 7;
var ground_height = 100;


class Player {
    constructor() {
        this.width = square_width;
        this.jump = false;
        this.jump_force = -15;
        this.gravity = 1;
        this.x = 250;
        this.y = canvas.height - ground_height;
        this.ay = 0;

        document.addEventListener("mousedown", this.handleTouchStart.bind(this));
        document.addEventListener("mouseup", this.handleTouchEnd.bind(this));
        document.addEventListener("touchstart", this.handleTouchStart.bind(this));
        document.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart() {
        this.jump = true;
    }

    handleTouchEnd() {
        this.jump = false;
    }

    move() {

        this.ay += this.gravity;


        for (let i = 0; i < 10; i++) {

            if (this.colliding()) {
                this.ay = 0;

                if (this.jump) {
                    this.ay = this.jump_force;
                }
            }

            this.y += this.ay / 10;
        }
    }

    draw() {
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.x, this.y - this.width, this.width, this.width);
    }

    colliding() {
        var collide = false;

        level.forEach(tile => {
            if (this.y + this.width >= canvas.height - tile.y + square_width && this.y <= canvas.height - tile.y + square_width + tile.height && this.x + level_x + this.width >= tile.x && this.x + level_x <= tile.x + tile.width) {
                collide = true;
                if (this.y + this.width - 10 >= canvas.height - tile.y + square_width || tile.type == "spade") {
                    stop = true;
                    return true;
                }
            }
        })

        if (this.y >= canvas.height - ground_height) {
            return true;
        }

        return collide;
    }
}

class Tile {
    constructor(TYPE, X, Y) {
        this.type = TYPE;

        switch (this.type) {
            case "block":
                this.x = X;
                this.y = Y + ground_height;
                this.width = square_width;
                this.height = square_width;
                break;

            case "slab":
                this.x = X;
                this.y = Y + ground_height;
                this.width = square_width;
                this.height = square_width / 2;
                break;

            case "spade":
                this.x = X;
                this.y = Y + ground_height;
                this.width = square_width;
                this.height = square_width;
                break;

            case "doublespade":
                this.x = X;
                this.y = Y + ground_height;
                this.width = square_width;
                this.height = square_width;
                break;

            default:
                break;
        }
    }

    draw() {
        ctx.fillStyle = "#222";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        switch (this.type) {
            case "spade":
                ctx.moveTo(this.x - level_x + this.width / 2, canvas.height - this.y);
                ctx.lineTo(this.x - level_x + this.width, canvas.height - this.y + this.height);
                ctx.lineTo(this.x - level_x, canvas.height - this.y + this.height);
                ctx.lineTo(this.x - level_x + this.width / 2, canvas.height - this.y);
                break;

            default:
                ctx.rect(this.x - level_x, canvas.height - this.y, this.width, this.height);
                break;
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

const level_1 = [
    new Tile("spade", square_width * 18, square_width * 1), new Tile("doublespade", square_width * 30, square_width * 1), 
]

var player;
var level;
var level_x
var game;
var attempt = 0;
var stop;
var previousTime;
var frameTime;

newGame();


function newGame() {
    player = new Player();
    level = level_1;
    level_x = 0;
    attempt++;
    stop = false;
    previousTime = 0;
    frameTime = 1000 / 60;

    requestAnimationFrame(update);
}

function update() {
    var currentTime = (new Date()).getTime();
    var elapsed = currentTime - previousTime;

    if (elapsed > frameTime) {
        level_x += game_speed;
        player.move();
        draw(attempt);
        player.draw();

        previousTime = currentTime - (elapsed % frameTime);
    }

    if (stop) {
        newGame();
    } else {
        requestAnimationFrame(update);
    }
}


function draw(attempt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height - ground_height, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height - ground_height + 1, 2, 300, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.font = "52px Arial";
    // ctx.textAlign = "center";
    ctx.fillText("Essai " + attempt, canvas.width / 2 - level_x / 2, 150);
    level.forEach(tile => {
        tile.draw();
    })
}