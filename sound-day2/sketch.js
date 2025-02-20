let startContext, samples, sampler, buton1, button2, delTimeSlider, feedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(5).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5;

function preload() {
  // sampler = new Tone.Player("media/cat.mp3").toDestination()
  samples = new Tone.Players({
    cat: "media/cat.mp3",
    seagull: "media/seagulls.mp3"
  }).connect(del)
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext)
  button1 = createButton("Play Cat Sample");
  button1.position(10, 30);
  button2 = createButton("Play Seagull Sample");
  button2.position(200, 30);
  button1.mousePressed(() => {samples.player("cat").start()})
  button2.mousePressed(() => {samples.player("seagull").start()})
  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 100);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 200);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(), 15, 90);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 90);
  text("Distortion Amount: " + distSlider.value(), 15, 190);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 190)
}

// function playSample() {
//   sampler.start()
// }

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}