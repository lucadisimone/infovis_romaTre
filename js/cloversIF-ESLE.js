var margin = { top: 100, right: 100, bottom: 100, left: 100 };
var width = d3.select('body').node().getBoundingClientRect().width;
//var width = 1100;
var height = 600;
var updateTime = 1800;

var xRange = d3.scaleLinear().domain([0, 1000]).range([margin.left, width - margin.right]);
var yRange = d3.scaleLinear().domain([0, 1000]).range([margin.top, height - margin.bottom]);
var topSxRange = d3.scaleLinear().domain([10, 50]).range([20, 30]);
var topDxRange = d3.scaleLinear().domain([10, 50]).range([20, 30]);
var bottomSxRange = d3.scaleLinear().domain([10, 50]).range([20, 30]);
var bottomDxRange = d3.scaleLinear().domain([10, 50]).range([20, 30]);

// carica i dati del dataset e associo le funzioni ai click destro e sinistro del mouse
d3.json('data/dataset.json')
  .then(function (data) {
    drawClovers(data);
    d3.selectAll('.topSx').on('click', moveX);
    d3.selectAll('.topDx').on('click', moveX);
    d3.selectAll('.bottomSx').on('click', moveX);
    d3.selectAll('.bottomDx').on('click', moveX);
    d3.selectAll('.topSx').on('contextmenu', moveY);
    d3.selectAll('.topDx').on('contextmenu', moveY);
    d3.selectAll('.bottomSx').on('contextmenu', moveY);
    d3.selectAll('.bottomDx').on('contextmenu', moveY);
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
  let clover = svg
    .append('g')
    .attr('id', 'clover' + i)
    .datum(data[0])
    .attr("transform", function (d, i) {
      return "translate(" + data[i].x + "," + data[i].y + ")"
    })
    .attr('x', data[0].x)
    .attr('y', data[0].y)
    .attr('data', JSON.stringify(data[0]))

  //disegno il gambo
  clover
    .selectAll('.gambo')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'gambo')
    //.attr('transform', "rotate(90)")
    .attr('d', function (d, i) {
      let path = '';
      let x1 = data[i].x;
      let y1 = data[i].y;
      let x2 = data[i].x;
      let y2 = data[i].y * 1.75;
      path += 'M ' + x1 + ' ' + y1 + ' ' + 'L ' + x2 + ' ' + y2
      return path;
    })
    .style('stroke', '#17921c')
    .style('stroke-width', 2);

  //disegno la foglia in alto a sx
  clover
    .selectAll('.topSx')
    .data(data, d => d.gambo)
    .enter()
    .append('path')
    .attr('class', 'topSx' + " " + i)
    .attr('d', "M0,0 Q150,-150 300,0 Q150,150 0,0")
    .attr('transform', 'translate(' + data[0].x + ',' + data[0].y + ') rotate(225) scale(' + data[0].topSx * 0.01 + ')')
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')

  //disegno la foglia in alto a destra
  clover
    .selectAll('.topDx')
    .data(data, d => d.gambo)
    .enter()
    .append('path')
    .attr('class', 'topDx' + " " + i)
    .attr('d', "M0,0 Q150,-150 300,0 Q150,150 0,0")
    .attr('transform', 'translate(' + data[0].x + ',' + data[0].y + ') rotate(315) scale(' + data[0].topDx * 0.01 + ')')
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')

  //disegno la foglia in basso a sinistra
  clover
    .selectAll('.bottomSx')
    .data(data, d => d.gambo)
    .enter()
    .append('path')
    .attr('class', 'bottomSx' + " " + i)
    .attr('d', "M0,0 Q150,-150 300,0 Q150,150 0,0")
    .attr('transform', 'translate(' + data[0].x + ',' + data[0].y + ') rotate(135) scale(' + data[0].bottomSx * 0.01 + ')')
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')

  //diesgno la foglia in basso a destra
  clover
    .selectAll('.bottomDx')
    .data(data, d => d.gambo)
    .enter()
    .append('path')
    .attr('class', 'bottomDx' + " " + i)
    .attr('d', "M0,0 Q150,-150 300,0 Q150,150 0,0")
    .attr('transform', 'translate(' + data[0].x + ',' + data[0].y + ') rotate(45) scale(' + data[0].bottomDx * 0.01 + ')')
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#008000')
}

/**********************************************************
 * Gestione degli eventi
 **********************************************************/

// X e TOPSX
var moveX = function (data,i) { 
  
  let j = d3.selectAll("g")

  // aggiorna la posizione x della foglia in alto a sinistra
  j.transition().duration(updateTime)
    .attr('transform', function (d, i) {
      elem = j["_groups"]["0"][i]
      x = parseInt(elem.getAttribute("x"))
      y = parseInt(elem.getAttribute("y"))
      element = JSON.parse(elem.getAttribute("data"))

      if(d3.selectAll("g").classed("topSx")){
        return 'translate(' + d3.sum([element.topSx, x]) + ',' + y + ')';
      }
      if(d3.selectAll("g").classed("topDx")){
        return 'translate(' + d3.sum([element.topDx, x]) + ',' + y + ')';
      }
      if(d3.selectAll("g").classed("bottomSx")){
        return 'translate(' + d3.sum([element.bottomSx, x]) + ',' + y + ')';
      }
      if(d3.selectAll("g").classed("bottomDx")){
        return 'translate(' + d3.sum([element.bottomDx, x]) + ',' + y + ')';
      }
    })
}

// Y e TOPSX
var moveY = function (data,i) {
  // disabilita il comportamento di default del click destro del mouse
  d3.event.preventDefault();

  let j = d3.selectAll("g")

  // aggiorna la posizione x della foglia in alto a sinistra
  j.transition().duration(updateTime)
    .attr('transform', function () {
      elem = j["_groups"]["0"][i]
      x = parseInt(elem.getAttribute("x"))
      y = parseInt(elem.getAttribute("y"))
      element = JSON.parse(elem.getAttribute("data"))

      if(d3.selectAll("g").classed("topSx")){
        return 'translate(' + x + ',' + d3.sum([element.topSx, y]) + ')';
      }
      if(d3.selectAll("g").classed("topDx")){
        return 'translate(' + x + ',' + d3.sum([element.topDx, y]) + ')';
      }
      if(d3.selectAll("g").classed("bottomSx")){
        return 'translate(' + x + ',' + d3.sum([element.bottomSx, y]) + ')';
      }
      if(d3.selectAll("g").classed("bottomDx")){
        return 'translate(' + x + ',' + d3.sum([element.bottomDx, y]) + ')';
      }
    })
}
