let basicSynth, filt, LFOfilt, panner, fmSynth, values, noise1, noiseEnv, filt1, values1;

function setup() {
  createCanvas(400, 400);
  panner = new Tone.AutoPanner({
    frequency: 0.1,
    depth: 1
  }).toDestination().start()
  filt = new Tone.Filter(300, "lowpass", -48).connect(panner);
  basicSynth = new Tone.Synth().connect(filt);
  LFOfilt = new Tone.LFO(0.1, 200, 2000).start();
  LFOfilt.connect(filt.frequency);
  fmSynth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10
  }).toDestination();
  values = new Float32Array([1, 0.02, 0.3, 15, 15, 0.3, 1]);
  filt1 = new Tone.AutoFilter({
    frequency: 0.1,
    depth: 0.3,
    baseFrequency: 500,
    octaves: 4
  }).toDestination().start();
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 3,
    decay: 0.1,
    sustain: 1,
    release: 1
  }).connect(filt1)
  noise1 = new Tone.Noise().connect(noiseEnv).start();
  values1 = new Float32Array([-96, -30, -30, -12, 0, -12, 0, 0, -6, -12, -30, -96])
}

function draw() {
  background(220);
}

function mouseClicked() {
  // basicSynth.triggerAttackRelease(random(200, 400), 10);
  // basicSynth.frequency.rampTo(random(400, 800), 10);
  // LFOfilt.frequency.value = random(0.1, 5)
  // LFOfilt.frequency.rampTo(random(20, 60), 10);
//   fmSynth.harmonicity.value = 1;
//   fmSynth.triggerAttackRelease(random(200, 400), 10);
//  // fmSynth.harmonicity.setValueAtTime(random(0.1, 0.5), "+2.5");
//   fmSynth.harmonicity.setValueCurveAtTime(values, Tone.now(), 10)
}

function keyPressed() {
  if (key === "a") {
    noiseEnv.triggerAttackRelease(30);
    noise1.volume.setValueCurveAtTime(values1, Tone.now(), 30)
    console.log('testing')
  }
}