var categories=[]; var colors=[]; var display=[];

var categories1=["Busins","Sports","Health","Misc","On-air","FrntPg"];
var colors1=["orange","grey","lightpink","red","lightgreen","lightblue"];
var yvalues1=[10,20,30,40,50,60];
var display1=[22922,33574,35470,63220,82250,115180];

var valuesforbarchart=[];


var categories2=["movies","garden","electrn","clothes"];
var colors2=["pink","lightgreen","cyan","orange"];
var yvalues2=[10,20,30,40];
var display2=[3204,4314,4781,11191];



window.customFncs = {};
updatePageCategory();
function updatePageCategory(){
	choice=document.getElementById("ds").value;
	if(choice==1){
		categories=categories1;colors=colors1;display=display1;yvalues=yvalues1;
	}else{
		categories=categories2;colors=colors2;display=display2;yvalues=yvalues2;
	}
	pageCategory();
	bars(yvalues2);
}
function pageCategory(){
	var myConfig =    {
      type:"hbar",
	  
 
	  height:"38%",
      width:"100%",
      x:"0%",
      y:"5%",
      "plot":{
       "styles":colors,
		
		"fill-offset-x":"100",		
		tooltip:{
			  jsRule : "window.customFncs.formatTooltip()"
 	}
      },
	  
      "scale-x":{
		    lineColor:'none',
        "labels":categories,
		  tick:{
			visible:false
		  },

	"item":{
	  maxChars:10,
	  wrapText:true,
      fontSize: 12,
	  fontFamily:"sans-serif",
	  fontWeight:"bold",
	  fontcolor:"black",
	  textAlign:"right"
    }
      },
	  "scale-y":{
        
		  visible:false
      },
      
	 
		
      "series":[
        {"values":yvalues
		
		}
      ]  
 };
window.customFncs.formatTooltip = function(p){
  //console.log(p);
  var tooltipText=p.scaletext+'\n Sequences:'+display[p.scaleval];
   return {
    text : tooltipText
  }
	}
	zingchart.render({ 
		id : 'pageCat', 
		data : myConfig,
		height: "700px",
		width: "180px"
			
	});

}


function bars(barfile){
	
	console.log(barfile);
	valuesforbarchart=[];
	d3.csv(barfile, function(data) {
	data.forEach(function(d) {
    valuesforbarchart.push(d.count);
  });
  console.log(valuesforbarchart);
  renderbarchart();
});
}




function renderbarchart(){
	zingchart.exec('bars', 'destroy');
	var myConfig =    {
		  type:"vbar",
		  height:"100%",
		  width:"180%",
		  "plot":{
			  
			"border-width":"1.1px",
            "border-color":"white",
			 tooltip:{
				  jsRule : "window.customFncs.formatTooltip()"
			},
		  },
		  "plotarea":{ 
		 "margin-left":"12px"
			},
		  "scale-x":{
			     "background-fit":"x",
				lineColor:'none',
			"labels":null,
			  tick:{
				visible:false
			  },

		  },
		  "scale-y":{
			  visible:false
		  },
			
		  "series":[
			{"values":valuesforbarchart,
			"background-color":"black"
			}
		  ]  
	 };
	
	zingchart.render({ 
		id : 'bars', 
		data : myConfig,
		height: "180px",
		width: "600px"
			
	});

}