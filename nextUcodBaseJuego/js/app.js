$(function(){
  color1("h1");
})

function color1 (elemento){
    $(elemento).delay(500).animate({
      color : '#00BCD4'
    },10,function() {
      color2(elemento);
    })
}

function color2 (elemento){
    $(elemento).delay(500).animate({
      color : '#DCFF0E'
    },10,function() {
      color1(elemento);
    })
}

//$(".col-1").prepend('<img src="image/1.png" alt="">');
//$("#hola").prepend('<img src="image/2.png" alt="">');
