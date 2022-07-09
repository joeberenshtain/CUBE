const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
const BLOCKY= canvas.height/3;
const BLOCKX= canvas.width/3;
const CENTER = [1.5, 1.5, 1.5]
const deg = Math.PI/90;
const rotateMatrixWup = [
    [Math.cos(deg), -Math.sin(deg), 0],
    [Math.sin(deg), Math.cos(deg), 0],
    [0,0,1]
]
const rotateMatrixWep = [
    [Math.cos(2*Math.PI-deg), -Math.sin(2*Math.PI-deg), 0],
    [Math.sin(2*Math.PI-deg), Math.cos(2*Math.PI-deg), 0],
    [0,0,1]
]
const rotateMatrixUp = [
    [1,0,0],
    [0,Math.cos(deg), -Math.sin(deg)],
    [0,Math.sin(deg), Math.cos(deg)]
]

const rotateMatrixDown = [
    [1,0,0],
    [0,Math.cos(2*Math.PI-deg), -Math.sin(2*Math.PI-deg)],
    [0,Math.sin(2*Math.PI-deg), Math.cos(2*Math.PI-deg)]
]
const rotateMatrixLeft = [
    [Math.cos(deg),0,-Math.sin(deg)],
    [0,1,0],
    [Math.sin(deg), 0,Math.cos(deg)]
]
const rotateMatrixRight = [
    [Math.cos(2*Math.PI-deg),0,-Math.sin(2*Math.PI-deg)],
    [0,1,0],
    [Math.sin(2*Math.PI-deg), 0,Math.cos(2*Math.PI-deg)]
]
const points = [[1,1,1],[2,1,1],[1,2,1],[2,2,1],[1,1,2],[2,1,2],[1,2,2],[2,2,2]];

function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    line(points[0],points[1])
    line(points[0],points[2])
    line(points[3],points[2])
    line(points[3],points[1])
    line(points[0],points[4])
    line(points[1],points[5])
    line(points[2],points[6])
    line(points[3],points[7])
    line(points[4],points[5])
    line(points[4],points[6])
    line(points[7],points[5])
    line(points[7],points[6])

}
function line(a, b) {
    ctx.lineWidth= 1;
    ctx.beginPath()
    ctx.moveTo(a[0]*BLOCKX, canvas.height-a[1]*BLOCKY);
    ctx.lineTo(b[0]*BLOCKX, canvas.height-b[1]*BLOCKY);
    ctx.stroke()

}
function center(vector) {
    let n = []
    for (let val in vector) {
        n[val] = vector[val] - CENTER[val]
    }
    return n
}
function uncenter(vector) {
    let n = []
    for (let val in vector) {
        n[val] = vector[val] + CENTER[val]
    }

    return n
}
function matrixMultiply3D(matrix, vector) {
    let newVec = []
    vector = center(vector)
    for (let row in matrix) {
        let n = 0;
        for (let val in matrix[row]) {
            n+=matrix[row][val]*vector[val]
        }
        newVec[row] = n;
    }
    newVec = uncenter(newVec)
    return newVec

}
drawLines()
document.addEventListener('keypress', (e)=> {
    if (e.key == "z" || e.key == "Z") {
        for (let point in points) {
            points[point] = matrixMultiply3D(rotateMatrixWup, points[point])
        }
    }
    else if (e.key == 'x' || e.key == "X") {
        for (let point in points) {
            points[point] = matrixMultiply3D(rotateMatrixWep, points[point])
        }
    }
    if (e.key == "w" || e.key == "W") {
        for (let point in points) {
            points[point] = matrixMultiply3D(rotateMatrixUp, points[point])
        }
        
    }
    else if (e.key == "s" || e.key == "S") {
        for (let point in points) {
            points[point] = matrixMultiply3D(rotateMatrixDown, points[point])
        }
    }
    if (e.key == "a" || e.key == "A") {
        for (let point in points) {
            points[point] = matrixMultiply3D(rotateMatrixLeft, points[point])
        }
    }
    else if (e.key == "d" || e.key == "D") {
        for (let point in points) {
            points[point] = matrixMultiply3D(rotateMatrixRight, points[point])
        }
    }
    drawLines()
    console.log("awake?")
})