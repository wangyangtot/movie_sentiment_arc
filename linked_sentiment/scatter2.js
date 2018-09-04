var wLine = 600;
var hLine = 500;
var margin = {top: 40, right: 10, bottom: 20, left: 50};

// Scale the width and height
var xScaleLine = d3.time.scale()
                    .range([ margin.left, wLine - margin.right - margin.left ]);

var yScaleLine = d3.scale.linear()
                    .range([ margin.top, hLine - margin.bottom]);

// Creat Axes i.e. xAxis and yAxis
var xAxisLine = d3.svg.axis()
              .scale(xScaleLine)
              .orient("bottom");

var yAxisLine = d3.svg.axis()
              .scale(yScaleLine)
              .orient("left");

var line = d3.svg.line()
    .x(function(d) {
      return xScaleLine(+d.point); // come back here and replace "year"
    })
    .y(function(d) {
      return yScaleLine(+d.amount); // come back here and replace "amount"
    })

// Create SVG 
var linechart = d3.select("#area1")
			.append("svg")
			.attr("width", wLine)
			.attr("height", hLine);

var dataset=[]
var activecircle;

d3.csv("sentiment_line.csv", function(data) {
	
	for (var i=0; i < data.length; i++){


		dataset[i] = {
         lable:i,
         line_points: [],
  }

     for (var j = 0; j <100; j++) {

        //Add a new object to the Div 9 rate data array
        //for that district
        dataset[i].line_points.push({
          point: j,
          amount: +data[i][j]
        });
}
}
//console.log(dataset)

xScaleLine.domain([0,100])
yScaleLine.domain([
	d3.min(dataset, function(d) {
      return d3.min(d.line_points, function(d) {
        return +d.amount;})
    }),
    d3.max(dataset, function(d) {
    	return d3.max(d.line_points, function(d) {
      return +d.amount;})
    }),
    ]);



	var groups = linechart.selectAll("g")
      .data(dataset)
      .enter()
      .append("g")
      .on("mouseover", function(d) {

        activecircle = d.label;

        // Setting positio for the district label
        var xPosition = wLine/2 + 35;
        var yPosition = marginLine.top - 10;

        linechart.append("text")
        .attr("id", "hoverLabel")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "start")
        .attr("font-family", "ff-nuvo-sc-web-pro-1,ff-nuvo-sc-web-pro-2, sans-serif") 
        .attr("font-size", "20px")
        .text( activecircle); 

        d3.selectAll("circle")
        .classed("barLight", function(d) {
          if ( d.lable == activecircle) return true;
          else return false;
        });

      }) // end of .on mouseover

      .on("mouseout", function() {
        d3.select("#hoverLabel").remove();

        d3.selectAll("circle")
        .attr("class", "barBase");

      }) 

	groups.selectAll("g")
        .data(function(d) {
        	//console.log([d.line_points])
          return [d.line_points];
        })
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", line);
console.log(groups);
//console.log(points);
});
//console.log(dataset);

























