const ROWS = 25
const COLUMNS = 20;
const SHOVEL = 'shovel';
const AXE = 'axe';
const PICKAXE = 'pickAxe';
const INVETORY = 'invetory'
let invetoryStack = [];//for the ability to remember more than the last tile clicked (maintain the user’s inventory)

let activeToolName;
let activeTool;

const gameBoard = document.querySelector('.game-board');
const invetory = document.querySelector('.invetory');
const shovelBtn = document.querySelector('.shovel');
const pickAxeBtn = document.querySelector('.pickAxe');
const axeBtn = document.querySelector('.axe');
const resetBtn = document.querySelector('.reset');

resetBtn.addEventListener('click', reset);

pickAxeBtn.addEventListener('click', () => { btnClick(PICKAXE, pickAxeBtn) });
axeBtn.addEventListener('click', () => { btnClick(AXE, axeBtn) });
shovelBtn.addEventListener('click', () => { btnClick(SHOVEL, shovelBtn) });

invetory.addEventListener('click', () => { btnClick(INVETORY, invetory) })
//TODO::drag and drop https://javascript.info/mouse-drag-and-drop


const statusMatrix =
    [
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'cloud', 'cloud', 'cloud', 'cloud', 'sky', 'cloud', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'cloud', 'cloud', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'leafs', 'leafs', 'leafs', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'leafs', 'leafs', 'leafs', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'leafs', 'leafs', 'leafs', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'wood', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'sky', 'leafs', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'wood', 'sky', 'sky', 'sky'],
        ['sky', 'sky', 'sky', 'leafs', 'leafs', 'leafs', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'rock', 'rock', 'sky', 'wood', 'sky', 'sky', 'rock'],
        ['topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth', 'topEarth'],
        ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
        ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
        ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
        ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
        ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
        ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],
        ['earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth', 'earth'],

    ];

function draw() {
    for (let i = 0; i < ROWS; i++)
        for (let j = 0; j < COLUMNS; j++)
            creatCell(i, j)
}

function creatCell(i, j) {
    let status = statusMatrix[i][j];
    const tile = document.createElement('div');
    tile.classList.add('sky');
    tile.classList.add(status);
    gameBoard.appendChild(tile);
    tile.addEventListener('click', clickOnBoard)
}

function btnClick(tool, btn) {
    //reset prev
    activeTool.classList.remove('btnClicked');
    activeTool.classList.remove('notClickable');
    //new
    activeTool = btn;
    activeToolName = tool;
    activeTool.classList.add('btnClicked');
}

function clickOnBoard(e) {
    //reset prev
    activeTool.classList.remove('notClickable');
    //new click
    if (activeToolName === INVETORY)
        invetoryActive(e);
    else {
        if (!isClickable(status))
            activeTool.classList.add('notClickable')

        else {
            let status = e.target.classList[e.target.classList.length - 1];
            toolActive(e, stsus)
        }
    }
}

function invetoryActive(e) {
    let lastInvertory = invetory.classList[invetory.classList.length - 1];
    e.target.classList.add(lastInvertory);
    invetory.classList.remove(lastInvertory);
    let prevInvertory = invetoryStack.pop();
    invetory.classList.add(prevInvertory);
}

function toolActive(e, status) {
    e.target.classList.remove(status);
    prevInvertory = invetory.classList[invetory.classList.length - 1];
    if (prevInvertory != 'invetory')
        invetory.classList.remove(prevInvertory)
    invetory.classList.add(status);
    invetoryStack.push(status);
}

function isClickable(stsus) {
    if ((stsus === 'leafs' && activeToolName === AXE) ||
        (stsus === 'wood' && activeToolName === AXE) ||
        (stsus === 'rock' && activeToolName === PICKAXE) ||
        (stsus === 'earth' && activeToolName === SHOVEL) ||
        (stsus === 'topEarth' && activeToolName === SHOVEL))
        return true;
    return false;
}

function deleteChild(element) {
    let first = element.firstElementChild;
    while (first) {
        first.remove();
        first = element.firstElementChild;
    }
}

function reset() {
    //clear before drow
    deleteChild(gameBoard);
    invetoryStack = [];
    invetory.classList.remove(invetory.classList[invetory.classList.length - 1])
    init()
}
function init() {
    activeToolName = SHOVEL;
    activeTool = shovelBtn
    activeTool.classList.add('btnClicked')
    draw();
}

init();