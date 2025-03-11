let synth1, part1, seq1, part2, part3, filt

function setup() {
  createCanvas(400, 400);
  filt = new Tone.Filter(1500, "lowpass").toDestination()
  synth1 = new Tone.PolySynth(Tone.Synth).connect(filt);
  part1 = new Tone.Part(((time, note) => {
    synth1.triggerAttackRelease(note, "4n", time);
  }), [
    [0, ["C3", "E3", "G3"]],
    ["0:2:1", "F3"],
    ["1:0", "A3"]
  ]);
  Tone.Transport.start();
  Tone.Transport.bpm.value = 80;
  part1.loop = true;
  part1.loopEnd = "2m";
  seq1 = new Tone.Sequence(((time, note) => {
    synth1.triggerAttackRelease(note, "4n", time);
  }), ["A4", "B4", ["C5", "D5", "E5"], "A4"]);
  part2 = new Tone.Part(((time, value) => {
    synth1.triggerAttackRelease(value.note, value.duration, time);
  }), [
    {time: 0, note: ["D4", "F4", "A4"], duration: "8n"},
    {time: "0:1", note: ["D4", "G4", "B4"], duration: "4n"},
    {time: "0:3", note: ["C#4", "E4", "A4"], duration: "2n"},
    {time: "1:3", note: "A4", duration: "16t"},
    {time: "1:3:1.33", note: "C5", duration: "16t"},
    {time: "1:3:2.67", note: "B4", duration: "16t"}
  ])
  part2.loop = true;
  part2.loopEnd = "2m";
  part3 = new Tone.Part(((time, value) => {
    filt.frequency.rampTo(value.freq, value.rampTime, time);
  }), [
    {time: 0, freq: 300, rampTime: 1}
  ])
}

function draw() {
  background(220);
}

function keyPressed() {
  if (key === "a") {
    part1.start(Tone.now());
  } else if (key === "s") {
    seq1.start(Tone.now())
  } else if (key === "q") {
    Tone.Transport.bpm.rampTo(180, 5);
  } else if (key === "d") {
    part2.start(Tone.now())
  }
}

function keyReleased() {
  if (key === "a") {
    part1.stop()
  } else if (key === "s") {
    seq1.stop()
  } else if (key === "d") {
    part2.stop()
  }
}

function mousePressed() {
 Tone.start()
}