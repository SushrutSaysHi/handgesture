var gesture1= "";
var gesture2 = "";

Webcam.set({
     height: 300,
     width: 350,
     img_format: 'png',
     png_quality: 100
});

Webcam.attach("#webcam_div");

function capture_img(){
     Webcam.snap(function(data_uri){
          document.getElementById("snap_div").innerHTML = '<img id="img_snap" src="' + data_uri + '">';
     });
}


console.log("ml5 ver is ", ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vPHcBH6zV/model.json", modelLoad);

function modelLoad(){
     console.log("Model is loaded");
}

function speak(){
     var synth = window.speechSynthesis;
     var spik1 = "First prediction is " + gesture1;
     var spik2 =  "Second prediction is " + gesture2;

     var utter = new SpeechSynthesisUtterance(spik1 + spik2) ;
     synth.speak(utter);
}

function identify() {
     var img = document.getElementById("img_snap");

     classifier.classify(img, gotResult);
}

function gotResult(error, result) {

     if (error) {
          //console.error("There has been a error. Properties are " + error);

     }

     else {
          console.log(result);
          document.getElementById("gestures1").innerHTML = result[0].label;
          document.getElementById("gestures2").innerHTML = result[1].label;

         gesture1 =  result[0].label;
          gesture2 = result[1].label;

          speak();

          if ( result[0].label == "Thumbs Up") {
               document.getElementById("gest_name1").innerHTML = "👍";
          } else if( result[0].label == "Ok"){
               document.getElementById("gest_name1").innerHTML = "👌";
          }else if( result[0].label == "Peace"){
               document.getElementById("gest_name1").innerHTML = "✌";
          }

          if ( result[1].label == "Thumbs Up") {
               document.getElementById("gest_name2").innerHTML = "👍";
          } else if( result[1].label == "Ok"){
               document.getElementById("gest_name2").innerHTML = "👌";
          }else if( result[1].label == "Peace"){
               document.getElementById("gest_name2").innerHTML = "✌";
          }

     }
}