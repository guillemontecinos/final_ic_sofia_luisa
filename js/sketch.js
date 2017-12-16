//ICM Final by Sofía Suazo. Nov-Dec 2017.
//"Motionless humans of late capitalism: A 2017 revision of Muybridge’s photographic movement studies'
//Website to get consent to participate in a media art project (running locally for now)
//If user agrees, they allow the site to take snapshots of them while using a computer
//The snapshots are arrange in a muybridge-like grid with information of user and action.
//The muybridge sketch is saved and printed to be part of a photobook of the project.

//TO DO'S:
//CONDITION "START RECORDING BUTTON" : ONLY FUNCTIONS WHEN FIELDS HAVE BEEN FILLED.
//WEBCAM SHOULD WORK WITHOUT HAVING TAB OPEN.
//EVERYTHING IN DRAW MUST BE INVISIBLE TO USER.
//SKIP SAVE IMAGE DIALOG.
//DONE -> AFTER SAVING IMAGE IT SHOULD AUTOREFRESH EVERYTHING.


//snapshots global variables
let webcam; //sets up webcam
let webcamOn = true; // toggle to turn on and off webcam
let snapshots= []; // array to store webcam snapshots
let shooting = true; // toggle to enable or disable snapshoting

//website global variables
let displayAllQuestions; //variable to display all the questions after getting agreement to participate.
let anonymousCheckbox; //variable for staying as anonymous
let optionCountry; //variable to store countrie
let title; //variable for title of website
let subtitle; //variable for subtitle of website
let descriptionProject; // variable for description of project
let inputName; //variable for name of user
let buttonName; //variable to summit name
let questionName;//variable to ask for name
let buttonEmail; //variable to summit email.
let questionEmail; //variable to ask for email.
let selectUse; //variable to select use of computer.
let questionUse; //variable to to ask whats the use of the computer.
let selectPlace; //variable to select place where computer is being use.
let questionPlace; //variable to ask where computer is being use.
let selectTime; // variable to select amount of time computer is being use.
let questionTime; //variable to ask for how much time the computer is being use.
let selectAgree; // variable to check "yes" for agreement.
let selectNotAgree; // variable to check "no" for disagreement.
let questionAgree; // //variable to ask if user agrees or not to participate.

//variables to calculate time of snapshoting
let time;
let timeInterval;
let timeBegin = 0;
let timeFactor = 60*1000; //minutes to millis factor
let timeDivisions = 12;
let currentCapture = 0;

//variables to stop taking snapshots
let isRecording = false;
let photoTaken = false;
let recordingCompleted = false;
let c ;


function setup() {

	webSizeColor(); // calls function that sets up website size and color.
  titleAndInfo(); //calls function for Website title and project information.
  doYouAgree(); //calls function for do you agree or not selection.
	setUpWebcam(); // calls function to set up webcam.
	takeSnap(); // calls function that gets snapshots from the webcam.
  whatsName(); // calls function for name submit input.
  // checkAnonymous(); //calls functions for checking "prefer to be anonymous".
  whatsEmail(); // calls function for email submit input.
  whatsUse(); // calls function for selecting use.
  whatsTime(); // calls function for selecting time.
  whereCountry(); // calls function for selecting country.
  startRecording();
	//redraw();

}

function webSizeColor () { // function for setting up website size and color.
  c = createCanvas (windowWidth, 1500); // website background size.
  background(255); // website background color.
}

function titleAndInfo() {// Sets up Website title and project information
    title = createElement('h2', 'Motionless humans of late capitalism:');
    title.position (10,10);
    subtitle = createElement('h3', 'A 2017 revision of Muybridge’s photographic movement studies');
    subtitle.position (10,45);
    descriptionProject = createElement('h4', 'Hello. My name is Sofía Suazo. I created this media art project that recreates Eadweard Muybridge’s classic photographic movement studies but in the XXIth century context. By agreeing to participate you will be allowing me to take 12 webcam snapshot of you as you make use of your computer for a determinate action. The photographic result may or may not be part of a photobook that might also be exhibited in an art media show held in New York City. You will be properly notified in either case.')
    descriptionProject.position (10,75);
		}

function doYouAgree(){// Do you agree to participate in this project?
  //General question
  questionAgree  = createElement('h4', 'Do you agree to participate in this project?:');
  questionAgree.position(20, 185);
  //chechbox with text for "yes".
	selectAgree = createCheckbox();
  selectAgree.position(questionAgree.x, questionAgree.y+50);
  textYes = createElement ('h5', 'Yes')
  textYes.position(selectAgree.x+20, selectAgree.y-20);
  selectAgree.changed(changeToAgree);
  //chechbox with text for "no".
  selectNotAgree = createCheckbox();
  selectNotAgree.position(selectAgree.x+50, selectAgree.y);
	textNo = createElement ('h5', 'No');
  textNo.position(selectNotAgree.x+20, selectNotAgree.y-20);
  selectNotAgree.changed(changeToNotAgree);

}

function changeToAgree() {
    if (selectAgree.checked()) {
    displayAllQuestions = true;
    textThanks = createElement('h4', 'Thank you for your time and collaboration!');
  	textThanks.position(selectNotAgree.x+50, selectNotAgree.y-20);
    console.log (displayAllQuestions)
    } else if (selectAgree.checked() && selectNotAgree.checked()){
  	displayAllQuestions = false;
    console.log (displayAllQuestions)
 	 }
}

function changeToNotAgree() {
    if (selectNotAgree.checked()) {
  	displayAllQuestions = false;
    textThanksAnyways = createElement ('h4', 'Thanks anyways!');
    textThanksAnyways.position (selectNotAgree.x+50, selectNotAgree.y-20)
    console.log (displayAllQuestions)
 	 }else{ // NOT GOING TO FALSE IS NO IS PRESSED FIRST AND THEN YES IS PRESS.
  	 console.log (displayAllQuestions);
     displayAllQuestions = false;
   }
  }

function whatsName () { //whats your name submit input

  inputName = createInput();
  inputName.position(20, 300);
  buttonName = createButton('Submit Name');
  buttonName.position(inputName.x + inputName.width+5, inputName.y);
	buttonName.mousePressed(enterInfo);
  questionName  = createElement('h4', 'What is your name? (If you dont want your name to appear please type in "Anonymous")');
  questionName.position(20, inputName.y-50);
}

function enterInfo() {

  //Human Doing Action
  var use = selectUse.value();
  textFont('Times new roman');//text font.
  textStyle(NORMAL);//text style.
  textAlign(CENTER);//text align.
	textSize(21);//text size for title of sketch.
  text("Human "+use+"", 500, 1165);

  //"name" or "anonymous" doing same action during "time", "place" and date.
  // var time = selectTime.value();
  time = selectTime.value();
	var d = day();
  var m = month();
  var y = year();
  // var timeInterval = (time/5);
  timeInterval = time/timeDivisions;
  var country = enterPlace.value();
  textFont('Times new roman');//text font.
  textStyle(NORMAL);//text style.
  textAlign(CENTER);//text align.
  textSize(12);//text size for description#1 of sketch.
  text('"'+inputName.value()+'" '+use+' In Front Of A Computer Screen For '+time+' Minutes In '+country+', '+m+'/'+d+'/'+y+'.' ,500, 1190);//text content & position for descriptio


  //this photographs were taken with a built-in webcamera
	//*add screensize and with that metrics in the back within every x amount time in a x amount of time period.

  textFont('Times new roman');//text font.
  textStyle(NORMAL);//text style.
  textAlign(CENTER);//text align.
  textSize(10); //text size for description#2 of sketch.
  text('This images were taken using a built-in webcamera programmed to take 12 pictures every '+timeInterval+' minutes.', 500, 1210);//text content & position for description#2 o
}

function whatsEmail () {//whats your email input
	inputEmail = createInput();
  inputEmail.position(20, inputName.y+60);
  buttonEmail = createButton('Submit E-mail');
  buttonEmail.position(inputEmail.x + inputEmail.width+5, inputName.y+60);
  questionEmail  = createElement('h4', 'What is your email?');
  questionEmail.position(20, inputName.y+12);
}

function whatsUse () {// what are you using this computer for? selection choice.
  selectUse = createSelect();
  selectUse.position(60, inputEmail.y+60);
  selectUse.option('');
  selectUse.option('Checking E-mails');
  selectUse.option('Loging Into Facebook');
  selectUse.option('Chatting');
  selectUse.option('Videocalling');
  selectUse.option('Tweeting');
  selectUse.option('Instagraming');
  selectUse.option('Reading The News');
  selectUse.option('Watching Netflix');
  selectUse.option('Programming');
  selectUse.option('Watching Porn');
  questionUse  = createElement('h4', 'What are you using this computer for?');
  questionUse.position(20, inputEmail.y+12);
  affirmationUse = createElement('h4', 'I am:');
  affirmationUse.position(22, inputEmail.y+40);
 	selectUse.changed(enterInfo);
  // otherUse = createElement('h4', 'Other:');
  // otherUse.position(22, inputEmail.y+65);
  // otherUseInput = createInput();
  // otherUseInput.position(70,inputEmail.y+82);
  // otherUseInputButton = createButton('Submit');
  // otherUseInputButton.position(205,inputEmail.y+82);
  // otherUseInputButton.mousePressed(enterOtherUse);
  // }

// function selectedUse() {
	// var use = selectUse.value();
	// //background(200);
	// textFont('Times new roman');//text font.
	// textStyle(NORMAL);//text style.
	// textAlign(CENTER);//text align.
	// textSize(21);//text size for title of sketch.
	// text("Human "+use+"", 500, 1165);
  //un boton pa que aparezca esto en el skecth?
// }

// this is happening without mouse being pressed in submit button
//*also need to condition this, either they select or they sumbit.
//and text appears only after that
// function enterOtherUse() {

	// textFont('Times new roman');//text font.
	// textStyle(NORMAL);//text style.
	// textAlign(CENTER);//text align.
	// textSize(21);//text size for title of sketch.
	// text('Human '+otherUseInput.value()+'',500, 1165);

}

function whatsTime () {// For how long are you approximately using this computer for this action? selection choice.
	selectTime = createSelect();
  selectTime.position(20, selectUse.y+65);
	selectTime.option('');//empty selection
  selectTime.option('1');//empty selection
  selectTime.option('5'); // divide everything in 5 : take pics in a minute frame.
  selectTime.option('10'); // take pics in a 2 minute frame
  selectTime.option('15'); //take pics in a 3 minute frame
  selectTime.option('20'); //take pics in a 4 minute frame
  selectTime.option('25'); //take pics in a 5 minute frame
  selectTime.option('30'); //take pics in a 6 minute frame
  selectTime.option('35'); //take pics in a 7 minute frame
  selectTime.option('40'); //take pics in a 8 minute frame
  selectTime.option('45'); //take pics in a 9 minute frame
  selectTime.option('50'); //take pics in a 10 minute frame
  selectTime.option('55'); //take pics in a 15 minute frame
  selectTime.option('60'); //take pics in a 12 minute frame
  selectTime.option('90'); //take pics in a 18 minute frame
  selectTime.option('120'); //take pics in a 24 minute frame
  questionTime  = createElement('h4', 'For how long are you using the computer for this approximately?');
  questionTime.position(20, selectUse.y+20);
	minutesText = createElement('h4', 'minutes.');
  minutesText.position(74, selectUse.y+45);
  selectTime.changed(enterInfo);
}

//redo this with actual list of countries and cityes or google location api.
function whereCountry() {//where is this action taking place? country selection.
	enterPlace = createInput();
	enterPlace.position (20,selectTime.y+60);
	buttonPlace = createButton('Submit Location');
  buttonPlace.position(160, selectTime.y+61);
	buttonPlace.mousePressed(enterInfo);
	questionCountry  = createElement('h4', 'Where is this action taking place?');
	questionCountry.position(20, selectTime.y+12);

	// selectCountry = createSelect();
  // selectCountry.position(20, selectTime.y+60);
  // selectCountry.option('');
  // selectCountry.option('United States');
  // selectCountry.option('United Kingdom');
  // selectCountry.option('Afghanistan')
  // questionCountry  = createElement('h4', 'Where is this action taking place?');
  // questionCountry.position(20, selectTime.y+12);
  // selectCountry.changed(enterInfo);

}

function startRecording() {
  startButton = createButton('Start Recording');
  startButton.position(960, selectTime.y+60);
	startButton.mousePressed(toggleRecording);
	startMessage  = createElement('h4', 'PRESS THIS BUTTON WHEN YOU ARE READY TO START! > ');
	startMessage.position(490, selectTime.y+40);
	//startButton.mousePressed(reset);
	// reset();
}

function toggleRecording() {
  isRecording = true;
  timeBegin = millis();
}

//make start button to activate the draw function.
function draw() {

  if (isRecording == true) {

    grid() //calls function that draws the whole muybridge-like grid and info on it.
    enterInfo(); // esto no se pq no funciona si no esta en draw. name() si funciona.

    //if start button was pressed and time began, then convert everything to millis and do operation to start creating capture.
    if (millis() / (timeInterval * timeFactor) >= currentCapture && currentCapture < timeDivisions){ // timing for snapshoting
      takeSnap();
      currentCapture++;
    }

    // variable for positions of snapshots
    var w = 240;
    var h = 155;
    var x = -460;
    var y = 620;

    //for loop to place snapshot sequentially.
    //its no starting t the begging.
    for (var i = 0; i < snapshots.length; i++) {
      image(snapshots[i], x, y, w, h);
      x = x + w + 10;
      if (x >= 984) {
        x = 40;
        y = y + h + 10;
      }
      if (y > 980) {//trying to stop the array at the snaptshot #12. Working but no efficient.
      shooting = false;
      webcamOn = false; // something to stop the webcam being on, this doesnt work.
			isRecording = false;
			recordingCompleted = true;
			}
    }
  } else if (photoTaken == false && recordingCompleted == true) {
		//let counterPhoto = 1; ** dont need this automatically doesnt overwrite.
		saveCanvas(c, 'motionless', 'jpg');
		photoTaken = true;
		recordingCompleted = false;
		//counterPhoto = counterPhoto + 1 ;
		//console.log ('picture has been render!');
		//console.log ('we are in picture number ', counterPhoto);
		clear();
		reset();
	}

}

function setUpWebcam() {
	if (webcamOn){
  	webcam = createCapture(VIDEO);
  	webcam.size(240, 155);
  	webcam.hide();
    takeSnap();
  	// } else {
  	// webcam.stop();//trying to get webcam to stop recording after 12 snapshots.
		// //need still to create capture even if the website is not on display
		}
	}

function takeSnap() {

  if (shooting = true){
  snapshots.push(webcam.get());
}
}

function grid () {   //sets up grid for muybridge sketch

  fill(223,223,223);
  rect(20, 600,1029, 635);
  fill(0);
  rect(30,610,1009,505); // y edge of this rect is 610 + 505 = 1115

}

function reset(){
	webcamOn = true;
	shooting = true;
	timeBegin = 0;
	timeFactor = 60*1000;
	timeDivisions = 12;
	currentCapture = 0;
	isRecording = false;
	photoTaken = false;
	recordingCompleted = false;
	for (var i = snapshots.length; i > 0 ; i--) {
		snapshots.pop();
	}
	setup();
	// draw();

}
