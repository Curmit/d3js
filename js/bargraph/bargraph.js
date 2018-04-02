var studies = new Map();

function barGraph() {
    // variables
    var margin = { top: 20, right: 20, bottom: 100, left: 60 },
        //   
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        // this the range where in your x axis label stays and the width between them 
        x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5),
        y = d3.scale.linear().range([height, 0]);




    //draw axis

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(60);

    // SVG element with HTML element!
    var svg = d3.select("#barGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")// group in the svg
        .attr("transform", "translate(" + margin.left + "," + margin.top + " )");


    // calcuate all vacancies
    totalEducation();

    d3.json("data/suicide-squad.json", function (data) {
        //console.log(data);

        // map data to x axis
        x.domain(data.map(function (d) {

            return d.name;// return prefered variable from data
        }));

        //scale the y domain to the total value within the data
        y.domain([0, d3.max(Array.from(studies.entries()), function (d) {
            //console.log("domain "+ d.noVacancies);
            return d[1];
        })]);


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
            .attr("x", function (d) {

                return x(d.name); // return for x the name 
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {

                for (var [key, value] of studies.entries()) {
                    // console.log("Comparing JSON value " + d.name + " with key " + key);

                    if (d.name == key) {
                        // console.log("---> They are the same! Returning value " + studies.get(key));
                        return y(studies.get(key));


                    }


                }


            }








                //console.log("Vacancies for" + d.name + ": " + d.rank);

                //return y(d.rank);

                // // possible implementation with ternary operator
                // for(var i=0; i++; i < myArray.length){
                //     // if d.name is equal to name in array return value 
                //     return d.name === myArray[i].Study ? myArray[i].total : 10000; 
                // }

            )
        .attr("height", function (d) {
            
            for(var [key,value] of studies.entries()){
                console.log("Returning key: " + key + " with value " + value);
                if(d.name == key){
                return height - y(studies.get(key));

                }


            }



          




        });



})






}

function totalEducation() {
    // make  hashmap/ array with key and value
    // read data from JSON file 
    // if study matches fill 
    // Fill  array with value and key 






    d3.json("data/suicide-squad.json", function (data) {

        //  set all studies as keys
        for (let i = 0; i < data.length; i++) {
            studies.set(data[i].name);
        }
        // if they have the same studies add up all vacancies
        // compare for each JSON object with the keynames of hash maps
        var iterator1 = studies.keys();




        for (var [key, value] of studies.entries()) {


            for (var i = 0; i < data.length; i++) {


                if (key == data[i].name) {
                    if (studies.get(key) == null) {
                        studies.set(key, data[i].rank);
                        // console.log("key " + key + "value " + studies.get(key));
                    }
                    else {
                        studies.set(key, studies.get(key) + data[i].rank);
                        //console.log("ik ben in else");

                    }

                }



            }




        }
        for (var [key, value] of studies.entries()) {

            console.log(key + ' = ' + value);


        }

        console.log("calculated total");

    })
    return studies;
}



