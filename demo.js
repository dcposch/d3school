
d3.json("games.json", function(error, json){
  if(error) return console.warn(error);
  console.log("Hooray! Loaded data", json);
  draw(json);
});

function draw(games) {
  var svg = d3.select("svg");
  console.log(svg);

  ["stanford", "california"].forEach(function(side){
    var selection = svg.selectAll("rect."+side)
        .data(games)
      .enter().append("rect")
        .attr("class", side)
        .attr("x", function(d){return (d.year - 1892)*10;})
        .attr("y", function(d){return side==="stanford" ? 400-5*d[side] : 400;})
        .attr("width", 8)
        .attr("height", function(d){return 5*d[side];});
  });
}

