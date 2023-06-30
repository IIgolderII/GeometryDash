var canvas = document.querySelector("#geometry_dash");
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var square_width = 5;
var game_speed = 10;



class Player {
    constructor() {
        this.width = square_width;
        this.jump = false;
        this.jump_force = -2;
        this.gravity = .1;
        this.x = 20;
        this.y = 0;
        this.ay = 0;

        document.addEventListener("mousedown", (e) => {
            this.jump = true;
        })
        document.addEventListener("mouseup", (e) => {
            this.jump = false;
        })
    }

    move() {

        if (this.colliding()) {
            this.ay = 0;
        } else {
            this.ay += this.gravity;
        }

        if (this.jump && this.colliding()) {
            this.ay = this.jump_force;
        }

        this.y += this.ay;
    }

    draw() {
        ctx.fillStyle = "#f00";
        ctx.fillRect(width_percentage(this.x), height_percentage(this.y - this.width), width_percentage(this.width), width_percentage(this.width));
    }

    colliding() {
        if (this.y + this.width >= 80) {
            return true;
        } else {
            return false;
        }
    }
}

class Level {
    constructor(level) {
        this.level_array = level;
    }

    draw() {
        ctx.fillStyle = "#aaa";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#fff";
        for (let i = 0; i < this.level_array.length; i++) {
            for (let j = 0; j < this.level_array[i].length; j++) {
                if (this.level_array[i][j]) {
                    ctx.beginPath();
                    ctx.rect(width_percentage(j * square_width), height_percentage(80 - i * square_width + square_width), width_percentage(square_width), width_percentage(square_width));
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
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, new Tile("block"), new Tile("block"), new Tile("block")],
]
var player = new Player();
var level = new Level(level_1);

setInterval(() => {
    player.move();
    draw();
    player.draw();
    level.draw();
}, 10)

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#aaa";
    ctx.fillRect(0, height_percentage(80), canvas.width, canvas.height);
}

function width_percentage(percentage) {
    return percentage * canvas.width / 100;
}

function height_percentage(percentage) {
    return percentage * canvas.height / 100;
}