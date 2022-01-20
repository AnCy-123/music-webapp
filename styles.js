function setup() 
{
    canvas =  createCanvas(450, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);//C128 ml5.imageClassifier
    poseNet.on('pose', gotPoses);
}

song = "";

function preload()
{
    song = loadSound("cradl.mp3");
    
}

function play()
{
    song.play();//C127
    song.setVolume(1);//C128 /* 0 to 1*/
    song.rate(1);/* 0.5 to 2.5*/
}

function modelLoaded() 
{
    console.log('PoseNet Is Initialized');
}

/*Score means the confidence that a body part has been detected OR a body part is in
front of the webcam. So whenever a score is greater than 0.2, it means the body part has
been detected OR a body part is in front of the webcam*/

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;



function draw() {
    image(video, 0, 0, 600, 500);// C127
    fill("blah");
    stroke("black");
    if (scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY, 20);
        innumberleftWristY=Number(leftWristY);
        removeDecimals=floor(innumberleftWristY);
        volume=removeDecimals/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        song.setVolume(volume);
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20)
        if (rightWristY > 0 & rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        if (rightWristY > 100 & rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        if (rightWristY > 200 & rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if (rightWristY > 300 & rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        if (rightWristY > 400 & rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}



function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);//C128
    
    
    rightWristX = results[0].pose.rightWrist.x;//C128
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

    leftWristX = results[0].pose.leftWrist.x;//C128
    leftWristY = results[0].pose.leftWrist.y;//C128
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
     scoreRightWrist=results[0].pose.keypoints[10].score;
     scoreLeftWrist=results[0].pose.keypoints[9].score; 
  }
}

scoreRightWrist = 0;
scoreLeftWrist = 0;