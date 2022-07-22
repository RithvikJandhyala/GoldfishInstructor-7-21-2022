var startSong = null;
var chstart = null;
var PictureArray = [];
var timer = 0;
var gameState=0;

var ymcaLetter = ['Show your \'Y\' pose!','Now lets do an \'M\'!','And now a \'C\'!','And finally show me your \'A\'!'];

function preload() {

  //Screen 1 Enter Name
  ocean = loadImage('/Images/Backgrounds/ocean2.jpg');
  goldieimg = loadImage('/Images/IconsAvatars/goldie.png');
  octostillimg = loadImage('/Images/IconsAvatars/octoborder.jpg');

  //Screen 2 Village
  villageimg = loadImage('/Images/Backgrounds/village.png');
  octoimg = loadImage('/Images/IconsAvatars/octo.png');
  txtbubbleimg = loadImage('/Images/Misc/txtbubble.png');
  
  // Screen 3 : Mood test
  beach1 = loadImage('/Images/Backgrounds/beach1.jpg');
  textboximg = loadImage('/Images/Misc/textbox.jpg');
  
  //Screen 6: YMCA Dance
  beachTheater = loadImage('/Images/Backgrounds/beach.jpg');
  yellowBoxBorderimg = loadImage('/Images/Misc/yellow.png');

  coins = loadImage('/Images/Backgrounds/coins.jpg');
  bagcoinsimg = loadImage('/Images/Misc/bagcoins.png')

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  textAlign(CENTER);
  //Screen Enter Name
      //Goldie
      goldie=createSprite(displayWidth/2,displayHeight/4,50,50);
      goldie.addImage("goldie",goldieimg);
      goldie.scale = 0.4;
      goldie.visible = false;

      //Octopus Still
      octostill=createSprite(displayWidth/4,displayHeight/2.3,50,50);
      octostill.addImage("octostill",octostillimg);
      octostill.scale = 0.15;

      bagcoins=createSprite(displayWidth/2 ,displayHeight/2 ,50,50);
      bagcoins.addImage("bagcoinsimg",bagcoinsimg);
      bagcoins.scale = 0.5;
      bagcoins.visible= false;

      //Input
      input = createInput();
      input.position(displayWidth/3,displayHeight/2.5);
      input.size(displayWidth/3,displayHeight/13);
      input.style('font-size', '20px');
      input.value('Enter Your Name');
      input.hide();

      //Go Button
      button = createButton('GO!');
      button.position(input.x + input.width+10,displayHeight/2.5);  
      button.size(displayHeight/11,displayHeight/12);
      button.mousePressed(newScreen);
      button.hide();

  //Screen village

      //Moving Octo
      octo= createSprite(displayWidth/19,displayHeight/1.64 + 5,50,50);
      octo.addImage("octo",octoimg);
      octo.scale = 0.2; 
      octo.visible=false; 

      //TextBubble
      textbubble=createSprite(displayWidth/1.18, displayHeight/5.8,50,50);
      textbubble.addImage("txtbubble",txtbubbleimg)
      textbubble.scale = 0.8;
      textbubble.visible= false;
  
  //Screen Mood Survey

    //White Box/ Text Box
    textbox=createSprite(displayWidth/2,displayHeight/2.6 +100,50,50);
    textbox.addImage("textbox",textboximg);
    textbox.scale = 0.3;
    textbox.visible=false;

    //Input Text
    input2 = createInput();
    input2.position(displayWidth/2.47 -20,displayHeight/3.4 + 50);
    input2.size(displayWidth/5,displayHeight/12);
    input2.style('font-size', '16px');
    input2.value('Welcome Ricky! How are you doing today?');
    input2.hide();
   
      

    input3 = createInput();
    input3.position(displayWidth/2.47,displayHeight/3.4 + 50);
    input3.size(displayWidth/5.4,displayHeight/12);
    input3.style('font-size', '16px');
    input3.value('How do you feel now?');
    input3.hide();

    //Happy Button
    happybutton = createImg('/Images/IconsAvatars/happyface.png');
    happybutton.position(input.x + input.width+ -560,displayHeight/2.35 + 100);
    happybutton.mousePressed(happyClick);
    happybutton.size(displayHeight/7,displayHeight/7);
    happybutton.hide();

    happybutton2 = createImg('/Images/IconsAvatars/happyface.png');
    happybutton2.position(input.x + input.width+ -560,displayHeight/2.35 + 100);
    happybutton2.mousePressed(happyClick2);
    happybutton2.size(displayHeight/7,displayHeight/7);
    happybutton2.hide();
    //Nuetral Button
    neutralbutton = createImg('/Images/IconsAvatars/neutralface.png');
    neutralbutton.position(input.x + input.width+ -325 ,displayHeight/2.35 + 100);
    neutralbutton.mousePressed(neutralClick);
    neutralbutton.size(displayHeight/7,displayHeight/7);
    neutralbutton.hide();

    neutralbutton2 = createImg('/Images/IconsAvatars/neutralface.png');
    neutralbutton2.position(input.x + input.width+ -325 ,displayHeight/2.35 + 100);
    neutralbutton2.mousePressed(neutralClick2);
    neutralbutton2.size(displayHeight/7,displayHeight/7);
    neutralbutton2.hide();

    //Sad Button
    sadbutton = createImg('/Images/IconsAvatars/sadface.png');
    sadbutton.position(input.x + input.width+ -95,displayHeight/2.35 +100);
    sadbutton.mousePressed(sadClick);
    sadbutton.size(displayHeight/7,displayHeight/7);
    sadbutton.hide();

    sadbutton2 = createImg('/Images/IconsAvatars/sadface.png');
    sadbutton2.position(input.x + input.width+ -95,displayHeight/2.35 +100);
    sadbutton2.mousePressed(sadClick2);
    sadbutton2.size(displayHeight/7,displayHeight/7);
    sadbutton2.hide();

    //Continue Button
    continuebutton = createImg('/Images/Misc/continue.png');
    continuebutton.position(input.x + input.width+ -415 + 30 ,displayHeight/2.35 +245);
    continuebutton.mousePressed(newScreen);
    continuebutton.size(displayWidth/6,displayHeight/8);
    continuebutton.hide();

  //Screen Create Pic Array

    //Webcam Video
    WebcamVideo = createCapture(VIDEO);
    WebcamVideo.size(560,480);
    WebcamVideo.hide();

    WebcamVideo2 = createCapture(VIDEO);
    WebcamVideo2.size(230,210);
    WebcamVideo2.hide();

    //Take Photo Button
    SnapPhotoButton = createImg('/Images/Misc/camera.png');
    SnapPhotoButton.position (displayWidth/2 - 70, 675 );
    SnapPhotoButton.size(150,150);
    SnapPhotoButton.mousePressed(takePicture);
    SnapPhotoButton.hide(); 

    //YMCA Video
    danceVideo = createVideo('/Images/Misc/ymcaresize.mp4');
    danceVideo.hide();

    /*//Prompt to tell which Letter to Pose
    letterPrompt = createInput();
    letterPrompt.position(displayWidth/3,displayHeight/2.5);
    letterPrompt.size(displayWidth/3,displayHeight/13);
    letterPrompt.style('font-size', '20px');
    letterPrompt.hide();*/

    //Button to go to next screen
    NextScreenButton = createImg('/Images/Misc/dancebutton.png');
    NextScreenButton.position(displayWidth/2 - 70, 690 );
    NextScreenButton.size(150,150);
    NextScreenButton.mousePressed(newScreen);
    NextScreenButton.hide();

  //Screen Dance

    //Highlight Letter Border
    yellowBoxBorder=createSprite(displayWidth - 140 ,displayHeight/5 + 30,50,50);
    yellowBoxBorder.addImage("yellowBoxBorder",yellowBoxBorderimg);
    yellowBoxBorder.scale = 0.45;
    yellowBoxBorder.visible = false; 
    console.log(frameRate);

    //setInterval(timeIt, 1000);

  //Screen playAgain
    ReplayButton = createButton('Play Again');
    ReplayButton.position(input.x + input.width+ -585 ,displayHeight/2.35 +225);
    ReplayButton.mousePressed(goBack);
    ReplayButton.hide();

    

    
    ReturnVillageButton = createButton('Return to Village');
    ReturnVillageButton.position(input.x + input.width+ -185 ,displayHeight/2.35 +225);
    ReturnVillageButton.mousePressed(returnToVillage);
    ReturnVillageButton.hide();

    

    
}

function newScreen(){
   gameState += 1;
}
function returnToVillage(){
  gameState = 1;
  PictureArray = [];
  octo.x = displayWidth/19;
  octo.y = displayHeight/1.64 + 5;
  input2.value('Welcome Ricky! How are you doing today?');
  input2.size(displayWidth/5,displayHeight/12);
  bagcoins.visible = false;

}

function draw() {
  background(80);
  if(gameState == 0){
    enterName();
  } else if(gameState == 1 ){
    village();
  }else if(gameState == 2){
    moodSurvey();
  }else if(gameState == 3){
    createPicArray();
  }else if(gameState == 4){
    dance();
  }
  else if(gameState ==5){
    moodSurvey2();
  }
  else if (gameState == 6){
    playAgain();
  }
  else if (gameState == 7){
    gameState = 1;
  }
}

function enterName() {
  goldie.visible = true;
  background(ocean);
  input.show();
  button.show();
  drawSprites();
  fill(255,235,100);
  textSize(55);
  text("Goldfish Instructor", displayWidth/2,100);
 
}

function village(){
  goldie.visible = true;
  ReplayButton.hide();
  ReturnVillageButton.hide();
  input.hide();
  button.hide();
  octostill.visible=false;
  octo.visible=true;
  background(villageimg); 
  goldie.x= displayWidth/1.05 -30;
  goldie.y= displayHeight/12.5 + 10;
  goldie.scale = 0.18;
  textbubble.visible= true;
  textbox.visible = false;
  input2.hide();
  happybutton.hide();
  neutralbutton.hide();
  sadbutton.hide();
  if (keyWentDown("enter")) {
    console.log("key pressed");
    console.log(octo.x +","+ octo.y);
    octo.velocityY = 0;
    octo.velocityX = 7;
  }
  if (octo.x > displayWidth/1.7){
    octo.velocityY = -7;
    octo.velocityX = 0;
  }
  if (octo.y < displayHeight/2.5){
    octo.velocityY = 0;
    octo.velocityX = 0;
    gameState= 2;
  }
  drawSprites();
}

function moodSurvey(){
  goldie.visible = true;

  NextScreenButton.hide();
  danceVideo.stop();
  background(beach1);
  textbox.visible = true;
  input2.show();
  happybutton.show();
  neutralbutton.show();
  sadbutton.show();
  
  octo.visible=false;
  textbubble.visible= false;

  goldie.x= displayWidth/2;
  goldie.y = displayHeight/2;
  goldie.scale = 0.2;
  drawSprites();
}

/*function videointro(){
  background(beach1);
  cto.visible = false;
  textbubble.visible=false;
  goldie.visible = false;
  
  input2.hide();
  happybutton.hide();
  neutralbutton.hide();
  sadbutton.hide();
  text("Now Let's Set Up Your Lve Video")
  drawSprites();

}*/

function createPicArray(){
  goldie.visible = true;
  background(beach1);
  octo.visible = false;
  textbubble.visible=false;
  goldie.visible = false;
  textbox.visible = false;
  input2.hide();
  happybutton.hide();
  neutralbutton.hide();
  sadbutton.hide();
  continuebutton.hide();
  NextScreenButton.hide();
  SnapPhotoButton.show();
  var pWidth = 100;
  var pHeight = 80;
  var picX= 150;
  var picY = 100;


  //WebcamVideo.size(560,480);
  WebcamVideo.loadPixels();
  image(WebcamVideo,displayWidth/2 - 280,displayHeight/2 -240); 
 
  //letterPrompt.show();
    for(var i = 0 ; i<PictureArray.length;  i++){
      //letterPrompt.value(ymcaLetter[i]);
      //if(PictureArray.length < 5){
        image(PictureArray[i], picX,picY,pWidth+70,pHeight+40)
        picY = picY + pHeight +125;
        //letter += 1
      //} 
    }
  if(PictureArray.length >= 4){
    NextScreenButton.show();
    SnapPhotoButton.hide();
  }
    goldie.x= displayWidth/2;
    goldie.y = displayHeight/2;
    goldie.scale = 0.2;
 
  drawSprites();
  fill(255,235,100);
  textSize(48);
  text("Super! Let's Take Pictures of Your Y M C A Moves", displayWidth/2, 75);

  fill(255,165,0);
  textSize(100);
  text("Y", 70,200);
  text("M", 70,400);
  text("C", 70,600);
  text("A", 70,800);


}




function dance(){
  //continuebutton.hide();
  continuebutton.position(input.x + input.width+ -415 + 30 ,displayHeight/2.35 +340);
  continuebutton.x = 
  NextScreenButton.show()
  textbox.visible = false;
  input2.hide();
  happybutton.hide();
  neutralbutton.hide();
  sadbutton.hide();
  ReplayButton.hide();
  ReturnVillageButton.hide();
  if(!startSong) {
    startSong = Date.now();
  }
  //startSong = Date.now();
  yellowBoxBorder.visible = false;
  NextScreenButton.hide();
  SnapPhotoButton.hide();
  background(beachTheater);
  WebcamVideo2.loadPixels();
  
  image(WebcamVideo2,5, displayHeight/2 - 100 ); 
  if (frameCount % 12 == 0) { 
    timer ++;
  }
  var pWidth = 100;
  var pHeight = 70;
  var picX= displayWidth - 220;
  var picY = 0.13*displayHeight;
  for(var i = 0 ; i<PictureArray.length;  i++){
    //if(PictureArray.length < 5){
      image(PictureArray[i], picX,picY, pWidth+70, pHeight+40)
      picY = picY + pHeight + 100;
    //}
  }
  var ymca = image(danceVideo, 0.2*displayWidth ,0.2*displayHeight );
  danceVideo.loop();
  WebcamVideo2.loadPixels();
  console.log(startSong);
  
  
  
  
  if ((45520 < Date.now()-startSong && Date.now()-startSong <= 45820) 
  || (109500 < Date.now()-startSong && Date.now()-startSong <= 109800) 
  || (173500 < Date.now()-startSong && Date.now()-startSong <= 173800) 
  || (203700 < Date.now()-startSong && Date.now()-startSong <= 204000)){
    
    chstart = null;
    if(!chstart) {
      chstart = Date.now();
    }

  }

  now = Date.now()-chstart;

  	if ((0<now && now <= 980) || (3760 < now && now <= 4720)
    || (15020 < now && now <= 15970) || (18790 < now && now <= 19730)){
        yellowBoxBorder.y = displayHeight/5 ;
        yellowBoxBorder.visible = true;
    } else if ((980 < now && now <= 1220) || (4720 < now && now <= 5060)
    || (15970 < now && now <= 16350) || (19730 < now && now <= 20060)){
			  yellowBoxBorder.y = displayHeight/5 + 170;
        yellowBoxBorder.visible = true;
    } else if ((1220 < now && now <= 1620) || (5060 < now && now <= 5350)
    || (16350 < now && now <= 16580) || (20060 < now && now <= 20390)){
        yellowBoxBorder.y = displayHeight/5  + 170 + 170;
        yellowBoxBorder.visible = true;
    } else if ((1620 < now && now <= 2620) || (5350 < now && now <= 6350)||
        (16580 < now && now <= 17580) || (20390 < now && now <= 21390)){
			  yellowBoxBorder.y = displayHeight/5  + 3*170;
        yellowBoxBorder.visible = true;
    } else {
			  yellowBoxBorder.visible = false;
    }

    if(now >= 23000){
      continuebutton.show();

    }else{
      continuebutton.hide();
    }

  drawSprites();
}

function moodSurvey2(){
 
  continuebutton.position(input.x + input.width+ -415 + 30 ,displayHeight/2.35 + 245);
//continuebutton.hide();
  input2.hide();
  happybutton.hide();
  neutralbutton.hide();
  sadbutton.hide();
  
  ReplayButton.hide();
  ReturnVillageButton.hide();
  NextScreenButton.hide();
  danceVideo.stop();
  background(beach1);
  textbox.visible = true;
  input3.show();
 
  happybutton2.show();
  neutralbutton2.show();
  sadbutton2.show();
  goldie.x= displayWidth/2;
  goldie.y = displayHeight/2;
  goldie.scale = 0.2;
  octo.visible=false;
  textbubble.visible= false;
  drawSprites();
}
function playAgain(){
  bagcoins.visible = true;
  background(coins);
  input3.hide();
  happybutton2.hide();
  neutralbutton2.hide();
  sadbutton2.hide();
  continuebutton.hide();
  ReplayButton.show();
  ReturnVillageButton.show();
  textbox.visible =false; 
  fill(255,165,0);
  textSize(100);
  text("Y", 70,200);
  text("M", 70,400);
  text("C", 70,600);
  text("A", 70,800);
  var pWidth = 100;
  var pHeight = 80;
  var picX= 150;
  var picY = 100;
  for(var i = 0 ; i<PictureArray.length;  i++){
      image(PictureArray[i], picX,picY,pWidth+70,pHeight+40);
      picY = picY + pHeight +125;
  }

  input3.value('How do you feel now?');
  drawSprites();
  fill(255,235,255);
    textSize(55);
  text("You Did It!", displayWidth/2, 100);
  text("Congratulations!", displayWidth/2, 200);
  text("Here Are Your Goldie Coins!", displayWidth/2, 300);
}



function goBack(){
  gameState =4;
  bagcoins.visible = false;
}








function takePicture(){
   //image(WebcamVideo,400,540);
   WebcamVideo.loadPixels()
   PictureArray.push(WebcamVideo.get());
 }

 function happyClick(){
  input2.value("   Good To Hear! Click the continue button to move to the Dance Game");
  input2.size(displayWidth/3,displayHeight/12);
  input2.position(displayWidth/2 - (input2.width /2) ,displayHeight/3.4 + 50);
  sadbutton.attribute('disabled', '');
  neutralbutton.attribute('disabled','');
  continuebutton.show();
}
function neutralClick(){
  input2.value("  Let's Have Some Fun! Click the continue button to move to the Dance Game");
  input2.size(displayWidth/2.7,displayHeight/12);
  input2.position(displayWidth/2 - (input2.width /2) ,displayHeight/3.4 + 50);
  sadbutton.attribute('disabled', '');
  happybutton.attribute('disabled','');
  continuebutton.show();
}
function sadClick(){
  input2.value("    Lets Fix That! Click the continue button to move to the Dance Game");
  input2.size(displayWidth/3,displayHeight/12);
  input2.position(displayWidth/2 - (input2.width /2) ,displayHeight/3.4 + 50);
  happybutton.attribute('disabled','');
  neutralbutton.attribute('disabled','');
  continuebutton.show();
}

function happyClick2(){
  input3.value("Awesome!");
  input3.size(displayWidth/14,displayHeight/12);
  input3.position(displayWidth/2 - (input3.width /2) ,displayHeight/3.4 + 50);
  sadbutton.attribute('disabled', '');
  neutralbutton.attribute('disabled','');
  continuebutton.show();

}
function neutralClick2(){
  input3.value("That's OK");
  input3.position(displayWidth/2 - (input3.width /2) ,displayHeight/3.4 + 50);
  input3.size(displayWidth/7.7,displayHeight/12);
  sadbutton.attribute('disabled', '');
  happybutton.attribute('disabled','');
  continuebutton.show();
}
function sadClick2(){
  input3.value("Maybe you should try again!");
  input3.position(displayWidth/2 - (input3.width /2) ,displayHeight/3.4 + 50) ;
  input3.size(displayWidth/15,displayHeight/12);
  happybutton.attribute('disabled','');
  neutralbutton.attribute('disabled','');
  continuebutton.show();
}



