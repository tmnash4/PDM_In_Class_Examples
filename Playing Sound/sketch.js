let bells;
let bellsPlaying = false;
let playSample1

function preload() {
   bells = new Tone.Player("media/FamilyFeud.mp3").toDestination();
}

function setup() {
  createCanvas(400, 400);
  let startAudioButton = createButton("startAudio");
  startAudioButton.mouseClicked(startAudio)
  startAudioButton.position(0,0)
  playSample1 = createButton("Play Sample 1")
  playSample1.position(100, 0)
  playSample1.mouseClicked(playSample)
}

function draw() {
  background(220);
}

function startAudio() {
  Tone.start().then(() => {
    console.log("Tone has started")
  })
}

function playSample() {
   if (!bellsPlaying) {
    playSample1.html("Stop Sample 1")
    bells.start()
    bells.loop = true;
    bellsPlaying = true;
   } else if (bellsPlaying) {
    playSample1.html("Play Sample 1")
    bells.stop()
    bellsPlaying = false;
   }
}

