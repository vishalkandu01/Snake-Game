function init() {
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 500;
    pen = canvas.getContext('2d');
    cs = 32; // cell space
    game_over = false;

    food = getRandomFood()

    snake = {
        init_len:5,
        color:"blue",
        cells:[], // the data structue which we used to store the cell of an snake is array
        direction:"right", // at start our snake is in right direction

        createSnake:function(){
            for(var i=this.init_len; i>0; i--){
                this.cells.push({x:i,y:0}); // here we are pushing co-ordinates(x,y) in our array in the form of object
            }
        },
        drawSnake:function(){
            
            for(var i=0; i<this.cells.length; i++){
                pen.fillStyle = this.color; // here we are filling color in our cells
                pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2); // here we are create a rectangel
            }
        },

        updateSnake:function(){
            // console.log("updating snake according to the direction property");
            // check if the snake has eaten food, increase the length of the snake and gneerate new food object
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y) {
                console.log("Food eaten");
                food = getRandomFood();
            }
            else {
                this.cells.pop();
            }
            
            var nextX, nextY;

            if(this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else {
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({x:nextX, y:nextY});
            
            /*Write a Logic that prevents snake from going out*/
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
                game_over = true;
            }
        }

    };

    snake.createSnake();
    //Add a Event Listener on the Document Object
    function keyPressed(e) {
        if(e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown") {
            snake.direction = "down";
        }
        else {
            snake.direction = "up";
        }
        console.log(snake.direction);
    }


    document.addEventListener('keydown', keyPressed);
}

function draw() {
    pen.clearRect(0,0,W,H); //erase the old frame
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x*cs, food.y*cs, cs, cs); // we are creating a food;
}

function update() {
    snake.updateSnake();
}

function getRandomFood() {
    var foodX = Math.round(Math.random()*((W-cs)/cs));
    var foodY = Math.round(Math.random()*((H-cs)/cs));

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

function gameloop() {
    if(game_over == true) {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}

init();

var f = setInterval(gameloop, 100);