
d3.json("games.json", function(error, json){
  if(error) return console.warn(error);
  console.log("Hooray! Loaded data", json);
  draw(json);
});

function draw(games){

  // Conventional margins
  var margin = {top: 20, right:20, bottom: 40, left:40};
  var width = 900 - margin.left - margin.right,
      height = 600 - margin.left - margin.right;
  var chart = d3.select("svg")
    .append("g")
      .attr("transform", "translate("+margin.left+","+margin.top+")");

  // Scale
  var x = d3.scale.linear()
    .domain([1892,2015])
    .range([0,width]);
  var y = d3.scale.linear()
    .domain([-50,50])
    .range([height, 0]);

  // Axes
  var touchdowns = [];
  for(var i = -6; i <= 6; i++) {
    touchdowns.push(i*7);
  }
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.format("d"));
  var yAxis = d3.svg.axis()
      .scale(y)
      .tickValues(touchdowns)
      .orient("left");
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .selectAll("line.grid")
      .data(touchdowns)
    .enter().append("line")
      .attr("class", "grid")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", function(d){ return y(d); })
      .attr("y2", function(d){ return y(d); });


  // Chart
  var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    .y0(y(0))
    .y1(function(d) { return y(d.stanford - d.california); });
  chart.append("path")
    .datum(games)
    .attr("class", "area")
    .attr("d", area);
}

