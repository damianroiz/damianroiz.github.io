
const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const currentStreakValue = document.getElementById('current');
const bestStreakValue = document.getElementById('best');

const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let currentStreak = 0;
let bestStreak = 0;

let currentlyPlaying = true;

let door1;
let door2;
let door3;

const randomChoreDoorGenerator = () => {
    const randomNum = () => Math.floor(Math.random() * numClosedDoors);
    let imgArray = [botDoorPath, beachDoorPath, spaceDoorPath];
    door1 = imgArray[randomNum()];
    door2 = imgArray[randomNum()];
    door3 = imgArray[randomNum()];
    while (door2 === door1) {
        door2 = imgArray[randomNum()];
    }
    while (door3 === door1 || door3 === door2) {
        door3 = imgArray[randomNum()];
    }
};


const isBot = door => (door.src === botDoorPath) ? true : false;

const isClicked = door => (door.src === closedDoorPath ? false : true);

const playDoor = door => {
    numClosedDoors--;
    if (isBot(door) && numClosedDoors > 0) gameOver();
    if (numClosedDoors === 0) gameOver('win');
}

const gameOver = status => {
    if (status === "win") {
        startButton.innerHTML = "You win! Play again?"
        if (bestStreak <= currentStreak) bestStreak++;
        currentStreak++;
    } else {
        startButton.innerHTML = "Game over! Play again?"
        if (bestStreak <= currentStreak) bestStreak = currentStreak;
        currentStreak = 0;
    }
    currentlyPlaying = false;
    currentStreakValue.innerHTML = currentStreak;
    bestStreakValue.innerHTML = bestStreak;
}

doorImage1.onclick = () => {
    if (!isClicked(doorImage1) && currentlyPlaying === true) {
        doorImage1.src = door1;
        playDoor(doorImage1);
    }
}

doorImage2.onclick = () => {
    if (!isClicked(doorImage2) && currentlyPlaying === true) {
        doorImage2.src = door2;
        playDoor(doorImage2);
    }
}

doorImage3.onclick = () => {
    if (!isClicked(doorImage3) && currentlyPlaying === true) {
        doorImage3.src = door3;
        playDoor(doorImage3);
    }
}

startButton.onclick = () => {
    if (currentlyPlaying === false) startRound();
}

const startRound = () => {
    numClosedDoors = 3;
    startButton.innerHTML = "Good luck!";
    currentlyPlaying = true;
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    randomChoreDoorGenerator();
}

startRound();