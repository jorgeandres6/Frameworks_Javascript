$(function(){
  color1("h1");//Funcion para el color del titulo
  inicio();
})

function color1 (elemento){ // Color del titulo 1
    $(elemento).delay(500).animate({
      color : '#00BCD4'
    },10,function() {
      color2(elemento);
    })
}

function color2 (elemento){ // Color del titulo 2
    $(elemento).delay(500).animate({
      color : '#DCFF0E'
    },10,function() {
      color1(elemento);
    })
}

function inicio (){
  for (var i=0; i<7; i++){
    var sel = randomico ();
    $(".col-1").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento">');
    var sel = randomico ();
    $(".col-2").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento">');
    var sel = randomico ();
    $(".col-3").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento">');
    var sel = randomico ();
    $(".col-4").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento">');
    var sel = randomico ();
    $(".col-5").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento">');
    var sel = randomico ();
    $(".col-6").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento">');
    var sel = randomico ();
    $(".col-7").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento">');
  }
  condiciones();
}

function randomico (){
  var num = Math.random()*10;
  var sel = "";
  if(num<3){
    sel = "1";
  }else if(num>3 && num<5){
    sel = "2";
  }else if (num>5 && num<7) {
    sel = "3";
  }else {
    sel = "4";
  }
  return sel;
}

function condiciones (){
  $('.elemento').draggable();
}

//$(".col-1").prepend('<img src="image/1.png" alt="">');
//$("#hola").prepend('<img src="image/2.png" alt="">');
