
d3.json("games.json", function(error, json){
  if(error) return console.warn(error);
  console.log("Hooray! Loaded data", json);
  draw(json);
});

function draw(games){
  var svg = d3.select("svg");
  console.log(svg);

  var x = d3.scale.linear()
    .domain([1892,2015])
    .range([10,800]);
  var y = d3.scale.linear()
    .domain([0,70])
    .range([0,300]);

  ["stanford", "california"].forEach(function(side){
    var selection = svg.selectAll("rect."+side)
        .data(games)
      .enter().append("rect")
        .attr("class", side)
        .attr("x", function(d){return x(d.year);})
        .attr("y", function(d){return side==="stanford" ? 400-y(d[side]) : 400;})
        .attr("width", 6)
        .attr("height", function(d){return y(d[side]);});
  });
}

