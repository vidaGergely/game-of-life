var rows = 1000;
var cols = 1000;
var switchIntervall = 150;
var switching;
var resolution = 3;

var grid = new Array(rows);
var tmp = new Array(rows);
var nextGrid = new Array(rows);

function elementsGrid(){
    //Here you can initialize the default grid

    grid[1][3] = 1;
    grid[1][4] = 1;
    grid[2][3] = 1;
    grid[2][4] = 1;
    grid[2][5] = 1;
    grid[3][3] = 1;
    grid[3][4] = 1;
    
    grid[150][150] = 1;
    grid[151][151] = 1;
    grid[152][152] = 1;
    grid[153][153] = 1;
    grid[154][154] = 1;
    grid[154][155] = 1;
    grid[154][156] = 1;
    grid[154][157] = 1;
    grid[154][158] = 1;
}


function initializeGrids() {
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
        tmp[i] = new Array(cols);
    }
}

function copyGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            tmp[i][j] = nextGrid[i][j];
        }
    }
}

function resetGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
            tmp[i][j] = 0;
        }
    }
 elementsGrid();
}

function applyRules(grid, nextGrid, row, col) {
    var numNeighbors = countNeighbors(grid, row, col);
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}

function countNeighbors(grid, row, col) {
    var count = 0;
    if (row - 1 >= 0) {
        if (grid[row - 1][col] == 1)
            count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == 1)
            count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == 1)
            count++;
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == 1)
            count++;
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] == 1)
            count++;
    }
    if (row + 1 < rows) {
        if (grid[row + 1][col] == 1)
            count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == 1)
            count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == 1)
            count++;
    }
    return count;
}

function computeNextGen(grid, nextGrid) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(grid, nextGrid, i, j);
        }
    }
}

function print(grid) {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            document.write(grid[i][j]);
        }
    }
}


function stopBtn() {
    clearInterval(swtiching);
}




function startBtn() {
    swtiching = setInterval(function () {
        computeNextGen(grid, nextGrid);
        copyAndResetGrid();
    }, switchIntervall);
        document.getElementById(startBtn).disabled = 'true';

}

function nextBtn() {
    computeNextGen(grid, nextGrid);
    copyAndResetGrid();
    }

function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function draw() {
    background(0);

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var x = i * resolution;
            var y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(y, x, resolution, resolution);
            }
        }

    }
}


function setup() {
    createCanvas(1000, 650);
    initializeGrids();
    resetGrids();

}