let ideaGifs = [];
let scene="main";
let sprite;
let mind;
let face;
let hair;
let brainX, brainY, brainRadius;
let toby;
 let ideaPlaced=false
let returnTime=0
let headOffsetY = 0;
let headDragging = false;
let headGrabY = 0;
let headLifted = false;
let isWorking=false;
let working;
let idea;
let workingClose;
let ideaReturnTime=0
let dialogue = "Hi! I'm Sprite.";
let showDialogue = false;
let talking;
let clickCount=0;
let introStarted = false;
let introFinished = false;
let dialogueIndex = 0;
let ideaCommentShown = false;
let mindPromptShown = false;
let dialogueFont;
let ideasCollected=0;
let workingClose2;
let workingClose3;
let workingClose4;
let workingClose5;
let ideaDialogues = [
  "Oh! What's that? I wonder what happens if you click on it...",
  "Another idea?! I'm still working on the last one!",
  "Oh! That one looks interesting, sure, add it in!",
  "Wow! We're really keeping 'em coming!",
  "Okay..I think I have enough to work with for now...",
  "It's getting a bit too much, slow down okay?",
  "...did you hear me? Are you doing this on purpose?",
  "I can't keep up! I'm not good enough!",
];

let mindStages=[];
let mindDialogueShown = false;
let workingStages = [];

let displayedText = "";
let typewriterIndex = 0;
let typewriterSpeed = 2;
let lastTypeTime = 0;
let talkingExpressions = [];
let currentExpression;

let workingDialogueIndexes = [0, 0, 0, 0];

let workingDialogue = [["Thanks! I'm working on it :)","...still working on it","...you really like clicking on me don't you?"],["Ok I can work with this...","You can stop watching me haha...I'm trying my best"],["I can't keep up with all this","Slow down with the ideas...kay?"],["Are you enjoying this? I asked you to stop","I just need some quiet"]];

let mindDialogue = ["Oh hey! You're up close! How could you get this into my head...?",
                  "Oh..Another one! Sure, why not?","Another one...but...I'm not finished with the other ones.","It's getting a bit much, don't you think?","I'm not good enough for all this..."];

function showMindDialogue() {
  let index = min(ideasCollected, mindDialogue.length - 1);

  dialogue = mindDialogue[index];
  startTyping();
  showDialogue = true;
  mindDialogueShown = true;
}


let introDialogue = [
  "Hey! Glad you found me, I'm Sprite!",
  "I wanna make something, could you help?",
  "I get stuck sometimes...and overwhelm myself",
  "...maybe you can help me find a new idea?"
];

let ideaStartTime = 0;

let headLiftAmount = -90;

function typewriterEffect() {
  if (millis() - lastTypeTime > 40) {
    if (typewriterIndex < dialogue.length) {
      typewriterIndex += typewriterSpeed;
      typewriterIndex = min(typewriterIndex, dialogue.length);

      displayedText = dialogue.substring(0, typewriterIndex);
      lastTypeTime = millis();
    }
  }
}

function startTyping() {
  displayedText = "";
  typewriterIndex = 0;
  lastTypeTime = millis();
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  updateLayout();
  sprite= await loadImage("assets/standing.gif");
  face=await loadImage("assets/mind1.gif");
    hair=await loadImage("assets/hair.png");
  toby=await loadImage("assets/ideaPlaced.gif");
  working=await loadImage("assets/working.gif");
  dialogueFont=await loadFont("assets/W95F.otf")
    workingClose2=await loadImage("assets/workingClose2.png");
  workingClose3=await loadImage("assets/workingClose3.png");
  workingClose4=await loadImage("assets/workingClose4.png");
  workingClose5=await loadImage("assets/wokringClose5.png");
  ideaGifs[0] = await loadImage("assets/idea1.gif")
  ideaGifs[1] = await loadImage("assets/idea2.gif")
  ideaGifs[2] = await loadImage("assets/idea3.gif")
  mindStages[0] = await loadImage("assets/mind1.gif");
mindStages[1] = await loadImage("assets/mind2.gif");
mindStages[2] = await loadImage("assets/mind3.gif");
mindStages[3] = await loadImage("assets/mind4.gif");

  /* 
  for(let i = 0; i < 10;i++.){
  idea[i] = push loadImage("assets/" + i + ".gif");
  }

  assets/0.gif
  assets/1.gif
  assets/2.gif
  */
  // idea[] ... use an array to store all the ideas. idea[i] = push loadImage("assets/...");
 talking=await loadImage("assets/talking.gif")
  workingClose=await loadImage("assets/workingclose.gif");
  idea1= new Idea();
}

function workingCloseDialogue() {
let stage = max(0, min(ideasCollected - 1, workingDialogue.length - 1));
  let comments = workingDialogue[stage];

  let lineIndex = min(
    workingDialogueIndexes[stage],
    comments.length - 1
  );

  dialogue = comments[lineIndex];
  startTyping();

  if (workingDialogueIndexes[stage] < comments.length - 1) {
    workingDialogueIndexes[stage]++;
  }

  showDialogue = true;
}

function drawDialogue() {

  if (showDialogue) {
let boxWidth = width * 0.7;
let boxHeight = height * 0.30;

let boxX = (width - boxWidth) / 2;
let boxY = height - boxHeight - height * 0.04;


    fill(255);
    stroke(255,0,0);
    strokeWeight(10);
rect(boxX, boxY, boxWidth, boxHeight);

    fill(255);
    strokeWeight(7)
    stroke(255,0,0);
  textFont(dialogueFont);
    textAlign(LEFT, TOP);

    textSize(min(width * 0.025, 24));

    typewriterEffect();
text(
  displayedText,
  boxX + 250,
  boxY + 35,
  boxWidth - 50,
  boxHeight - 20
);

    image(talking, boxX + 120, boxY + 120, 200, 200);

 
  }
}

function nextDialogue() {

  dialogueIndex++;

  if (dialogueIndex < introDialogue.length) {

    dialogue = introDialogue[dialogueIndex];
    startTyping();

  } else {

    showDialogue = false;
    introFinished = true;
    introStarted = false;

    // Start the idea timer, NOT the working animation
ideaStartTime = millis() + 5000;
ideaCommentShown = false;
  }
}


function draw() {
  background(255);
  imageMode(CENTER);

  if (scene === "main") {

    if (isWorking) {
      noSmooth();
      image(working,width * 0.5, height * 0.5, 35, 70);
    } else {
      noSmooth();
      image(sprite,width * 0.5, height * 0.5, 55, 65);
    }

    // Show the idea after the introduction and timers
  if (
  introFinished &&
  millis() > ideaStartTime &&
  millis() > ideaReturnTime &&
  !ideaPlaced
) {
  idea1.move();
  idea1.show();


}
}
  
      

  else if (scene === "mind") {
    background(255);
    noSmooth();

   let stage = min(ideasCollected, mindStages.length - 1);

image(
  mindStages[stage],
  width * 0.515,
  height * 0.59,
  width * 0.6,
  height * 0.5
);
  let head = getHeadLayout();

image( hair,width * 0.5, height * 0.35 + headOffsetY, width * 0.32, height * 0.3);

    if (ideaPlaced) {
      image(toby, brainX, brainY, 300, 300);
    } else {
      idea1.move();
      idea1.show();
    }

    // Return to main scene after idea is placed
    if (ideaPlaced && millis() - returnTime > 3000) {
      scene = "main";
      ideaPlaced = false;
      isWorking = true;
      secondIdeaCommentShown = false;

      ideaCommentShown = false;

      headOffsetY = 0;
      headLifted = false;

      idea1.x = 100;
      idea1.y = 150;

      showDialogue = false;
      ideaReturnTime = millis() + 10000;
    }
  }

  else if (scene === "workingCloseup") {
  noSmooth();

  if (ideasCollected === 1) {
    image(workingClose, width * 0.5, height * 0.4, width * 0.6, height * 0.8);
  }

  else if (ideasCollected === 2) {
    image(workingClose2, width * 0.5, height * 0.4, width * 0.6, height * 0.8);
  }

  else if (ideasCollected === 3) {
    image(workingClose4, width * 0.5, height * 0.4, width * 0.6, height * 0.8);
  }
      else if (ideasCollected === 4) {
    image(workingClose5, width * 0.5, height * 0.4, width * 0.8, height * 0.8);
  }
}
  

  // Always draw dialogue last so it appears on top
  drawDialogue();
}



function startIntro() {
  introStarted = true;
  dialogueIndex = 0;
  dialogue = introDialogue[dialogueIndex];
  showDialogue = true;
}

function getHeadLayout() {
  return {
    x: width * 0.5,
    y: height * 0.32,
    w: width * 0.45,
    h: height * 0.38
  };
}

function mousePressed() {
  if (!introStarted && !introFinished && !isWorking) {
    let spriteX = width * 0.5;
    let spriteY = height * 0.5;

    let d = dist(mouseX, mouseY, spriteX, spriteY);

    if (d < min(width, height) * 0.08) {
      startIntro();
      return;
    }
  }

  // Advance dialogue when the dialogue box is clicked
let boxWidth = width * 0.7;
let boxHeight = height * 0.30;

let boxX = (width - boxWidth) / 2;
let boxY = height - boxHeight - height * 0.04;

if (showDialogue) {
  if (
    mouseX > boxX &&
    mouseX < boxX + boxWidth &&
    mouseY > boxY &&
    mouseY < boxY + boxHeight
  ) {
    if (introStarted) {
      nextDialogue();
    } else {
      showDialogue = false;
    }
  }
  return;
}
  // Clicking the close-up returns to the main scene
  if (scene === "workingCloseup") {
    scene = "main";
    return;
  }




  if (scene === "main") {

  

if (isWorking) {
  let spriteX = width * 0.5;
  let spriteY = height * 0.5;

  if (dist(mouseX, mouseY, spriteX, spriteY) < min(width, height) * 0.08) {
    workingCloseDialogue();
    scene = "workingCloseup";
    return;
  
  }
}

    // Check if the idea was clicked
if (!ideaPlaced && millis() > ideaReturnTime) {
  let d = dist(mouseX, mouseY, idea1.x, idea1.y);

  if (d < 75) {
    scene = "mind";
    showMindDialogue();


    return;
  }
  }
}

  if (scene === "mind") {

    let d = dist(mouseX, mouseY, idea1.x, idea1.y);

    if (d < 40 && !ideaPlaced) {
      idea1.dragging = true;
      return;
    }

    let headTop = 95 + headOffsetY;
    let headBottom = 199 + headOffsetY;

let head = getHeadLayout();

if (
  mouseX > head.x - head.w / 2 &&
  mouseX < head.x + head.w / 2 &&
  mouseY > head.y + headOffsetY - head.h / 2 &&
  mouseY < head.y + headOffsetY + head.h / 2
) {
  headDragging = true;
  headGrabY = mouseY - headOffsetY;
}
  }
}

function updateLayout() {
  brainX = width * 0.5;
  brainY = height * 0.42;
  brainRadius = min(width, height) * 0.09;
}

function mouseDragged() {
  if (headDragging) {
headOffsetY = constrain(
  mouseY - headGrabY,
  -height * 0.3,
  0
);
  headLifted = headOffsetY <= -height * 0.1;
  }
}

function mouseReleased() {
  headDragging = false;
  idea1.dragging = false;

  let d = dist(idea1.x, idea1.y, brainX, brainY);


  if (scene === "mind" && headLifted && d < brainRadius) {
    ideasCollected++
    ideaPlaced = true;
      idea1.img = ideaGifs[ideasCollected % ideaGifs.length];

    idea1.x = brainX;
    idea1.y = brainY;
 returnTime=millis();
  
  }
}




class Idea {
  constructor(){
    this.img = ideaGifs[0];
    this.x = width * 0.25;
this.y = height * 0.4;
    this.dragging=false;
  }
  
  move() {
    this.x=this.x+random(-0.5,0.5);
    this.y=this.y+random(-2,2)
    if (this.dragging){
      this.x = mouseX;
      this.y=mouseY;
    
    }
  }
  
  show() {
  imageMode(CENTER);
    //image(idea[i],this.x,this.y,80,80)
  image(this.img, this.x, this.y, 150, 150);
  }
}