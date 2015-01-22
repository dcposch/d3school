
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
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // Chart
  var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.stanford - d.california); });
  chart.append("path")
    .datum(games)
    .attr("class", "line")
    .attr("d", line);
}

