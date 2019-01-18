var ht = "590px";
var maxht = 300;
var wt = "160px";
var curDS = "DS1";
var curLabs = [];
var curLabsSheets = [];
var curSheets = 12;
var curExcel = "pattern";
var cnt=0;

var colorcode = {};
colorcode['front-page']='lightblue';
colorcode['business']='orange';
colorcode['on-air']='lightgreen';
colorcode['health']='pink';
colorcode['sports']='grey';
colorcode['misc']='red';


var pgCat = {};
pgCat['front-page']=["front-page"];
pgCat['business']=["business","tech"];
pgCat['on-air']=["on-air","local","news","weather"];
pgCat['health']=["health","living","travel"];
pgCat['sports']=["sports","msn-sports"];
pgCat['misc']=["opinion","misc","summary","bbs"];

pgCat['clothing']=["clothing","handbags"];
pgCat['movies']=["movies","games"];
pgCat['home&garden']=["home&garden","tools"];
pgCat['electronics']=["electronics","computers"];


colorcode['clothing']='orange';
colorcode['movies']='pink';
colorcode['home&garden']='lightgreen';
colorcode['electronics']='cyan';



function getValues(path,callback){
	var vals=[];
	var labs=[];
	var fulls=[];
	var clicks=[];
	$.getJSON(path, function(json) {
		for(i=0;i<json.length;i++){
			vals.push(json[i].value);
			labs.push(json[i].event);
			fulls.push(json[i].full);
			clicks.push(json[i].clicks);
		}
		callback([vals,labs,fulls,clicks]);
	});	
}


var cont = document.getElementById("icon");
cont.innerHTML = '<p><img src="users.jpg" onclick="fullPattern()" style="width:18px;height:20px; float:left;"></img>&nbsp;</p>';

getValues("DS1/context.json",function(v){
	curLabs = v[1];
	curLabsSheets = v[3];
	updateCV("content",ht,wt,v[0],v[1],'-16px');
	updatePV('pattern',curSheets);
});

function fullPattern(){
	updatePV('pattern',curSheets);
}

function whichDS(){
	choice=document.getElementById("ds").value;
	if(choice==1){
		curDS = "DS1";
		curSheets = 12;
		getValues("DS1/context.json",function(v){
			curLabs = v[1];
			curLabsSheets = v[3];
			updateCV("content",ht,wt,v[0],v[1],'-16px');
			updatePV('pattern',curSheets);
			updatePageCategory();
			document.getElementById("sequenc").innerHTML = "";
			document.getElementById("bars").innerHTML = "";
		});
	}else{
		curDS = "DS2";
		curSheets = 15;
		getValues("DS2/context.json",function(v){
			curLabs = v[1];
			curLabsSheets = v[3];
			updateCV("content",ht,wt,v[0],v[1],'-16px');
			updatePV('pattern',curSheets);
			updatePageCategory();
			document.getElementById("sequenc").innerHTML = "";
			document.getElementById("bars").innerHTML = "";
			
		});
	}
}

function upd(det,fullPath,idName,full){
	//console.log(fullPath);
	getValues(fullPath,function(v){
		var m = v[3].pop();
		//console.log(m);
		var lab = {};
		for(i=0;i<v[1].length;i++){
			var k = v[1][i].split(':')[0];
			var key="";
			for(ks in pgCat){
				if(ks==k){
					key=ks;
				}
				else{
					for(var j=0; j<pgCat[ks].length;j++){
						if(pgCat[ks][j]==k){
							key=ks;
							break;
						}
					}
				}
			}
			if(!(key in lab)){
				lab[key]=0;
			}
			lab[key] +=1;
		}
		//console.log(lab);
		var values = [];    
		for(var i in lab){
		   values.push(lab[i]);
		}
		//console.log(lab);
		var cc = "";
		var max = Math.max.apply(null, values);

		 for(var i in lab){
			if(lab[i] == max){
				var cc="";
				for(k in pgCat){
					if(k==i){
						cc = colorcode[k];
						break;
					}
					else{
						for(var j=0; j<pgCat[k].length;j++){
							if(pgCat[k][j]==i){
								cc=colorcode[k];
								break;
							}
						}
					}
				}
				break;
			}
		}
		//console.log(cc);
		det.innerHTML += '<div style="display: inline-block; height:620px;" id="'+idName+'\"> <p id="hd" style="color: '+cc+';"><img src="users.jpg" onclick="updateSeq()" onmouseover="fullEvent(this)" onmouseout="lessEvent(this)" class="'+idName+'" id="dicon"></img>&nbsp;-&nbsp;'+m+'</p></div>';
		updateCV(idName,"550px",wt,v[0],v[1],'-16px');
	});
}

function fullEvent(x){
	var det = document.getElementById("dyn");
	var fullPath = curDS+'/'+curExcel+'-'+(x.className.substr(-1)-1)+'.json';
	var idName = x.className;
	getValues(fullPath,function(v){
		updateCV(idName,"550px",wt,v[0],v[2],'-26px');
	});
	
	
}

function lessEvent(x){
	//console.log("hello");
	var det = document.getElementById("dyn");
	var fullPath = curDS+'/'+curExcel+'-'+(x.className.substr(-1)-1)+'.json';
	var idName = x.className;
	getValues(fullPath,function(v){
		updateCV(idName,"550px",wt,v[0],v[1],'-16px');
	});
	//console.log(idName);
}


function updatePV(sheetName,cnt){
	var det = document.getElementById("dyn");
	det.innerHTML="";
	var fullPath = curDS+'/'+sheetName+'-'+0+'.json';
	var idName = "dynamic"+1;
	upd(det,fullPath,idName,0);
	for(j=2;j<=cnt;j=j+1){
		fullPath = curDS+'/'+sheetName+'-'+(j-1)+'.json';
		idName = "dynamic"+j;
		upd(det,fullPath,idName,0);
	}
}

function updateCV(vid,ht,wt,vals,labs,pad){
	var series = [];
	for (i=0;i<vals.length;i++){
		var x = labs[i].split(":")[0];
		var cc="";
		
		for(k in pgCat){
			if(k==x){
				cc = colorcode[k];
				break;
			}
			else{
				for(var j=0; j<pgCat[k].length;j++){
					if(pgCat[k][j]==x){
						cc=colorcode[k];
						break;
					}
				}
			}
		}
		var it={"values":[vals[i]],
		"background-color": cc};
		//console.log(labs[i].split("-"));
		series[i] = it;
	}
	//console.log(series);
	
	var myConfig = {
	  "type":"vfunnel",  //or "vfunnel"
	  "scale-y": {
			"placement": "opposite",
			"labels": labs,
			"item": {
				"font-color": "black",	
				"font-family": "sans-serif",
				"font-weight": "bold",
				"padding": pad
			},
			"guide": {
		  "line-color": "none"
		}},
	  "plot":{
		  "hover-state": {
		  "background-color": "white",
		  "border-color": "lightgray",
		  "border-width": 3,
		  "line-style": "solid"
		}  
	  },
	  "series":series
	};
	 
	zingchart.render({ 
		id : vid, 
		data : myConfig,
		height: ht,
		width: wt
		
	});
	zingchart.bind(null, 'node_click', function(e) {
		if(e.id=="content"){
			var fn = curLabs[e.plotindex].split(':')[0];
			var fnd= "data/".concat(fn);
			curExcel = fn;
			var nsheets = curLabsSheets[e.plotindex];
			//console.log(nsheets);
			console.log(fn);
			updatePV(fn,nsheets);
			//sequence(fn.concat(".csv"));
			//cnt=1;
			if(cnt==0){
				document.getElementById("sequenc").innerHTML = "";
				document.getElementById("bars").innerHTML = "";
				sequence(fnd.concat(".csv")); 
				bars(fnd.concat("_count.csv"));
				cnt=1;
			}
			else{
				//cnt=0;
			}
		}
		else{
			sheetno=1;
			if(e.id.length==8){
				sheetno=e.id[e.id.length-1];
			}
			else{
				console.log("in else")
				sheetno=e.id.slice(-2);
			}
			console.log(sheetno);
			//bars();
			var temp="";
			var t2=temp.concat(curDS,"/pattern-",sheetno-1,".json");
			console.log(t2);
			var fns = "";
			var fn = "health";
		    getValues(t2,function(v){	
				fns = v[1];
				//console.log(fns);
				fn = fns[e.plotindex].split(':')[0];
				//console.log(fn.concat(".csv"));
				alignSeq(fn);
			});
		}
	});
	cnt=0;
}


