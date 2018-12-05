$(function(){
  var wig;
  var img1;
  var img2;
  var identificador;
  var aele = [];
  var i = 0;
  color1("h1");//Funcion para el color del titulo
  var tiempo = new Timer();
  $(".btn-reinicio").click(function(){
    tiempo.stop();
    reinicio();
    limpiar();
    inicio();
    barrido(aele);
    document.getElementById("score-text").innerHTML=0;
    document.getElementById("movimientos-text").innerHTML=0;
    selec(aele);
    document.getElementsByClassName("btn-reinicio")[0].innerHTML="Reiniciar";
    tiempo.start({countdown: true, startValues: {minutes: 1}});
  });
$('#timer').html(tiempo.getTimeValues().toString());
tiempo.addEventListener('secondsUpdated', function (e) {
  $('#timer').html(tiempo.getTimeValues().toString());
});
tiempo.addEventListener('targetAchieved', function (e) {
  fin();
});
  //barrido();
  /*$('.elemento').click(function(){
    console.log(this.id);
  });*/
})

function fin (){ //Animacion final
  $('.panel-tablero').animate({
    width:"0px",
    height:"0px"
  },500,function(){
      $('.panel-tablero').hide();
      $('.panel-score').animate({
        width:"100%"
      });
  });
}

function reinicio (){ //Animacion de posicionamiento inicial
  $('.panel-score').animate({
    width:"25%"
  },500,function(){
      $('.panel-tablero').show();
      $('.panel-tablero').animate({
        width: "70%",
        height: "700px"
      });
  });
}

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

function limpiar (){ //Limpia el tablero de antiguos elementos
  for (var j=1; j<8; j++){
    for (var i = 10; i < 24; i++) {
      var m=(j*100)+i;
      $("#"+m).hide();
      $("#"+m).remove();
    }
  }
}

function inicio (){//Colocacion de elementos en el tablero e inicio del juego
  for (var i=10; i<24; i++){
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
  for (var j=1; j<8; j++){
    for (var i = 17; i < 24; i++) {
      var m=(j*100)+i;
      $("#"+m).hide();
    }
  }
  condiciones();
}

function randomico (){//Creacion de elementos aleatoriamente
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

function condiciones (){//Condiciones para elementos drag&drop
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

function selec(aele){ //Barrido de los elementos para hacerlos droppable
  for (var n=0;n<800;n=n+100){
    for (var m=10;m<25;m++){
      area(m+n,aele);
    }
  }
}

function conteo (){//Conteo de movimientos
  var mov = parseInt(document.getElementById("movimientos-text").innerHTML);
  mov++;
  document.getElementById("movimientos-text").innerHTML=mov;
}

function area(j,aele){ //Convertir en droppable a 1 elemento
      $('#'+j).droppable({
          accept : function(d){
            if (d.attr("id")==j-1 || d.attr("id")==j+1 || d.attr("id")==j-100 || d.attr("id")==j+100){
              return true;
            }
          },
          drop : function(event,ui){
            img2=$(this).attr("src");
            $(this).attr("src",img1);
            $('#'+identificador).attr("src",img2);
            conteo();
            barrido(aele);
          }
      });
}

function eliminarElementos(arreglo){//Eliminar elementos del tablero
  arreglo.forEach(eliminare);//Elimina los elementos del arreglo
  arreglo.length = 0;
}

function aparicion (){//Mostrar los elementos ocultos
  var auxid = 0;
  var auxid5 = 0;
  for (var j=0;j<cont+1;j++){ // Muestra los elementos ocultos
    auxid = ident+j;
    auxid5 = auxid+7;
    $('#'+auxid5).show();
  }
}

function anexado (ident){//Anexar nuevos elementos
  for (var n=0; n<cont+1; n++){ //Anexamiento de nuevos elementos
    var col = (ident-10)/100;
    var sel1 = randomico ();
    var ide = ident+13-cont+n;
    var ape = '<img src="image/'+sel1+'.png" class="elemento" id="'+ide+'">';
    $('.col-'+col).prepend(ape);
    $('#'+ide).hide();
    selec();
    console.log(ape);
    condiciones();
  }
}

function eliminar(n,aele){//Coloca los elementos a eliminarse en un arreglo
  var ident = 110+n*100;
  var ident2 = 0;
  var cont = 0;
  var auxid2 = 0;
  var puntaje = parseInt(document.getElementById("score-text").innerHTML);
  for (var c=0;c<5;c++){ //Recorrido 4 primeros elementos columna
    //console.log("c="+c);
    cont = 0;
    ident2 = ident+c;
    for (var i=ident2+1;i<ident2+8;i++){ //Recorrido elementos columna
      if ($('#'+ident2).attr("src")==$('#'+i).attr("src")){ //comparacion de elementos iguales en columna
        cont++;
      }else {
        if (cont>1){//Comparacion si hay mas de 3 elementos iguales
          for (var j=0;j<cont+1;j++){//Insertar en el arreglo los elementos adjuntos iguales
            auxid2 = ident2;
            //console.log(aele);
            aele.push(auxid2);
            //console.log(aele)
            //console.log("add "+auxid2);
          }
          //console.log("FIN");
          c=c+cont;
        }
        //console.log(aele);
        selec(aele);
        break;
      }//Fin else
    }//Fin recorrido elementos columna
  }//Fin recorrido 4 primeros elementos columna

  ident = 110+n;

  //Columnas
  for (var c=0;c<600;c=c+100){ //Recorrido 4 primeros elementos fila
    cont = 0;
    ident2 = ident+c;
    for (var i=ident2+100;i<900;i=i+100){ //Recorrido elementos columna
      //console.log("Fijo "+ident2+" - comparado "+i);
      if ($('#'+ident2).attr("src")==$('#'+i).attr("src")){ //comparacion de elementos iguales en columna
        cont++;
        //console.log("cont="+cont);
      }else {
        if (cont>1){
          //console.log("Si");
          for (var j=0;j<cont+1;j++){ //Remocion de elementos iguales
            auxid = ident+j;
            auxid2 = ident2+j*100;
            //console.log("columna "+auxid2);
            auxid5 = auxid2+7;
            comparar(aele,auxid2);
            //aele.push(auxid2);
            //console.log(aele);
          }
          c=c+cont*100;
        }

        selec(aele);
        //console.log("break");
        break;
      }
    }//Fin recorrido elementos columna
    //console.log(c);
  }//Fin recorrido 4 primeros elementos columna
  puntaje = puntaje+aele.length;
  //console.log("puntaje = "+puntaje);
  document.getElementById("score-text").innerHTML=puntaje;
}

function barrido(aele){ //Funcion comparacion de elementos iguales en malla
  var aele2 = [];
  while (true) {
    for (var n=0;n<7;n++){//Barrido elementos
      eliminar(n,aele);
    }
    eliminarElementos(aele);
    selec(aele);
    condiciones();
    for (var n=0;n<7;n++){//Barrido elementos
      eliminar(n,aele2);
    }
    /*eliminarElementos(aele2);
    selec(aele2);
    condiciones();*/
    if (aele2.length==0){
      break;
    }
    aele2.length=0;
  }
}

function efectoA (item){//Efecto parpadeo A
  console.log("A");
  $('#'+item).animate({
    opacity: 0.1
  },1000);
}

function efectoB (item){//Efecto de parpadeo B
  console.log("B");
  $('#'+item).animate({
    opacity: 1
  },1000);
}

function coordinador (aele){//Coordinador efecto de parpadeo
  if (typeof coordinador.cont == 'undefined'){
    coordinador.cont = 0;
  }
  coordinador.cont++;
    if (coordinador.cont<4){
      if (coordinador.cont%2 == 0){
        aele.forEach(efectoA);
      }
      else {
        aele.forEach(efectoB);
      }
    }
    else {
      eliminarElementos(aele);
      selec(aele);
      condiciones();
      coordinador.cont = 0;
    }
}

function eliminare (item){//Elimina los elementos del array de eliminacion
  //console.log(item);
  $('#'+item).hide("fast");
  $('#'+item).remove();

  var col=Math.floor(item/100)*100+17;
  var col2=Math.floor(item/100);
  var ide=Math.floor(item/100)*100+23;
  $('#'+col).show("fast");
  var auxid4=0;
  var auxid3=0;
  for (var k=1;k<14;k++){ //Reasignacion de ids
    auxid3 = item+k-1;
    auxid4 = item+k;
    $('#'+auxid4).attr("id",auxid3);
    //console.log(auxid4 +" -> "+ auxid3);

    var sel1 = randomico ();
    var ape = '<img src="image/'+sel1+'.png" class="elemento" id="'+ide+'">';
    $('.col-'+col2).prepend(ape);
    $('#'+ide).hide("fast");
  }
}

function comparar (aele, item){//Comparacion de elementos
  var cont = 0;
  for (var i=0;i < aele.length; i++){
    if (item == aele[i]){
      cont++;
    }
  }
  if (cont == 0){
    aele.push(item);
  }
}
