/*Code by android developers start here*/

var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});
});

function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	}
	
}else {
	

	if(page_id <= 1){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 2){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
  
    }


}



$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		/* $(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	}); */
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){
//step 6:-
//console.log("++++++++pg_id++++"+pg_id+"+++++++currentslide++++++"+localStorage.getItem("currentslide")+"++++++previousslide++++++"+localStorage.getItem("previousslide"));
		
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="video1"><video autoplay loop poster="slide1/Poster.png" onplay="onPlay1()" onended="onEnded1()" id="video1" width="1080" height="810"><source src="slide1/Part1.mp4" type="video/mp4"></video></div><div class="video2"><video onended="onEnded2()" id="video2" width="1080" height="810"><source src="slide1/Part2.mp4" type="video/mp4"></video></div><div class="video3"><video onended="onEnded3()" id="video3" width="1080" height="810"><source src="slide1/Part3.mp4" type="video/mp4"></video></div><div class="video4"><video onended="onEnded4()" id="video4" width="1080" height="810"><source src="slide1/Part4.mp4" type="video/mp4"></video></div><div class="start1"><img src="slide1/start1.png"></div><div class="start2"><img src="slide1/start2.png"></div><div class="button1" onclick="playVid1()"></div><div class="button2" onclick="playVid2()"></div><div class="war1"><img src="slide1/war1.png"></div><div class="war2"><img src="slide1/war2.png"></div><div class="war3"><img src="slide1/war3.png"></div><div class="war4"><img src="slide1/war4.png"></div><div class="war5"><img src="slide1/war5.png"></div><div class="war6"><img src="slide1/war6.png"></div><div class="tick1"><img src="slide1/tick1.png"></div><div class="tick2"><img src="slide1/tick2.png"></div><div class="tick3"><img src="slide1/tick3.png"></div><div class="alert1"><img src="slide1/alert1.png"></div><div class="alert2"><img src="slide1/alert2.png"></div><div class="tick1on" onclick="tick1on()"></div><div class="tick2on" onclick="tick2on()"></div><div class="tick3on" onclick="tick3on()"></div><audio id="correct" src="slide1/Correct.mp3" type="audio/mpeg"></audio><audio id="wrong" src="slide1/wrong.mp3" type="audio/mpeg"></audio><div class="pat1"><img src="slide1/pat1.png"></div><div class="pat2"><img src="slide1/pat2.png"></div><div class="pat3"><img src="slide1/pat3.png"></div><div class="pat4"><img src="slide1/pat4.png"></div><div class="pat5"><img src="slide1/pat5.png"></div><div class="pat6"><img src="slide1/pat6.png"></div><div class="pat7"><img src="slide1/pat7.png"></div><div class="pat8"><img src="slide1/pat8.png"></div><div class="pat9"><img src="slide1/pat9.png"></div><div class="pat10"><img src="slide1/pat10.png"></div><div class="pat11"><img src="slide1/pat11.png"></div><div class="pat12"><img src="slide1/pat12.png"></div><div class="pat13"><img src="slide1/pat13.png"></div><div class="button4" onclick="playMet()"></div><div class="met1"><img src="slide1/met1.png"></div><div class="met2"><img src="slide1/met2.png"></div><div class="met3"><img src="slide1/met3.png"></div><div class="button5" onclick="playVid4()"></div>';
	break;
}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}


function open_page(url,page_id){
	 //alert("===openpage====");
	localStorage.getItem('currentbrand');
    localStorage.getItem('currentcontent');
    localStorage.getItem('currentcontentbrandId');
    localStorage.getItem('current');
	localStorage.setItem("gotoNextPrevBrand" ,0);
	//alert("====currentbrand======"+localStorage.getItem('currentbrand'));
	//alert("====currentcontent======"+localStorage.getItem('currentcontent'));
	//alert("====currentcontentbrandId======"+localStorage.getItem('currentcontentbrandId'));
	//alert("====current======"+localStorage.getItem('current'));
	//alert("====previousslide======"+localStorage.getItem("previousslide"));
	//alert("====page_id======"+page_id);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	 if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 }
	  checkClickThrough();
	}

	function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(currentslide == 1){
	document.getElementById("click_through").innerHTML='';
		}
    if(currentslide == 2){
	document.getElementById("click_through").innerHTML='';
		}

	}

	function checkBtns(refNum){
		switch(refNum){
			case 1:
			open_page('',1);
            break;
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})

/*--------------------------Javascript Animation-----------------------------*/

function onPlay() {
	$('.button1').css("display","none");
	$('.button2').css("display","block");
	$('.start1').css("display","block");
	$('.start2').css("display","block");
}

function playVid1() {
	$('.button1').css("display","none");
	$('.button2').css("display","block");
	$('.start1').css("display","block");
	$('.start2').css("display","block");
	document.getElementById("video1").play();
}

function playVid2() {
	$('.button1').css("display","none");
	$('.button2').css("display","none");
	$('.start1').css("display","none");
	$('.start2').css("display","none");
	$(".video1").css("display","none");
	var vid = document.getElementById("video1");
	vid.pause();
	vid.currentTime = 0;
	$(".video2").css("display","block");
	document.getElementById("video2").play();
}

function onEnded2() {
	$('.war1, .war2, .war3, .war4, .war5, .war6').css("display","block");
	setTimeout(function(){ 
		$('.tick1on, .tick2on, .tick3on').css("display","block");
	}, 1000);
}

function tick1on() {
	document.getElementById("correct").play();
	$(".alert1").css("display","block");
	$(".alert2").css("display","none");
	$(".tick1").css("display","block");
	$(".tick2").css("display","none");
	$(".tick3").css("display","none");
	$('.tick1on, .tick2on, .tick3on').css("display","none");
	setTimeout(function(){ 
		$(".video2").css("display","none");
		var vid = document.getElementById("video2");
		vid.pause();
		vid.currentTime = 0;
		$(".video3").css("display","block");
		document.getElementById("video3").play();
	}, 2000);
}

function tick2on() {
	document.getElementById("correct").play();
	$(".alert1").css("display","block");
	$(".alert2").css("display","none");
	$(".tick1").css("display","none");
	$(".tick2").css("display","block");
	$(".tick3").css("display","none");
	$('.tick1on, .tick2on, .tick3on').css("display","none");
	setTimeout(function(){ 
		$(".video2").css("display","none");
		var vid = document.getElementById("video2");
		vid.pause();
		vid.currentTime = 0;
		$(".video3").css("display","block");
		document.getElementById("video3").play();
	}, 2000);
}

function tick3on() {
	document.getElementById("wrong").play();
	$(".alert1").css("display","none");
	$(".alert2").css("display","block");
	$(".tick1").css("display","none");
	$(".tick2").css("display","none");
	$(".tick3").css("display","block");
	$('.tick1on, .tick2on').css("display","block");
	$('.tick3on').css("display","none");
}

function onEnded3() {
	$('.pat1, .pat2, .pat3, .pat4, .pat5, .pat6, .pat7, .pat8, .pat9, .pat10, .pat11, .pat12, .pat13').css("display","block");
	setTimeout(function(){ 
		$('.button4').css("display","block");
	}, 6000);
}

function playMet() {
	$('.button4').css("display","none");
	$('.button5').css("display","block");
	$('.met1, .met2, .met3').css("display","block");
}

function playVid4() {
	$('.button5').css("display","none");
	$(".video3").css("display","none");
	var vid = document.getElementById("video3");
	vid.pause();
	vid.currentTime = 0;
	$(".video4").css("display","block");
	document.getElementById("video4").play();
}