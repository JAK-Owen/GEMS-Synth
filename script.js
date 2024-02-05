const key = {
  cMinor: ["c2", "d#2", "g2", "c3", "d#3", "g3", "c4", "d#4", "g4"],
  cSharpMinor: ["c#2", "e2", "g#2", "c#3", "e3", "g#3", "c#4", "e4", "g#4"],
  dMinor: ["d2", "f2", "a2", "d3", "f3", "a3", "d4", "f4", "a4"],
  dSharpMinor: ["d#2", "f#2", "a#2", "d#3", "f#3", "a#3", "d#4", "f#4"],
  eMinor: ["e2", "g2", "b2", "e3", "g3", "b3", "e4", "g4", "b4"],
  fMinor: ["f2", "g#2", "c2", "c#2", "f3", "g#3", "c3", "f4", "g#4", "c4"],
  fSharpMinor: ["f#2", "a2", "c#2", "f#3", "a3", "c#3", "f#4", "a4", "c#4"],
  gMinor: ["g2", "a#2", "d2", "g3", "a#3", "d3", "g4", "a#4", "d4"],
  gSharpMinor: ["g#2", "b2", "d#2", "g#3", "b3", "d#3", "g#4", "b4", "d#4"],
  aMinor: ["a2", "c2", "e2", "a3", "c3", "e3", "a4", "c4", "e4"],
  aSharpMinor: ["a#2", "c#2", "e#2", "a#3", "c#3", "e#3", "a#4", "c#4", "e#4"],
  bMinor: ["b2", "d2", "f#2", "b3", "d3", "f#3", "b4", "d4", "f#4"]
};

window.keyChange = function () {
  console.log("selected key" + selectedKey);
  console.log("key" + key);

  currentKey = document.getElementById("assignKey").value;
  selectedKey = key[currentKey];
  console.log("selected key HAS THE KEY CHANGED  " + selectedKey);

  console.log(selectedKey);
};

let currentKey = "dSharpMinor";
let selectedKey = key[currentKey];

const keyPads = {
  cMinor: ["c3", "d3", "d#3", "f3", "g3", "g#3", "a#3", "c4"],
  cSharpMinor: ["c#3", "d#3", "e3", "f#3", "g#3", "a3", "b3", "c#4"],
  dMinor: ["d3", "e3", "f3", "g3", "a3", "a#3", "c3", "d4"],
  dSharpMinor: ["d#4", "e#4", "f#4", "g#4", "a#4", "b4", "c#5", "d#5"],
  eMinor: ["e3", "f#3", "g3", "a3", "b3", "c3", "d3", "e4"],
  fMinor: ["f3", "g3", "g#3", "a#3", "c3", "c#3", "d#3", "f4"],
  fSharpMinor: ["f#3", "g#3", "a3", "b3", "c#3", "d3", "e3", "f#4"],
  gMinor: ["g3", "a3", "a#3", "c3", "d3", "d#3", "f3", "g4"],
  gSharpMinor: ["g#3", "a#3", "b3", "c#3", "d#3", "e3", "f#3", "g#4"],
  aMinor: ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "a4"],
  aSharpMinor: ["a#3", "b#3", "c#3", "d#3", "e#3", "f#3", "g#3", "a#4"],
  bMinor: ["b3", "c#3", "d3", "e3", "f#3", "g3", "a3", "b4"]
};

const waveforms = {
  sine: "sine",
  triangle: "triangle",
  square: "square",
  saw: "sawtooth"
};

const durations = {
  16: "16m",
  8: "8m",
  4: "4m",
  2: "2m",
  1: "1m",
  "1/4": "1n",
  "2/4": "2n",
  "4/4": "4n",
  "8/4": "8n",
  "16/4": "16n",
  "32/4": "32n",
  "64/4": "64n"
};

const scale = selectedKey;
const scalePads = keyPads.dSharpMinor;
const wave = waveforms.saw;
const noteDuration = durations[16];
const noteDurationPads = durations[16];

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 4,
  decay: 16,
  sustain: 1,
  release: 16
}).toDestination();

const volume = new Tone.Volume(-Infinity).connect(ampEnv);

const LPfilter = new Tone.Filter(10000, "lowpass").connect(volume);

const reverb = new Tone.Reverb(10).connect(LPfilter);

const delay = new Tone.FeedbackDelay("1m.", 0.5).connect(reverb);

const synth1 = new Tone.MonoSynth({
  volume: -8,
  oscillator: {
    type: wave
  },
  envelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  },
  filterEnvelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  }
});

synth1.connect(delay);

const pattern1 = scale;

let index1 = 0;

Tone.Transport.scheduleRepeat((time) => {
  repeat(synth1, pattern1, time);
}, noteDuration);

function repeat(synth, pattern, time) {
  let note = pattern[Math.floor(Math.random() * pattern.length)];
  synth.triggerAttackRelease(note, noteDuration, time);
  ampEnv.triggerAttackRelease(noteDuration);
  index1++;
}

const synth2 = new Tone.MonoSynth({
  volume: -10,
  oscillator: {
    type: wave
  },
  envelope: {
    attack: 0,
    decay: Infinity,
    sustain: 1,
    release: 0
  },
  filterEnvelope: {
    attack: 0,
    decay: Infinity,
    sustain: 1,
    release: 0
  }
});

synth2.connect(delay);

const pattern2 = scale;

let index2 = 0;

Tone.Transport.scheduleRepeat((time) => {
  repeat(synth2, pattern2, time);
}, noteDuration);

function repeat(synth, pattern, time) {
  let note = pattern[Math.floor(Math.random() * pattern.length)];
  synth.triggerAttackRelease(note, noteDuration, time);
  ampEnv.triggerAttackRelease(noteDuration);
  index2++;
}

const synth3 = new Tone.MonoSynth({
  volume: -9,
  oscillator: {
    type: wave
  },
  envelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  },
  filterEnvelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  }
});

synth3.connect(delay);

const pattern3 = scale;

let index3 = 0;

Tone.Transport.scheduleRepeat((time) => {
  repeat(synth3, pattern3, time);
}, noteDuration);

function repeat(synth, pattern, time) {
  let note = pattern[Math.floor(Math.random() * pattern.length)];
  synth.triggerAttackRelease(note, noteDuration, time);
  ampEnv.triggerAttackRelease(noteDuration);
  index3++;
}

const synth4 = new Tone.MonoSynth({
  volume: -10,
  oscillator: {
    type: wave
  },
  envelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  },
  filterEnvelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  }
});

const panner4 = new Tone.Panner(-1).connect(delay);

synth4.connect(panner4);

const pattern4 = scale;

let index4 = 0;

Tone.Transport.scheduleRepeat((time) => {
  repeat(synth4, pattern4, time);
}, noteDuration);

function repeat(synth, pattern, time) {
  let note = pattern[Math.floor(Math.random() * pattern.length)];
  synth.triggerAttackRelease(note, noteDuration, time);
  ampEnv.triggerAttackRelease(noteDuration);
  index4++;
}

const synth5 = new Tone.MonoSynth({
  volume: -10,
  oscillator: {
    type: wave
  },
  envelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  },
  filterEnvelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  }
});

const panner5 = new Tone.Panner(1).connect(delay);

synth5.connect(panner5);

const pattern5 = scale;

let index5 = 0;

Tone.Transport.scheduleRepeat((time) => {
  repeat(synth5, pattern5, time);
}, noteDuration);

function repeat(synth, pattern, time) {
  let note = pattern[Math.floor(Math.random() * pattern.length)];
  synth.triggerAttackRelease(note, noteDuration, time);
  ampEnv.triggerAttackRelease(noteDuration);
  index5++;
}

const synth = new Tone.MonoSynth({
  volume: -6,
  oscillator: {
    type: wave
  },
  envelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  },
  filterEnvelope: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  }
});

synth.connect(delay);

var padContainer = document.createElement("div");
padContainer.className = "pads";
padContainer.id = "padContainer";
document.body.appendChild(padContainer);

for (var i = 0; i < scalePads.length; i++) {
  var newPad = document.createElement("button");
  newPad.id = scalePads[i];
  newPad.className = "pad-1";
  newPad.onclick = PadOnClickHandler;
  document.getElementById("padContainer").appendChild(newPad);
}

function PadOnClickHandler() {
  noteDown(this.id);
  startLoop();
}

function noteDown(note) {
  synth.triggerAttack(note);
  ampEnv.triggerAttack();
  Tone.start();
  startLoop();
}

function noteUp(note) {
  synth.triggerRelease(note);
  ampEnv.triggerRelease();
  Tone.stop();
}

function startLoop() {
  const loop = new Tone.Loop((time) => {}, "1n").start(0);
  Tone.Transport.start();
  setTimeout(function () {
    Tone.Transport.stop();
  }, 100);
}

var oscilloscope = new Nexus.Oscilloscope("#oscilloscope", {
  size: [480, 250]
});

oscilloscope.colorize("accent", "white");
oscilloscope.colorize("fill", "black");
document.body.style.backgroundColor = "#000";

oscilloscope.connect(ampEnv);

const gain = new Nexus.Dial("#gain", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
gain.on("change", function (v) {
  volume.volume.rampTo(v, 0.1);
});
gain.min = -50;
gain.max = 0;
gain.value = -6;
gain.colorize("accent", "white");
gain.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const LPFilter = new Nexus.Dial("#LPFilter", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
LPFilter.on("change", function (v) {
  LPfilter.frequency.rampTo(v, 0.1);
});
LPFilter.min = 20;
LPFilter.max = 10000;
LPFilter.value = 10000;
LPFilter.colorize("accent", "white");
LPFilter.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const verb = new Nexus.Dial("#verb", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
verb.on("change", function (v) {
  reverb.wet.rampTo(v, 0.1);
});
verb.min = 0;
verb.max = 1;
verb.value = 0.2;
verb.colorize("accent", "white");
verb.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const FBDelay = new Nexus.Dial("#FBDelay", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
FBDelay.on("change", function (v) {
  delay.wet.rampTo(v, 0.1);
});
FBDelay.min = 0;
FBDelay.max = 1;
FBDelay.value = 0;
FBDelay.colorize("accent", "white");
FBDelay.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const attackDial = new Nexus.Dial("#attackDial", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
attackDial.on("change", function (v) {
  ampEnv.attack = v;
});
attackDial.min = 0;
attackDial.max = 20;
attackDial.value = 5;
attackDial.colorize("accent", "white");
attackDial.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const decayDial = new Nexus.Dial("#decayDial", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
decayDial.on("change", function (v) {
  ampEnv.decay = v;
});
decayDial.min = 0;
decayDial.max = 20;
decayDial.value = 10;
decayDial.colorize("accent", "white");
decayDial.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const sustainDial = new Nexus.Dial("#sustainDial", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
sustainDial.on("change", function (v) {
  ampEnv.sustain = v;
});
sustainDial.min = 0;
sustainDial.max = 1;
sustainDial.value = 0;
sustainDial.colorize("accent", "white");
sustainDial.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const releaseDial = new Nexus.Dial("#releaseDial", {
  size: [70, 70],
  interaction: "vertical",
  mode: "relative"
});
releaseDial.on("change", function (v) {
  ampEnv.release = v;
});
releaseDial.min = 0;
releaseDial.max = 20;
releaseDial.value = 0;
releaseDial.colorize("accent", "white");
releaseDial.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

function NewPAD5(vel) {}
