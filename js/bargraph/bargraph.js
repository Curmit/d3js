function barGraph() {
    // variables
    var margin = { top: 20, right: 20, bottom: 100, left: 60 },
        //   
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top -margin.bottom,
        // this the range where in your x axis label stays and the width between them 
        x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5),
        y = d3.scale.linear().range([height, 0]);

    //draw axis

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

    // SVG element with HTML element!
    var svg = d3.select("#barGraph").append("svg")
        .attr("width", width + margin.left + magin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")// group in the svg
        .attr("transform", "translate(" + margin.left + "," + margin.top + " )");



        d3.json("data/vacancies.json", function (data) {
            console.log(data);

            // map data to x axis
            x.domain(data.map(function (d) {
    
                return d.Study;// return prefered variable from data
            }));
    
            //scale the y domain to the total value within the data
            y.domain([0, d3.max(data, function (d) {
                return d.noVacancies;
    
            })]);
            // make a group of the x and y axis
    
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0, " + height + " )") // for later transformation
                .call(xAxis)// call xAxis function
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-0.5em")// scale text and numbers relative to x 
                .attr("dy", "-0.55em")
                .attr("y", 30) // STRANGE??? put the labels a nice position in the whole picture, move 30 pixels down
                .attr("transform", "rotate(-45)");// rotate text!
    
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 5)
                .attr("dy", "0.8em")
                .attr("text-anchor", "end")
                .text("Member Rank");
    
            // put bars in, data bind on every element a bar chart
            svg.selectAll("bar")
                .data(data)
                .enter()
                .append("rect")
                .style("fill", "orange") // give the bar a color!
                .attr(x, function (d) {
    
                    return x(d.Study); // return for x the name 
                })
                .attr("width", x.rangeBand())
                .attr("y", function (d) {
                    return y(d.noVacancies);
                })
                .attr("height", function (d) {
                    return height - y(d.noVacancies);
    
                });
    
    
    
        })

    
}


  