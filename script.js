var canvas = document.querySelector("#geometry_dash");
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var square_width = 50;
var game_speed = 10;
var ground_height = 100;


class Player {
    constructor() {
        this.width = square_width;
        this.jump = false;
        this.jump_force = -10;
        this.gravity = .4;
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
        var level_array = level.level_array;

        var collide = false;

        for (let i = 0; i < level_array.length; i++) {
            for (let j = 0; j < level_array[i].length; j++) {
                if (level_array[i][j]) {
                    if (this.y + this.width >= canvas.height - ground_height - i * square_width && this.y <= canvas.height - ground_height - i * square_width + square_width && this.x + level_x + this.width >= j * square_width && this.x + level_x <= j * square_width + square_width) {
                        collide = true;
                        if (this.y + this.width - 10 >= canvas.height - ground_height - i * square_width) {
                            clearInterval(game);
                        }
                    }
                }
            }
        }

        if (this.y >= canvas.height - ground_height) {
            return true;
        }

        return collide;
    }
}

class Level {
    constructor(level) {
        this.level_array = level;
    }

    draw() {
        ctx.fillStyle = "#222";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#fff";
        for (let i = 0; i < this.level_array.length; i++) {
            for (let j = 0; j < this.level_array[i].length; j++) {
                if (this.level_array[i][j]) {
                    ctx.beginPath();
                    ctx.rect(j * square_width - level_x, canvas.height - ground_height - (i + 1) * square_width, square_width, square_width);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
}

class Tile {
    constructor(type) {
        switch (type) {
            case "block":

                break;

            default:
                break;
        }
    }

    draw() {

    }
}

var level_1 = [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, new Tile("block"), new Tile("block"), new Tile("block"), new Tile("block"), false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, new Tile("block"), new Tile("block"), false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, new Tile("block"), new Tile("block"), new Tile("block"), false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
]
var player = new Player();
var level = new Level(level_1);
var level_x = 0

var game = setInterval(() => {
    level_x += 2;
    player.move();
    draw();
    level.draw();
    player.draw();
}, 10)

function draw() {
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
}