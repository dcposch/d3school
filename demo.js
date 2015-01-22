
d3.json("games.json", function(error, json){
  if(error) return console.warn(error);
  console.log("Hooray! Loaded data", json);
  draw(json);
});

function draw(games) {
  var svg = d3.select("svg");
  console.log(svg);

  var selection = svg.selectAll("rect")
      .data(games)
    .enter().append("rect")
      .attr("class", 
      .attr("x", function(d){return (d.year - 1892)*10;})
      .attr("y", function(d){return 400-5*d.stanford;})
      .attr("width", 8)
      .attr("height", function(d){return 5*d.stanford;});
}

