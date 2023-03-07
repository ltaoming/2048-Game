var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}


function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    
    for(let i = 0; i<rows; i++){
        for(let j=0; j<columns; j++){
            //Create tell_cell on board
            let tile_cell = document.createElement("div");
            tile_cell.id = i.toString() + "-" + j.toString();
            let num = board[i][j];
            updateTile(tile_cell, num);
            document.getElementById("board").append(tile_cell);
        }
    }

    setTwo();
    setTwo();
}

function updateTile(tile_cell, num){
    tile_cell.innerText = "";
    tile_cell.classList.value = "";
    tile_cell.classList.add("tile_cell");
    if(num > 0){
        tile_cell.innerText = num;
        tile_cell.classList.add("t_" + num.toString());
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft" || e.code == "KeyA"){
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD"){
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp" || e.code == "KeyW"){
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function clearZero(row){
    return row.filter(num => num!=0);
}



function slide(row){
    // Clear zeroes in array
    row = clearZero(row);

    // Merge the same tile
    for(let i=0; i<row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *=2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    //Again, clear zeroes
    row = clearZero(row);

    //Add zeroes at the end
    while(row.length < columns){
        row.push(0);
    }
    return row;
}

function slideLeft(){
    for(let i=0; i<rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;
        
        for(let j=0; j<columns; j++){
            let tile_cell = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile_cell, num);
        }

    }
}

function slideRight(){
    for(let i=0; i<rows; i++){
        let row = board[i];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[i] = row;
        
        for(let j=0; j<columns; j++){
            let tile_cell = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile_cell, num);
        }

    }
}

function slideUp() {
    for (let j=0; j<columns; j++) {
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row = slide(row);

        for (let i=0; i<rows; i++){
            board[i][j] = row[i];
            let tile_cell = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile_cell, num);
        }
    }
}

function slideDown(){
    for(let j=0; j<columns; j++){
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for(let i=0; i<rows; i++){
            board[i][j] = row[i];
            let tile_cell = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile_cell, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let i = Math.floor(Math.random() * rows);
        let j = Math.floor(Math.random() * columns);
        if (board[i][j] == 0) {
            let num = Math.random();
            if(num<0.9){
                board[i][j] = 2;
                let tile_cell = document.getElementById(i.toString() + "-" + j.toString());
                tile_cell.innerText = 2;
                tile_cell.classList.add("t_2");
                found = true;
            }
            else{
                board[i][j] = 4;
                let tile_cell = document.getElementById(i.toString() + "-" + j.toString());
                tile_cell.innerText = 4;
                tile_cell.classList.add("t_4");
                found = true;
            }
            
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}
