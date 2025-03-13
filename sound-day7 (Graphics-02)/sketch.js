let x=150,y=150, button, part1, synth1, seq1, synth2, noise1, filt, noiseEnv, centerFreq, panner, gain1;
let dragging = false;

function setup() {
  createCanvas(400, 400);
  button = createElement("button", "Start Audio");
  button.position(0, 0);
  button.mousePressed(() => {
    if (Tone.context.state !== "running") {
      Tone.start().then(() => {
        console.log("Context has started");
        Tone.Transport.start()
      })
    } else {
      Tone.Transport.start();
    }
  });
  Tone.Transport.timeSignature = [3, 4];
  Tone.Transport.bpm = 80;
  synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
  synth2 = new Tone.Synth().toDestination();
  part1 = new Tone.Part(((time, value) => {
    synth1.triggerAttackRelease(value.note, value.dur, time);
  }),
  [
    {time: 0, note: "C3", dur: "4n"},
    {time: "0:1", note: ["E4", "G4"], dur: "16n"},
    {time: "0:2", note: ["E4", "G4"], dur: "16n"}, //end of measure 1
    {time: "1:0", note: "C3", dur: "4n"},
    {time: "1:1", note: ["E4", "G4"], dur: "16n"},
    {time: "1:2", note: ["E4", "G4"], dur: "16n"},
    {time: "2:0", note: "F3", dur: "4n"},
    {time: "2:1", note: ["A4", "C4"], dur: "16n"},
    {time: "2:2", note: ["A4", "C4"], dur: "16n"},
    {time: "3:0", note: "G3", dur: "4n"},
    {time: "3:1", note: ["B4", "D4"], dur: "16n"},
    {time: "3:2", note: ["B4", "D4"], dur: "16n"},
  ]
).start();
part1.loop = true;
part1.loopEnd = "4m";
seq1 = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, [null, "C6", null, ["C6", "B5"], ["A5", "G5"], null, null, "A6", "G6", "F6", "E6", "D6", null, "D#6", [null, "B6"], ["A6", "G6"], [null, ["B6", "C7", "B6"]], ["A6", "G6"], ["D7", "C7", "B6", "A6"], "G6", null, "B5", "C6", "D6"], "4n").start()
gain1 = new Tone.Gain().toDestination()
panner = new Tone.Panner(0).connect(gain1);
noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.3,
  decay: 0.3,
  sustain: 1,
  release: 0.2
}).connect(panner);
centerFreq = map(height / 2, 0, height, 5000, 100, true);
filt = new Tone.Filter(centerFreq, "lowpass").connect(noiseEnv);
noise1 = new Tone.Noise("white").start().connect(filt);
}

function draw() {
  background(220);

if (dragging) {
  fill('purple');
}
else {
  fill(255);
}
square(x,y,100);
if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
  gain1.gain.rampTo(0, 0.1);
} else {
  gain1.gain.rampTo(1, 0.1);
}
}

function mousePressed() {
  console.log("mouse pressed!");
  if (dragging || (mouseX >= x && mouseX <= x + 100 
    && mouseY >= y && mouseY <= y + 100)) {
    dragging = true;
    noiseEnv.triggerAttack();
    Tone.Transport.bpm.rampTo(180, 5);
  }
} 
function mouseDragged() {
  console.log(`mouse position: (${mouseX},${mouseY})`);
  if (dragging) {
    x += mouseX - pmouseX;
    y += mouseY - pmouseY;
  }
  let freq = map(mouseY, 0, height, 5000, 100, true);
  filt.frequency.value = freq;
  let panVal = map(mouseX, 0, width, -1, 1, true);
  panner.pan.value = panVal;
}

function mouseReleased() {
  if (dragging) {
    noiseEnv.triggerRelease();
    Tone.Transport.bpm.rampTo(80, 5);
  }
  dragging = false;
}