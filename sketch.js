let score = 1000;
let crosshairX = 400;
let crosshairY = 500;
let livesIconX = [45, 90, 135];
let livesIconY = 573;
let boxX1 = [];
let boxY1 = [];
let validSquares = [];
let boxVos = [];
let boxVosY = [];
let rectX = [];
let rectY = [];
let stop = false;
let lives = 3;
let bulletX;
let bulletY;
let firing = false;
let hitTarget = false;
let velocity = 5;
let boxX;
let boxY;
let boxVol;
let coms;
let letters;
let boundX1;
let boundX2;
let on;
let t;
let screen;
let rectW = 10;
let rectH;
let rectW2 = 20;
let rectH2 = 9;
let spiderX = 60;
let spiderY = 500;
let spiderVX = 3;
let spiderVY = -3;
let spiderDirection = "right";
let spiderMoving = true;
let delay;
let delay2;
let delay3;
let shipX = 100;
let shipVX = 10;
let shipMoving = true;
let validRects = [];
let shipDirection = "left";
let shipW = 100;
let level = 0;
//Variables for temporarily displaying numbers
let currentShipTime;
let numIsShownForShip = false;
//Variables for temporarily displaying numbers
let currentSpiderTime;
let numIsShownForSpider = false;
let tempSpiderX;
let tempSpiderY;
let threshHold = 10000;
let tallying = false;
let counter = 0;
let rectCounter = 0;
let hit;
//This is when I learned about objects. I wish I used them earlier...
let powerUpState = {
  x: undefined,
  y: undefined,
  timeHit: undefined,
  shown: true,
  timeSpawned: undefined,
  powerUp: undefined,
  width: 50,
  delay: undefined
};
let timeLeftForPowerUp
let powers = ["increasedSpeed", "increasedCentipedeSpeed", "increasedScores"];
let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let alpha1 = 0;
let alpha2 = 0;
let alpha3 = 0;
let letterSelected = 0;
let randomYCords = [];
for (i = 56; i < 400; i += 28) {
  randomYCords.push(i + 12);
}
let randX = [];
let randY = [];
let tntStartTime = [];
let scores = [
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
  { name: "Invalid Player", score: 0 },
];
let initial = "AAA";
let showingScoreboard = false;
let storedScores;
let isExploding = [];

function gameOver() {
  clear();
  background(0);
  fill(255);
  textFont(font);
  textSize(50);
  text("GAME OVER", 170, 100);
  textSize(35);
  fill("red");
  text("Score: " + score, 250, 170);
  fill("white");
  text("Enter your initials", 75, 235);
  textSize(100);
  text(alphabet[alpha1].toUpperCase(), 100, 400);
  if ((frameCount / 60).toFixed(0) % 2 == 0) {
    if (letterSelected == 0) {
      fill("#ADD8E6");
      rect(80, 400, 130, 10);
      fill("white");
    } else if (letterSelected == 1) {
      fill("#ADD8E6");
      rect(330, 400, 130, 10);
      fill("white");
    } else if (letterSelected == 2) {
      fill("#ADD8E6");
      rect(580, 400, 130, 10);
      fill("white");
    }
  }
  text(alphabet[alpha2].toUpperCase(), 350, 400);
  text(alphabet[alpha3].toUpperCase(), 600, 400);
  textSize(35);
  textFont("calibri");
  text(
    "Use the up and down arrow keys to adjust the\n letters and space to select different letters. To\n            confirm your initial, press enter.",
    75,
    475
  );
}

function tallyUp() {
  spiderSound.stop();
  rectCounter = 0;
  if (rectX.length == 0) {
    return;
  }
  tallying = true;
  const rectInterval = setInterval(() => {
    if (rectCounter < rectX.length) {
      if (rectCounter > 0) {
        fill("red");
        rect(rectX[rectCounter - 1], rectY[rectCounter - 1], rectW2, rectH2);
      }
      fill("orange");
      rect(rectX[rectCounter], rectY[rectCounter], rectW2, rectH2);
      fill("black");
      rect(595, 570, 106, 28);
      fill(192, 203, 255);
      textFont(font);
      textSize(25);
      text(score, 600, 597);
      shoot.play();
    }
    if (rectCounter == rectX.length) {
      clearInterval(rectInterval);
      tallying = false;
    } else {
      score += 50;
    }
    rectCounter++;
  }, 150);
}

function preload() {
  logo = loadImage("logo.JPG");
  font = loadFont("PressStart2P-Regular.ttf");
  font2 = loadFont("VT323-Regular.ttf");
  spiderSound = loadSound("Centipede_Spider_Sound.ogg");
  shoot = loadSound("shoot.mp3");
  extraLife = loadSound("extralife.mp3");
  weirdImage = loadImage("Capture.JPG");
  hit = loadSound("hit.mp3");
  //coin = loadSound('coin insert.mp3')
}

function setup() {
  createCanvas(800, 600);
  background(0);
  noStroke();
  frameRate(60);
  angleMode(DEGREES);
  if (getItem("scores") == null) {
    storeItem("scores", scores);
  } else {
    storedScores = getItem("scores");
  }
  powerUpState.x = Math.ceil(random(50, 710));
  powerUpState.y = random(randomYCords);
  restart();
  newWave();
}

function draw() {
  if (screen == "game") {
    if (!tallying) {
      checkIfNewLife();
      UI();
      moveCentipede();
      crossHair();
      spider();
      bonusShip();
      powerUp();
    }
  } else if (screen == "title" /*&& !coin.isPlaying()*/) {
    titleScreen();
  } else if (screen == "gameover") {
    gameOver();
  } else if (screen == "leaderboard") {
    scoreBoard();
  }
}

function titleScreen() {
  clear();
  background(0);
  /*
  stroke('green')
  line(boundX1, 0, boundX1, 600)
  line(boundX2, 0, boundX2, 600)
  line(400, 0, 400, 600)
  noStroke()
  */
  for (i = 0; i < boxX.length; i++) {
    fill(colours[i]);
    circle(boxX[i], boxY[i] - 20, 34);
    if (i == 0) {
      fill(0);
      circle(boxX[i] - 5, boxY[i] - 25, 3);
      circle(boxX[i] + 5, boxY[i] - 25, 3);
      noFill();
      stroke(0);
      arc(boxX[i], boxY[i] - 17, 15, 10, 0, 180);
      noStroke();
    } else {
      textFont(font2);
      fill(0);
      textSize(35);
      text(letters[i], boxX[i] - 7, boxY[i] - 11);
    }
    if (boxX[i] + 15 >= boundX1) {
      boxVol2[i] = true;
    }
    if (boxX[i] - 15 <= boundX2) {
      boxVol2[i] = false;
    }
    if (boxVol2[i]) {
      boxX[i] -= 1;
    } else {
      boxX[i] += 1;
    }
  }
  image(logo, 281, 370, logo.width - 30, logo.height - 30);
  fill(183, 133, 255);
  textFont(font2);
  textSize(60);
  text("Noah", 352, 515);
  textFont(font);
  textSize(12);
  text("copyright 2022", 316, 540);
  if (on) {
    textSize(20);
    fill("red");
    text("Press enter", 50, 460 - 30);
    text("to insert", 60, 500 - 30);
    text("coin", 100, 540 - 30);
    text("Press enter", 530, 460 - 30);
    text("to insert", 540, 500 - 30);
    text("coin", 580, 540 - 30);
  }
  fill("orange");
  textSize(14);
  text("Press the l key to see player leaderboards", 100, 570);
  weirdImages();
}

function checkIfNewLife() {
  if (score >= threshHold) {
    if (lives > 10) {
      return;
    }
    if (lives > 2) {
      livesIconX.push(parseInt(livesIconX.slice(-1)) + 45);
      extraLife.play();
    }
    lives++;
    threshHold += 10000;
  }
}

function weirdImages() {
  image(weirdImage, 100, 100);
  image(weirdImage, 206, 209);
  image(weirdImage, 117, 333);
  image(weirdImage, 124, 215);
  image(weirdImage, 267, 99);
  image(weirdImage, 44, 268);
  image(weirdImage, 56, 41);
  image(weirdImage, 160, 52);
  image(weirdImage, 196, 143);
  image(weirdImage, 700, 100);
  image(weirdImage, 594, 209);
  image(weirdImage, 683, 333);
  image(weirdImage, 676, 215);
  image(weirdImage, 533, 99);
  image(weirdImage, 756, 268);
  image(weirdImage, 800 - 160, 52);
  image(weirdImage, 800 - 196, 143);
}

function spider() {
  //width: 20, height: 25
  if (spiderMoving) {
    if (!spiderSound.isPlaying() && !tallying) {
      spiderSound.play();
    }
    if (lives == 0 || tallying) {
      spiderSound.stop();
    }
    fill(0, 0, 255);
    spiderVY += 0.125;
    spiderX += spiderVX;
    spiderY += spiderVY;
    //20, 25
    stroke("black");
    strokeWeight(3);
    if ((frameCount / 60).toFixed(0) % 2 == 0) {
      line(spiderX, spiderY, spiderX + 20, spiderY + 10);
      line(spiderX, spiderY, spiderX - 20, spiderY + 10);
      line(spiderX, spiderY, spiderX + 20, spiderY + 5);
      line(spiderX, spiderY, spiderX - 20, spiderY + 5);
    } else {
      line(spiderX, spiderY, spiderX + 20, spiderY - 10);
      line(spiderX, spiderY, spiderX - 20, spiderY - 10);
      line(spiderX, spiderY, spiderX + 20, spiderY - 5);
      line(spiderX, spiderY, spiderX - 20, spiderY - 5);
    }
    noStroke();
    fill(0, 0, 255);
    ellipse(spiderX, spiderY, 30, 20);
    fill(0);
    circle(spiderX - 5, spiderY - 3, 4);
    circle(spiderX + 5, spiderY - 3, 4);
    if (
      spiderY > crosshairY &&
      spiderY < crosshairY + 25 &&
      spiderX + 15 > crosshairX &&
      spiderX + 15 < crosshairX + 25
    ) {
      tallyUp();
      generateNewSpiderTimer();
      newWave();
      lives--;
      return;
    }
    if (
      spiderY > crosshairY &&
      spiderY < crosshairY + 25 &&
      spiderX - 15 > crosshairX &&
      spiderX + 15 < crosshairX + 25
    ) {
      tallyUp();
      generateNewSpiderTimer();
      newWave();
      lives--;
      return;
    }
    if (
      spiderX > crosshairX &&
      spiderX < crosshairX + 20 &&
      spiderY - 10 > crosshairY &&
      spiderY - 10 < crosshairY + 25
    ) {
      tallyUp();
      generateNewSpiderTimer();
      newWave();
      lives--;
      return;
    }
    if (
      spiderX > crosshairX &&
      spiderX < crosshairX + 20 &&
      spiderY + 10 > crosshairY &&
      spiderY + 10 < crosshairY + 25
    ) {
      tallyUp();
      generateNewSpiderTimer();
      newWave();
      lives--;
      return;
    }
    if (spiderY + 10 > 554) {
      spiderY = 544;
      spiderVY *= -1;
    }
    if (spiderX + 15 > 755) {
      generateNewSpiderTimer();
      return;
    }
    if (spiderX - 15 < 45) {
      generateNewSpiderTimer();
      return;
    }
  }
}

function generateNewSpiderTimer() {
  spiderMoving = false;
  current = frameCount;
  spiderVY = -3;
  spiderSound.stop();
  delay = Math.ceil(Math.random() * 10) * 1000;
  if (spiderDirection == "left") {
    spiderX = 60;
    spiderY = 500;
    spiderVX *= -1;
    spiderDirection = "right";
  } else if (spiderDirection == "right") {
    spiderX = 740;
    spiderY = 500;
    spiderVX *= -1;
    spiderDirection = "left";
  }
  setTimeout(() => {
    spiderMoving = true;
  }, delay);
}

function scoreBoard() {
  clear();
  background(0);
  textSize(30);
  fill("white");
  textFont(font);
  text("Leaderboards", 230, 50);
  textSize(20);
  for (i = 0; i < 10; i++) {
    text(
      storedScores[i].name + " -- " + storedScores[i].score,
      210,
      i * 50 + 90
    );
  }
  fill("orange");
  textSize(14);
  text("Press the l key to return to the start screen", 80, 570);
}

function UI() {
  clear();
  background(0);
  fill(130, 161, 46);
  rect(45, 560, 710, 7);
  fill(192, 203, 255);
  for (i = 0; i < lives; i++) {
    square(livesIconX[i], livesIconY, 20);
  }
  textFont(font);
  textSize(25);
  text(score, 600, 597);
  fill("#404040");
  rect(45, 450, 710, 110);
  fill(223, 27, 38);
  for (i = 0; i < rectX.length; i++) {
    if (validRects[i]) {
      rect(rectX[i], rectY[i], rectW2, rectH2);
    } else {
      //deletes rectangle x and y coordinates from array if a rectangle is destroyed - makes program more efficient
      rectX.splice(i, 1);
      rectY.splice(i, 1);
      validRects.splice(i, 1);
    }
  }
  if (numIsShownForShip) {
    if ((frameCount / 60).toFixed(0) - currentShipTime >= 2) {
      numIsShownForShip = false;
    } else {
      fill(192, 203, 255);
      textSize(15);
      text("1000", tempShipX, 25);
    }
  }
  if (numIsShownForSpider) {
    if ((frameCount / 60).toFixed(0) - currentSpiderTime >= 2) {
      numIsShownForSpider = false;
    } else {
      fill(192, 203, 255);
      textSize(15);
      text("200", tempSpiderX, tempSpiderY);
    }
  }
  for (i = 0; i < randX.length; i++) {
    //20, 9
    if (isExploding[i].exploding) {
      explode(isExploding[i].time, i);
    } else {
      fill("red");
      rect(randX[i], randY[i], 40, 20);
      textSize(12);
      textFont(font);
      fill("black");
      text("TNT", randX[i] + 2, randY[i] + 16);
    }
  }
  if (lives == 0) {
    newWave();
    restart();
    screen = "gameover";
  }
}

function explode(time, tntNum) {
  if ((frameCount / 60).toFixed(1) - (time / 60).toFixed(1) < 0.3) {
    fill("orange");
    circle(randX[tntNum] + 20, randY[tntNum] + 10, 70);
    isExploding[tntNum].diameter = 70;
  } else if ((frameCount / 60).toFixed(1) - (time / 60).toFixed(1) < 0.6) {
    fill("yellow");
    circle(randX[tntNum] + 20, randY[tntNum] + 10, 90);
    isExploding[tntNum].diameter = 90;
  } else if ((frameCount / 60).toFixed(1) - (time / 60).toFixed(1) < 1.5) {
    fill("red");
    circle(randX[tntNum] + 20, randY[tntNum] + 10, 120);
    isExploding[tntNum].diameter = 120;
  } else if ((frameCount / 60).toFixed(1) - (time / 60).toFixed(1) < 1.8) {
    fill("yellow");
    circle(randX[tntNum] + 20, randY[tntNum] + 10, 90);
    isExploding[tntNum].diameter = 90;
  } else if ((frameCount / 60).toFixed(1) - (time / 60).toFixed(1) < 2.1) {
    fill("red");
    circle(randX[tntNum] + 20, randY[tntNum] + 10, 120);
    isExploding[tntNum].diameter = 120;
  } else if ((frameCount / 60).toFixed(1) - (time / 60).toFixed(1) < 2.4) {
    fill("yellow");
    circle(randX[tntNum] + 20, randY[tntNum] + 10, 90);
    isExploding[tntNum].diameter = 90;
  } else if ((frameCount / 60).toFixed(1) - (time / 60).toFixed(1) > 2.4) {
    randX.splice(tntNum, 1);
    randY.splice(tntNum, 1);
    isExploding.splice(tntNum, 1);
  }
}

function moveCentipede() {
  for (i = 0; i < boxX1.length; i++) {
    if (!validSquares.includes(true)) {
      tallyUp();
      newWave();
      break;
    }
    if (validSquares[i]) {
      fill("white");
      isPressed(boxX1[i] + 14, boxY1[i] + 14, 28);
      circle(boxX1[i] + 14, boxY1[i] + 14, 28);
      if (boxY1[i] === 448) {
        boxVosY[i] = true;
      }
      if (boxY1[i] === 532) {
        boxVosY[i] = false;
      }
      if (boxX1[i] + 28 > 755) {
        boxX1[i] = 727;
        boxVos[i] = false;
        if (boxVosY[i]) {
          boxY1[i] += 28;
        } else {
          boxY1[i] -= 28;
        }
      } else if (boxX1[i] < 45) {
        boxX1[i] = 45;
        boxVos[i] = true;
        if (boxVosY[i]) {
          boxY1[i] += 28;
        } else {
          boxY1[i] -= 28;
        }
      }
      for (j = 0; j < rectX.length; j++) {
        if (validRects[j]) {
          if (
            boxX1[i] + 28 > rectX[j] &&
            boxX1[i] + 28 < rectX[j] + rectW2 &&
            boxY1[i] == rectY[j] - 12
          ) {
            boxVos[i] = false;
            //checks if the centipede is moving down or up
            if (boxVosY[i]) {
              boxY1[i] += 28;
            } else {
              boxY1[i] -= 28;
            }
          }
          if (
            boxX1[i] > rectX[j] &&
            boxX1[i] < rectX[j] + rectW2 &&
            boxY1[i] == rectY[j] - 12
          ) {
            boxVos[i] = true;
            //checks if the centipede is moving down or up
            if (boxVosY[i]) {
              boxY1[i] += 28;
            } else {
              boxY1[i] -= 28;
            }
          }
        }
      }
      for (j = 0; j < randX.length; j++) {
        if (!isExploding[j].exploding) {
          if (
            boxX1[i] + 28 > randX[j] &&
            boxX1[i] + 28 < randX[j] + 40 &&
            boxY1[i] == randY[j] - 12
          ) {
            boxVos[i] = false;
            //checks if the centipede is moving down or up
            if (boxVosY[i]) {
              boxY1[i] += 28;
            } else {
              boxY1[i] -= 28;
            }
          }
          if (
            boxX1[i] > randX[j] &&
            boxX1[i] < randX[j] + 40 &&
            boxY1[i] == randY[j] - 12
          ) {
            boxVos[i] = true;
            //checks if the centipede is moving down or up
            if (boxVosY[i]) {
              boxY1[i] += 28;
            } else {
              boxY1[i] -= 28;
            }
          }
        } else {
          if (
            dist(boxX1[i] + 14, boxY1[i] + 14, randX[j] + 20, randY[j] + 10) <=
            isExploding[j].diameter / 2 + 14
          ) {
            validSquares[i] = false;
            score += 100;
          }
        }
      }
      if (powerUpState.shown) {
        if ((boxY1[i] > powerUpState.y && boxY1[i] < powerUpState.y+powerUpState.width) || (boxY1[i]+28 > powerUpState.y && boxY1[i]+28 < powerUpState.y+powerUpState.width)) {
          if (
            boxX1[i] + 28 > powerUpState.x &&
            boxX1[i] + 28 < powerUpState.x + powerUpState.width
          ) {
            boxVos[i] = false;
            //checks if the centipede is moving down or up
            if (boxVosY[i]) {
              boxY1[i] += 28;
            } else {
              boxY1[i] -= 28;
            }
          }
          if (
            boxX1[i] > powerUpState.x &&
            boxX1[i] < powerUpState.x + powerUpState.width
          ) {
            boxVos[i] = true;
            //checks if the centipede is moving down or up
            if (boxVosY[i]) {
              boxY1[i] += 28;
            } else {
              boxY1[i] -= 28;
            }
          }
        }
      }
      if (boxVos[i]) {
        boxX1[i] += velocity;
      } else {
        boxX1[i] -= velocity;
      }
    }
  }
}

function powerUp() {
  if (powerUpState.shown) {
    timeLeftForPowerUp = 10-((frameCount/60).toFixed(0) - (powerUpState.timeSpawned/60).toFixed(0)) 
    if (timeLeftForPowerUp < 1) {
      generateNewPowerUpTimer('time')
      return
    }
    fill('yellow')
    square(powerUpState.x, powerUpState.y, 50);
    fill('black')
    textSize(30)
    text("?", powerUpState.x+12, powerUpState.y+32)
    textSize(15)
    text(timeLeftForPowerUp, powerUpState.x+19, powerUpState.y+50)
  }
}

function generateNewPowerUpTimer(howBlockWasDestroyed) {
  if (howBlockWasDestroyed == 'bullet') {
    //power in use for 10 seconds
    powerUpState.powerInUse = true
    powerUpState.delay = Math.ceil(Math.random()*10+15)
    setTimeout(()=>{
      powerUpState.powerUp = random(powers)
      powerUpState.powerInUse = false
    }, 10000)
  }
  else {
    powerUpState.delay = Math.ceil(Math.random()*10+10)
    powerUpState.powerUp = random(powers)
  }
  powerUpState.shown = false
  setTimeout(() => {
    powerUpState.shown = true
    powerUpState.x = Math.ceil(random(50, 710));
    powerUpState.y = random(randomYCords);
    powerUpState.timeSpawned = frameCount
  }, powerUpState.delay*1000)
}
  
function crossHair() {
  //Moves the crosshair if the user chooses to play with the arrow keys
  //Redraws the screen to animate the crosshair
  fill(223, 27, 38);
  if (keyIsDown(LEFT_ARROW) && crosshairX > 45) {
    crosshairX -= 5;
  }

  if (keyIsDown(RIGHT_ARROW) && crosshairX + 20 < 755) {
    crosshairX += 5;
  }

  if (keyIsDown(UP_ARROW) && crosshairY > 450) {
    crosshairY -= 5;
  }

  if (keyIsDown(DOWN_ARROW) && crosshairY + 25 < 560) {
    crosshairY += 5;
  }
  rect(crosshairX, crosshairY, 20, 25);
  fire();
}

function fire() {
  if (keyIsDown(32) && !firing) {
    bulletX = crosshairX + 7;
    bulletY = crosshairY - 10;
    firing = true;
    shoot.play();
  }
  if (firing) {
    fill("white");
    rect(bulletX, bulletY, 5, 5);
    for (i = 0; i < 5; i++) {
      bulletY -= 2;
      if (spiderMoving) {
        if (
          bulletX + 2.5 > spiderX &&
          bulletX + 2.5 < spiderX + 30 &&
          bulletY > spiderY &&
          bulletY < spiderY + 20
        ) {
          spiderMoving = false;
          firing = false;
          currentSpiderTime = (frameCount / 60).toFixed(0);
          tempSpiderX = spiderX;
          tempSpiderY = spiderY;
          numIsShownForSpider = true;
          generateNewSpiderTimer();
          break;
        }
      }
    }
    //checks if the bullet went of the screen
    if (bulletY < 0) {
      firing = false;
    }
    //checks if the bullet hit any rectangle on the screen
    for (j = 0; j < rectX.length; j++) {
      if (validRects[j]) {
        if (
          bulletX + 2.5 > rectX[j] &&
          bulletX + 2.5 < rectX[j] + 20 &&
          bulletY < rectY[j] + rectH2
        ) {
          firing = false;
          validRects[j] = false;
          score += 50;
        }
      }
    }
    //checks if the bullet hit a tnt block
    for (j = 0; j < randX.length; j++) {
      if (!isExploding[j].exploding) {
        if (
          bulletX + 2.5 > randX[j] &&
          bulletX + 2.5 < randX[j] + 40 &&
          bulletY < randY[j] + 20
        ) {
          hit.play();
          firing = false;
          isExploding[j].time = frameCount;
          isExploding[j].exploding = true;
          break;
        }
      }
    }
    //checks if the bullet hit any part of the centipede
    for (i = 0; i < boxX1.length; i++) {
      if (validSquares[i]) {
        if (
          ((bulletX >= boxX1[i] && bulletX <= boxX1[i] + 28) ||
            (bulletX + rectW >= boxX1[i] && bulletX + rectW < boxX1[i] + 28)) &&
          bulletY >= boxY1[i] &&
          bulletY <= boxY1[i] + 28
        ) {
          rectX.push(boxX1[i]);
          rectY.push(boxY1[i] + 12);
          validRects.push(true);
          validSquares[i] = false;
          firing = false;
          score += 100;
          break;
        }
      }
    }
    //checks if a ship is moving and if it was hit
    if (shipMoving) {
      if (bulletX > shipX && bulletX < shipX + shipW && bulletY < 20) {
        firing = false;
        shipMoving = false;
        score += 1000;
        currentShipTime = (frameCount / 60).toFixed(0);
        tempShipX = shipX;
        numIsShownForShip = true;
        generateNewShipTimer();
      }
    }
    //powerUpState.x
    if (powerUpState.shown) {
      if (
        bulletX + 2.5 > powerUpState.x &&
        bulletX + 2.5 < powerUpState.x + powerUpState.width &&
        bulletY > powerUpState.y &&
        bulletY < powerUpState.y + powerUpState.width
      ) {
        generateNewPowerUpTimer('bullet')
        firing = false;
      }
    }
  }
}

function bonusShip() {
  fill("green");
  if (shipMoving) {
    rect(shipX, 15, shipW, 5);
    if (shipDirection == "left") {
      shipX += 5;
    } else {
      shipX -= 5;
    }
    if (shipX + shipW > 750 || shipX < 50) {
      generateNewShipTimer();
    }
  }
}

function generateNewShipTimer() {
  delay2 = Math.ceil(Math.random() * 3) * 1000;
  shipMoving = false;
  if (shipDirection == "left") {
    shipX = 750 - shipW;
    shipDirection = "right";
  } else {
    shipX = 50;
    shipDirection = "left";
  }
  setTimeout(() => {
    shipMoving = true;
  }, delay2);
}

function isPressed(x, y, d) {
  //I made this function before I learned a better way to detect collision, but kept it because it did the job
  if (
    dist(x, y, crosshairX, crosshairY) <= d / 2 ||
    dist(x, y, crosshairX + 20, crosshairY) <= d / 2 ||
    dist(x, y, crosshairX, crosshairY + 25) <= d / 2 ||
    dist(x, y, crosshairX + 20, crosshairY + 20) <= d / 2
  ) {
    fill("#c04adc");
    lives--;
    tallyUp();
    newWave();
  } else {
    fill("white");
  }
}

function restart() {
  strokeWeight(1);
  boxX = [400, 410, 420, 430, 440, 450, 440, 430, 420, 410];
  boxY = [100, 130, 160, 190, 220, 250, 280, 310, 340, 370];
  boxVol2 = [true, true, true, true, true, true, true, true, true, true];
  colours = [
    "#6aaeed",
    "#ef7574",
    "#e08d4d",
    "#6aaeed",
    "#7db048",
    "#7451d0",
    "#c23d3c",
    "#c04eaa",
    "#cdcd34",
    "#64cd63",
  ];
  letters = ["", "C", "E", "N", "T", "I", "P", "E", "D", "E"];
  boundX1 = 425;
  boundX2 = 375;
  randX = [];
  randY = [];
  on = true;
  t = setInterval(() => {
    if (!on) {
      on = true;
    } else {
      on = false;
    }
  }, 1750);
  screen = "title";
  velocity = 2;
  lives = 3;
}

function newWave() {
  if (randX.length < 10 && level % 2 == 0) {
    randX.push(Math.ceil(random(50, 710)));
    randY.push(random(randomYCords));
    isExploding.push({ exploding: false });
  }
  validSquares = [];
  boxX1 = [];
  boxY1 = [];
  boxVos = [];
  boxVosY = [];
  for (i = 50; i < 300 + level * 28; i += 28) {
    boxX1.push(i);
    boxY1.push(28);
    validSquares.push(true);
    boxVos.push(true);
    boxVosY.push(true);
  }
  level++;
  velocity += 0.25;
  stop = false;
}

function processScore() {
  storedScores = getItem("scores");
  initial = (
    alphabet[alpha1] +
    alphabet[alpha2] +
    alphabet[alpha3]
  ).toUpperCase();
  storedScores.push({ name: initial, score: score });
  storedScores.sort((a, b) => b.score - a.score);
  storeItem("scores", storedScores);
  newWave();
  restart();
  screen = "title";
}

function keyPressed() {
  if (keyIsDown(13)) {
    if (screen == "title") {
      on = true;
      clearInterval(t);
      screen = "game";
      powerUpState.timeSpawned = frameCount
      powerUpState.powerUp = random(powers)
    }
  }
  if (screen == "gameover") {
    if (keyIsDown(13)) {
      on = true;
      clearInterval(t);
      screen = "title";
      processScore();
    }
    if (keyIsDown(32)) {
      if (letterSelected == 2) {
        letterSelected = 0;
      } else {
        letterSelected++;
      }
    } else if (keyIsDown(38)) {
      if (letterSelected == 0 && alpha1 > 0) {
        alpha1--;
      } else if (letterSelected == 1 && alpha2 > 0) {
        alpha2--;
      } else if (letterSelected == 2 && alpha3 > 0) {
        alpha3--;
      }
    } else if (keyIsDown(40)) {
      if (letterSelected == 0 && alpha1 < 25) {
        alpha1++;
      } else if (letterSelected == 1 && alpha2 < 25) {
        alpha2++;
      } else if (letterSelected == 2 && alpha3 < 25) {
        alpha3++;
      }
    }
  }
  if (keyIsDown(76) && screen != "game") {
    if (!showingScoreboard) {
      screen = "leaderboard";
      showingScoreboard = true;
    } else {
      screen = "title";
      showingScoreboard = false;
    }
  }
}

//wisam was here
//Add speed power block
//Add increased fire rate power-up
//Add decreased speed power block
//Possibly add power block that decreases speed of centipede
