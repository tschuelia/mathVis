var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

var digitsTxt = "14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295";
var digits = digitsTxt.split("");
var radius = 300;
var offset = 400;
var baseHeight = 10;
var baseWidth = 10;

let circumference = 2 * Math.PI * radius;
let padding = 0.05 * circumference;

var xValues = [];
var yValues = [];

var colors = ["Green", "DarkOliveGreen", "Blue", "DarkBlue", "MediumTurquoise", "DarkTurquoise",
              "Orchid", "RebeccaPurple", "DarkOrange", "Orange"];

var occurrenceCount = [];

// counts the number of occurences of each digit
for (i = 0; i < 10; i++) {
  var digit = new RegExp(i, 'g');
  occurrenceCount[i] = digitsTxt.match(digit).length;
}

// draws digit bases
for (i = 0; i < 10; i++) {
  context.fillStyle = colors[i];
  var angle = 1 / 5 * Math.PI;
  var x = Math.cos(i * angle) * radius + offset;
  var y = Math.sin(i * angle) * radius + offset;
  xValues[i] = x
  yValues[i] = y
}

let drawingOffsetDefaultAngles = [];

for (i = 0; i < 10; i++) {
  drawingRange = 1 / 5 * Math.PI;
  drawingOffsetDefaultAngles[i] = drawingRange / occurrenceCount[i];
}

var drawingOffsetCurrentAngles = drawingOffsetDefaultAngles.slice();

var prev;
var curr = digits[0];
for (i = 1; i < digits.length; i++) {
  prev = curr;
  curr = digits[i];
  drawLine(prev, curr);
}

function drawLine(start, end) {
  var gradient = context.createLinearGradient(xValues[start], yValues[start], xValues[end], yValues[end]);
  gradient.addColorStop(0, colors[start]);
  gradient.addColorStop(1, colors[end]);

  context.strokeStyle = gradient
  context.beginPath();
  context.moveTo(xValues[start], yValues[start]);
  context.lineTo(xValues[end], yValues[end]);
  context.stroke();
  updateCoordinates(start, end);
}

function updateCoordinates(start, end) {
  var angle = 1 / 5 * Math.PI;
  var xStart = Math.cos(start * angle + drawingOffsetCurrentAngles[start]) * radius + offset;
  var yStart = Math.sin(start * angle + drawingOffsetCurrentAngles[start]) * radius + offset;
  xValues[start] = xStart;
  yValues[start] = yStart;

  drawingOffsetCurrentAngles[start] += drawingOffsetDefaultAngles[start];
}
