const ROWS = 25
const COLUMNS = 20;
const SHOVEL = 'shovel';
const AXE = 'axe';
const PICKAXE = 'pickAxe';
const INVETORY = 'invetory'
const invetoryStack = [];//for the ability to remember more than the last tile clicked (maintain the user’s inventory)

const gameBoard = document.querySelector('.game-board');
const invetory = document.querySelector('.invetory');
const shovelBtn = document.querySelector('.shovel');
const pickAxeBtn = document.querySelector('.pickAxe');
const axeBtn = document.querySelector('.axe');

let activeToolName = SHOVEL;
let activeTool = shovelBtn
activeTool.classList.add('btnClicked')

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
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            let status = statusMatrix[i][j];
            const tile = document.createElement('div');
            tile.classList.add('sky');
            tile.classList.add(status);
            gameBoard.appendChild(tile);
            tile.addEventListener('click', clickOnBoard)
        }
    }
}

function btnClick(tool, btn) {
    activeTool.classList.remove('btnClicked');
    activeTool.classList.remove('notClickable');
    activeTool = btn;
    activeToolName = tool;
    activeTool.classList.add('btnClicked');
}
function invetoryClick() { }

function clickOnBoard(e) {
    activeTool.classList.remove('notClickable');
    if (activeToolName === INVETORY){
        lastInvertory = invetory.classList[invetory.classList.length - 1];
        e.target.classList.add(lastInvertory);
        invetory.classList.remove(lastInvertory);
        prevInvertory = invetoryStack.pop();
        invetory.classList.add(prevInvertory);
    }
else{
    let status = e.target.classList[e.target.classList.length - 1];
    if (!isClickable(status)) {
        activeTool.classList.add('notClickable')
    }
    else {
        e.target.classList.remove(status);
        prevInvertory = invetory.classList[invetory.classList.length - 1];
        if (prevInvertory != 'invetory') {
            invetory.classList.remove(prevInvertory)
        }
        invetory.classList.add(status);
        invetoryStack.push(status);
    }
}
}

function isClickable(stsus) {
    if (stsus === 'leafs' && activeToolName === AXE) {
        return true;
    }
    if (stsus === 'wood' && activeToolName === AXE) {
        return true;
    }
    if (stsus === 'rock' && activeToolName === PICKAXE) {
        return true;
    }
    if (stsus === 'earth' && activeToolName === SHOVEL) {
        return true;
    }
    if (stsus === 'topEarth' && activeToolName === SHOVEL) {
        return true;
    }
    return false;
}

draw();