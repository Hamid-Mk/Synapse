import kaplay from 'kaplay';

kaplay();

// Circles
const circle1 = add([
    circle(35),
    pos(500, 100),
    color(0, 255, 0),
    area(),
    body({isStatic: true}),
]);

const circle2 = add([
    circle(35),
    pos(650, 100),
    color(255, 0, 0),
    area(),
    body({isStatic: true}),
]);


const circle3 = add([
    circle(35),
    pos(800, 100),
    color(0, 0, 255),
    area(),
    body({isStatic: true}),
]);

const circle4 = add([
    circle(35),
    pos(950, 100),
    color(150, 0, 150),
    area(),
    body({isStatic: true}),
]);

// circles sequence text
const colorstext = add([
    text("Remember the sequence of colors and click them in the right order!"),
    pos(250, 25),
    color(255, 255, 0),
    scale(0.8),
    area(),
    body({isStatic: true})
]);

// Hide circles and text
circle1.hidden = true;
circle2.hidden = true;
circle3.hidden = true;
circle4.hidden = true;
colorstext.hidden = true;

// clickable circles
const button1 = add([
    circle(35),
    pos(500, 250),
    color(0, 255, 0),
    area(),
    body({isStatic: true}),
]);


const button2 = add([
    circle(35),
    pos(650, 250),
    color(255, 0, 0),
    area(),
    body({isStatic: true}),
]);

const button3 = add([
    circle(35),
    pos(800, 250),
    color(0, 0, 255),
    area(),
    body({isStatic: true}),
]);

const button4 = add([
    circle(35),
    pos(950, 250),
    color(150, 0, 150),
    area(),
    body({isStatic: true}),
]);

let sequence = [button1, button2, button3, button4];
let sequenceIndex = 0;
let tiltAmount = 0;
tiltAmount = Math.max(0, tiltAmount - 2);
let buttonsActive = false;

//Hide buttons
button1.hidden = true;
button2.hidden = true;
button3.hidden = true;
button4.hidden = true;

//Cubes

function createRedCube(x, y) {
    return add([
        rect(75, 75),
        pos(x, y),
        color(rgb(255, 0, 0)),
        area(),
        "redCube"
    ]);
}

function creatGreenCube(x, y) {
    return add([
        rect(75, 75),
        pos(x, y),
        color(rgb(0, 255, 0)),
        area(),
        "greenCube"
    ]);
}

// cubes functionality

onUpdate("redCube", (cube) => {
    cube.move(0, 100);
    if (cube.pos.y > 700) {
        destroy(cube);  
    }
});

onUpdate("greenCube", (cube) => {
    cube.move(0, 100);
    if (cube.pos.y > 700) {
        destroy(cube);
        tiltAmount += 2;
    }
});

loop(2, () => {
    createRedCube(rand(400, 1000), -50);
});

loop(2, () => {
    creatGreenCube(rand(400, 1000), -50);
});


//Make text and circles appear in sequence
wait(3, () => {
    colorstext.hidden = false;
});

wait(6, () => {
    circle1.hidden = false;
});

wait(9, () => {
    circle2.hidden = false;
});

wait(12, () => {
    circle3.hidden = false;
});

wait(15, () => {
    circle4.hidden = false;
});

wait(18, () => {
    circle1.hidden = true;
    circle2.hidden = true;
    circle3.hidden = true;
    circle4.hidden = true;
    colorstext.hidden = true;
});

//Make clickable circles appear
wait(21, () => {
    button1.hidden = false;
    button2.hidden = false;
    button3.hidden = false;
    button4.hidden = false;
    buttonsActive = true;
});

//clickable circles functionality

button1.onClick(() => {
    if (!buttonsActive) return;

    checkSequence(button1);
    button1.destroy();
});

button2.onClick(() => {
    if (!buttonsActive) return;

    checkSequence(button2);
    button2.destroy();
});

button3.onClick(() => {
    if (!buttonsActive) return;

    checkSequence(button3);
    button3.destroy();
});

button4.onClick(() => {
    if (!buttonsActive) return;

    checkSequence(button4);
    button4.destroy();
});

function checkSequence(button) {

    if (!buttonsActive) return;

    if (button === sequence[sequenceIndex]) {
        // Correct
        destroy(button);
        sequenceIndex++;

        // full sequence complete
        if (sequenceIndex === sequence.length) {
            sequenceIndex = 0;
        }

    } else {
        // Incorrect
        tiltAmount += 5;
        sequenceIndex = 0;
    }}

// Platform
const platform = add([
    
    rect(500, 50),
    pos(750, 500),
    rotate(0),
    anchor("center"),
    color(0, 0, 255),
    area(),
    body({isStatic: true}),
]);

// Platform movement
onUpdate(() => {
    platform.angle = Math.sin(time() * 2) * tiltAmount;
});

// Player
const player = add([
    rect(40, 40),
    pos(723, 460),
    area(),
    body({gravityScale: 1}),
    color(255, 0, 0),
    "player"
]);

// Player movement
onKeyDown("left", () => {
    player.move(-200, 0);
});

onKeyDown("right", () => {
    player.move(200, 0);
});

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(400);
    }
});

// Player cubecollision
player.onCollide("redCube", (cube) => {
    destroy(cube);
    tiltAmount += 5;
});

player.onCollide("greenCube", (cube) => {
    destroy(cube);
    if (tiltAmount > 0)
    tiltAmount -= 5;
});

// Gravity
setGravity(1200);




// add player sinchronisation with platform movement