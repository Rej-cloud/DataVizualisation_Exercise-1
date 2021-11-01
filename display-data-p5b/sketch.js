console.log('Loading data...');

let table;

const canvasWidth = window.innerWidth;
const canvasHeight = 1300; // ⚠️ size limit if too long
const xPosAxis1 = 200; // px
const xPosAxis2 = 200; // px
const yPosAxis1 = 20; // px


// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  const barMargin = 10;
  const barHeight = 30;

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');

    position = i*100 +100;
    durchmesser = convertDegreesToDurchmesser(meanTemp);
    durchmesser2 = convertDegreesToDurchmesser(futureMeanTemp);

    futurePosition = i*100 +100;
    drawTempFuture(futurePosition);
    drawLabelFuture(futurePosition, city, futureMeanTemp);

    drawTempToday(position);
    drawLabelToday(position, city, meanTemp);

    
  }

  // drawAxes();
  // drawAxesLabels();
}

function convertDegreesToDurchmesser(temp) {
const durchmesser = map(temp, 0, 30, 10, 160);
return durchmesser;
}


function convertDegreesToDurchmesser2(temp) {
  const durchmesser2 = map(temp, 0, 30, 10, 160);
  return durchmesser2;
  }

// the two temp drawing functions could also be combined into a single function
// adding the x-position as a new parameter. For simplicity we have two functions
function drawTempToday(pos) {
  fill('blue');
  circle(xPosAxis1, pos, durchmesser);
}

function drawTempFuture(pos) {
  fill('red');
  noStroke();
  circle(xPosAxis2, pos, durchmesser2);
}

function drawLabelToday(pos, city, temp) {
  fill('black');
  stroke(255);
  const label = `${city}: ${temp}°C`;
  text(label, xPosAxis1 + 100, pos + 5);
}

function drawLabelFuture(pos, city, temp) {
  fill('red');
  const label = `${temp}°C`;
  text(label, xPosAxis2 + 300, pos + 5);
}

