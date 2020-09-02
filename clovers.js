var margin = { top: 100, right: 100, bottom: 100, left: 100 };
var width = d3.select('body').node().getBoundingClientRect().width;
//var width = 1100;
var height = 600;
var updateTime = 1800;

// definizione dei domini e delle scalature per le variabili del dataset
var xRange = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
var yRange = d3.scaleLinear().domain([0, 100]).range([margin.top, height - margin.bottom]);
var topSxRange = d3.scaleLinear().domain([1, 100]).range([1, 100]);
var topDxRange = d3.scaleLinear().domain([1, 100]).range([1, 100]);
var bottomSxRange = d3.scaleLinear().domain([1, 100]).range([1, 100]);
var bottomDxRange = d3.scaleLinear().domain([1, 100]).range([1, 100]);

// carica i dati del dataset e associo le funzioni ai click destro e sinistro del mouse
d3.json('data/dataset.json')
  .then(function (data) {
    drawClovers(data);
    d3.selectAll('.topSx').on('click', moveXtopSx);
    d3.selectAll('.topDx').on('click', moveXtopDx);
    d3.selectAll('.bottomSx').on('click', moveXbottomSx);
    d3.selectAll('.bottomDx').on('click', moveXbottomDx);
    d3.selectAll('.topSx').on('contextmenu', moveYtopSx);
    d3.selectAll('.topDx').on('contextmenu', moveYtopDx);
    d3.selectAll('.bottomSx').on('contextmenu', moveYbottomSx);
    d3.selectAll('.bottomDx').on('contextmenu', moveYbottomDx);
  })
  .catch(function (error) {
    console.log(error);
  });

//disegno i quadrifogli
function drawClovers(data) {
  for (let i = 0; i < data.length; i++) {
    drawClover([data[i]], i);
  }
}

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

// disegna un singolo quadrifoglio
function drawClover(data, i) {
  let offset = 40
  let clover = svg.append('g')
    .attr('id', 'clover' + i)
    .attr('class', 'clover')
    .attr('x', data[0].x)
    .attr('y', data[0].y)

  //disegno la foglia in alto a sx
  clover.selectAll('clover.topSx')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'topSx')
    .attr('cx', function (d) { return d.x - offset })
    .attr('cy', function (d) { return d.y - offset })
    .attr('r', function (d) { return d.topSx })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')

  //disegno la foglia in alto a destra
  clover.selectAll('clover.topDx')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'topDx')
    .attr('cx', function (d) { return d.x + offset })
    .attr('cy', function (d) { return d.y - offset })
    .attr('r', function (d) { return d.topDx })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')

  //disegno la foglia in basso s sinistra
  clover.selectAll('clover.bottomSx')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'bottomSx')
    .attr('cx', function (d) { return d.x - offset })
    .attr('cy', function (d) { return d.y + offset })
    .attr('r', function (d) { return d.bottomSx })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')

  //diesgno la foglia in basso a destra
  clover.selectAll('clover.bottomDx')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'bottomDx')
    .attr('cx', function (d) { return d.x + offset })
    .attr('cy', function (d) { return d.y + offset })
    .attr('r', function (d) { return d.bottomDx })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')

    //disegno il gambo
  // clover.selectAll('clover.gambo')
  // .data(data)
  // .enter()
  // .append('path')
  // .attr('class', 'gambo')
  // .attr("transform", "rotate(270)")
  // .attr('d', function (d) {
  //   let path = '';
  //   let x1 = data[0].x ; 
  //   let y1 = data[0].y ;
  //   let x2 = -data[0].x ;
  //   path += 'M' + x1  + ' ' + y1 + ' ' + 'h' + x2;
  //   return path;
  // })
  // .style('stroke', '#17921c')
  // .style('stroke-width', 2);
}


   /**********************************************************
    * Gestione degli eventi
    **********************************************************/

  // X e TOPSX
  var moveXtopSx = function () {
    var topSx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let value = topSxRange(topSx);
    let sum = d3.sum([value,value])
    
    // aggiorna la grandezza (x) della foglia in alto a sinistra
    d3.selectAll('.topSx')
      .transition().duration(updateTime)
      .attr('r', sum)

    // aggiorna la posizione x della foglia in alto a sinistra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + value + ',0)');
  }

  // Y e TOPSX
  var moveYtopSx = function () {
    // disabilita il comportamento di default del click destro del mouse
    d3.event.preventDefault();

    var topSx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let value = topSxRange(topSx);
    let sum = d3.sum([value,value])

    //aggiorna la grandezza (y) della foglia in alto a sinistra
    d3.selectAll('.topSx')
      .transition().duration(updateTime)
      .attr('r', sum)

    // aggiorna la posizione y della foglia in alto a sinistra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + '0,' + value + ')');
  }

/*------------------------------------------------------------------------*/

  // X e TOPDX
  var moveXtopDx = function () {
    var topDx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let x = g.attr('x');
    let value = topDxRange(topDx);

    //aggiorna la grandezza (x) della foglia in alto a destra
    d3.selectAll('.topDx')
      .transition().duration(updateTime)
      .attr('r', topDxRange(x));

    // aggiorna la posizione x della foglia in alto a destra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + value + ',0)');
  }

  // Y e TOPDX
  var moveYtopDx = function () {
    // disabilita il comportamento di default del click destro del mouse
    d3.event.preventDefault();

    var topDx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let y = g.attr('y');
    let value = topDxRange(topDx);

    //aggiorna la grandezza (y) della foglia in alto a destra
    d3.selectAll('.topDx')
      .transition().duration(updateTime)
      .attr('r', topDxRange(y));

    // aggiorna la posizione y della foglia in alto a destra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + '0,' + value + ')');
  }

/*------------------------------------------------------------------------*/

  // X e BOTTOMSX
  var moveXbottomSx = function () {
    var bottomSx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let x = g.attr('x');
    let value = bottomSxRange(bottomSx);

    //aggiorna la grandezza (x) della foglia in basso a sinistra
    d3.selectAll('.bottomSx')
      .transition().duration(updateTime)
      .attr('r', bottomSxRange(x));

    // aggiorna la posizione x della foglia in basso a sinistra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + value + ',0)');
  }

  // Y e BOTTOMSX
  var moveYbottomSx = function () {
    // disabilita il comportamento di default del click destro del mouse
    d3.event.preventDefault();

    var bottomSx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let y = g.attr('y');
    let value = bottomSxRange(bottomSx);

    //aggiorna la grandezza (y) della foglia in basso a sinistra
    d3.selectAll('.bottomSx')
      .transition().duration(updateTime)
      .attr('r', bottomSxRange(y));

    //aggiorna la posizione y della foglia in basso a sinistra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + '0,' + value + ')');
  }

/*------------------------------------------------------------------------*/

  // X e BOTTOMDX
  var moveXbottomDx = function () {
    var bottomDx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let x = g.attr('x');
    let value = bottomDxRange(bottomDx);
    
    //aggiorna la grandezza (x) della foglia in basso a destra
    d3.selectAll('.bottomDx')
      .transition().duration(updateTime)
      .attr('r', bottomDxRange(x));

    // aggiorna la posizione x della foglia in basso a destra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + value + ',0)'); 
  }

  // Y e BOTTOMDX
  var moveYbottomDx = function () {
    // disabilita il comportamento di default del click destro del mouse
    d3.event.preventDefault();

    var bottomDx = d3.select(this).attr('r');
    let g = d3.selectAll('g');
    let y = g.attr('y');
    let value = bottomDxRange(bottomDx);

    //aggiorna la grandezza (y) della foglia in basso a destra
    d3.selectAll('.bottomDx')
      .transition().duration(updateTime)
      .attr('r', bottomDxRange(y));

    // aggiorna la posizione y della foglia in basso a destra
    g.transition().duration(updateTime)
      .attr('transform', 'translate(' + '0,' + value + ')');
  }
