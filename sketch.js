let score = 9800;
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
let velocity = 2;
let boxX;
let boxY;
let boxVol;
let colours;
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
let tempShipX;
//Variables for temporarily displaying numbers
let currentSpiderTime;
let numIsShownForSpider = false;
let tempSpiderX;
let tempSpiderY;
let threshHold = 10000;
let tallyingScores = false

function tallyUp() {
  let current = frameCount
  for (i = 0; i < rectX.length; i++) {
    console.log(rectX[i])
  }
}

function preload() {
  logo = loadImage("logo.JPG");
  font = loadFont("PressStart2P-Regular.ttf");
  font2 = loadFont("VT323-Regular.ttf");
  spiderSound = loadSound("Centipede_Spider_Sound.ogg");
  shoot = loadSound("shoot.mp3");
  //song = loadSound('song.mp3')
}

function setup() {
  createCanvas(800, 600);
  background(0);
  noStroke();
  frameRate(60);
  newWave();
}

function draw() {
  //playSong()
  checkIfNewLife();
  UI();
  moveCentipede();
  crossHair();
  spider();
  bonusShip();
}

function checkIfNewLife() {
  if (score >= threshHold) {
    if (lives > 10) {
      return;
    }
    if (lives > 2) {
      livesIconX.push(parseInt(livesIconX.slice(-1)) + 45);
    }
    lives++;
    threshHold += 10000;
  }
}

function playSong() {
  if (!song.isPlaying()) {
    song.play();
  }
}

function spider() {
  //width: 20, height: 25
  if (spiderMoving) {
    if (!spiderSound.isPlaying()) {
      spiderSound.play();
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
      tallyUp()
      generateNewSpiderTimer();
      newWave()
      return;
    }
    if (
      spiderY > crosshairY &&
      spiderY < crosshairY + 25 &&
      spiderX - 15 > crosshairX &&
      spiderX + 15 < crosshairX + 25
    ) {
      tallyUp()
      generateNewSpiderTimer();
      newWave()
      return;
    }
    if (
      spiderX > crosshairX &&
      spiderX < crosshairX + 20 &&
      spiderY - 10 > crosshairY &&
      spiderY - 10 < crosshairY + 25
    ) {
      tallyUp()
      generateNewSpiderTimer();
      newWave()
      return;
    }
    if (
      spiderX > crosshairX &&
      spiderX < crosshairX + 20 &&
      spiderY + 10 > crosshairY &&
      spiderY + 10 < crosshairY + 25
    ) {
      tallyUp()
      generateNewSpiderTimer();
      newWave()
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
      //deletes rectangle x and y coordinates from array if a rectangle is destroyed - saves memmory
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
}

function moveCentipede() {
  for (i = 0; i < boxX1.length; i++) {
    if (!validSquares.includes(true)) {
      tallyUp()
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
      if (boxVos[i]) {
        boxX1[i] += velocity;
      } else {
        boxX1[i] -= velocity;
      }
    }
  }
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
    bulletY -= 10;
    if (bulletY < 0) {
      firing = false;
    }
    for (j = 0; j < rectX.length; j++) {
      if (validRects[j]) {
        if (
          bulletX > rectX[j] &&
          bulletX < rectX[j] + 20 &&
          bulletY < rectY[j] + rectH2
        ) {
          firing = false;
          validRects[j] = false;
        }
      }
    }
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
    if (spiderMoving) {
      if (
        bulletX > spiderX + 2.5 &&
        bulletX < spiderX + 30 + 2.5 &&
        bulletY > spiderY + 2.5 &&
        bulletY < spiderY + 20 + 2.5
      ) {
        spiderMoving = false;
        firing = false;
        currentSpiderTime = (frameCount / 60).toFixed(0);
        tempSpiderX = spiderX;
        tempSpiderY = spiderY;
        numIsShownForSpider = true;
        generateNewSpiderTimer();
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
  if (
    dist(x, y, crosshairX, crosshairY) <= d / 2 ||
    dist(x, y, crosshairX + 20, crosshairY) <= d / 2 ||
    dist(x, y, crosshairX, crosshairY + 25) <= d / 2 ||
    dist(x, y, crosshairX + 20, crosshairY + 20) <= d / 2
  ) {
    fill("#c04adc");
    lives--;
    tallyUp()
    newWave();
  } else {
    fill("white");
  }
}

function newWave() {
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
  velocity += 0.5;
  stop = false;
}

function mousePressed() {
  //
}
