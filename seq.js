
function alignSeq(eventName){
	console.log(eventName);
            var indices=[];
            var ally=[];
            var ydict={};
			var itemSize = 7.6;
			var cellSize = itemSize - 1;
			var svg = d3.select('#sequenc')
			var allcols=svg.selectAll("#seq");
			//console.log(allcols);
			allcols.each(function(d, i) {
			
           for (var j=0;j<d.length;j++){
            if(d[j].value==eventName)
            {   
                indices.push(i);
                ydict[i]=d[j].y;   
            }
            
           }
             })
           var finalindex = indices.filter((v, i, a) => a.indexOf(v) === i); 
           for (var cur of finalindex) {
                gele=allcols[0][cur];
               pos=finalindex.indexOf(cur);
               diff=ydict[finalindex[0]]-ydict[cur];
               //console.log(diff)
      d3.select(gele).attr("transform","translate(" + cellSize + ","+diff * cellSize+")");
}
			;
           
}

function sequence(file){
	
	document.getElementById("sequenc").innerHTML = "";
	dataset=[];
    var itemSize = 7.6,
      cellSize = itemSize - 1,
      margin = {top: 10, right: 20, bottom: 20, left: 10};
      
	var width = 550 - margin.right - margin.left,
      height = 400 - margin.top - margin.bottom;

	var tooltip = d3.select('#sequenc')
        .append("div")
        .style("position", "relative")
        .style("visibility", "hidden");

	d3.csv(file, function ( response ) {
	
    var data = response.map(function( item ) {
      
        var newItem = {};
       
        newItem.x = +item.x;
        newItem.y = +item.y;
        newItem.value = item.value;

        return newItem;
    })
    var colwisedata = d3.nest()
	.key(function(d) { return d.x; })
	.entries(data);


for(i=0;i< colwisedata.length;i++)
{
    dataset[i]=colwisedata[i].values;
}

    var x_elements = d3.set(data.map(function( item ) { return item.x; } )).values();
    var y_elements = d3.set(data.map(function( item ) { return item.y; } )).values();
    var value_elements=d3.set(data.map(function( item ) { return item.value; } )).values();
    var x_max = d3.max(data, function(item) { return item.x; });
    
    var xScale = d3.scale.ordinal()
        .domain(x_elements)
        .rangeBands([0, x_max * (cellSize-3)]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("top");

    var yScale = d3.scale.ordinal()
        .domain(y_elements)
        .rangeBands([0, y_elements.length * cellSize]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("left");
    var colorScale = d3.scale.ordinal()
        .domain(['front-page','msn-sports','sports','health','living','travel','news','msn-news','bbs','local','summary',
            'business','tech','weather','misc','on-air','opinion','clothing','handbags','movies','games','home&garden','tools','electronics','computers'])
        .range(['#3366ff','#c2c2a3','#c2c2a3','#ff4d88','#ff4d88','#ff4d88','#33ff33','#33ff33','#ff0000','#33ff33','#ff0000',
            '#ff661a','#ff661a','#33ff33','#ff0000','#33ff33','#ff0000','orange','orange','pink','pink','lightgreen','lightgreen','electronics','computers']);

    var svg = d3.select('#sequenc')
        .append("svg")
        .attr("class","svgview")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id","fullseq")
        .attr("transform", "translate(" + margin.left + "," + height/4 + ")");

  
    var cells=svg.selectAll("g")
    .data(dataset)
    .enter().append("g")
    .attr("transform", function (d) {
      return "translate(" + cellSize + ")"
    })
    .attr("id",function(d,i){ return "seq"})
    .selectAll("rect")
    .data(function(d) {return d;})
    .enter().append("rect")
        .attr('id',function(d) { return d.value; })
        .attr('class', 'cell')
        .attr('width', cellSize-2)
        .attr('height', cellSize-1)
        .attr('y', function(d) { return yScale(d.y); })
        .attr('x', function(d) { return xScale(d.x); })
        .attr('fill', function(d) { return colorScale(d.value); })

        .on("mouseover", function(d){
               //highlight text
               d3.select(this).classed("cell-hover",true);
                    
               //Update the tooltip position and value
               d3.select("#tooltip")
                 .style("left", (d3.event.pageX+10) + "px")
                 .style("top", (d3.event.pageY-10) + "px")
                 .select("#value")
                 .text(d.value);  
               //Show the tooltip
               d3.select("#tooltip").classed("hidden", false);
        })
        .on("click",function(d){
			console.log(d);
            //d3.select(this).attr('fill', function(d) { return colorScale(window.bandClassifier(d.perChange,100));});
			alignSeq(d.value);

        })

        .on("mouseout",function(){
            //d3.select(this).attr('fill', function(d) { return colorScale(window.bandClassifier(d.perChange,100));});
            d3.select(this).classed("cell-hover",false);
            d3.select("#tooltip").style("stroke","none");
            tooltip.style("visibility","hidden");
        })
        ;
   
  });
}// end of function 