$(function(){
  var wig;
  var img1;
  var img2;
  var identificador;
  color1("h1");//Funcion para el color del titulo
  inicio();
  selec();
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
    $(".col-1").prepend('<img src="image/'+sel+'.png" class="elemento" id="1'+i+'">');
    var sel = randomico ();
    $(".col-2").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento" id="2'+i+'">');
    var sel = randomico ();
    $(".col-3").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento" id="3'+i+'">');
    var sel = randomico ();
    $(".col-4").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento" id="4'+i+'">');
    var sel = randomico ();
    $(".col-5").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento" id="5'+i+'">');
    var sel = randomico ();
    $(".col-6").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento" id="6'+i+'">');
    var sel = randomico ();
    $(".col-7").prepend('<img src="image/'+sel+'.png" alt="caramelo '+sel+'" class="elemento" id="7'+i+'">');
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
  var bound;
  wig = $('.elemento').draggable({
    containment: ".panel-tablero",
    revert : true,
    start: function( event, ui ){
      bound = $(this).position();
      identificador = $(this).attr('id');
      //console.log(parseInt(identificador));
      img1 = $(this).attr("src");
    },
    grid: [120,90]
    //containment: [bound.left-45,bound.top-45,bound.left+45,bound.top+45]
  });
}

function selec(){
  for (var n=0;n<80;n=n+10){
    for (var m=10;m<27;m++){
      area(m+n);
    }
  }
}

function area(j){
      $('#'+j).droppable({
          accept : function(d){
            if (d.attr("id")==j-1 || d.attr("id")==j+1 ||d.attr("id")==j-10 || d.attr("id")==j+10){
              return true;
            }
          },
          drop : function(event,ui){
            img2=$(this).attr("src");
            $(this).attr("src",img1);
            $('#'+identificador).attr("src",img2);
            gravity();
          }

      });
}


function eliminar(){

}

function gravity(){
  var pos = $('#15').position();
  $('#15').animate(
    {
      top: "+=100"
    },1000, function (){
      $('#14').hide();
    }
  );
  //$('#16').attr("id",15);
}
