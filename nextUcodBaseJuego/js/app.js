$(function(){
  var wig;
  var img1;
  var img2;
  var identificador;
  var aele = [];
  color1("h1");//Funcion para el color del titulo
  inicio();
  selec(aele);
  //barrido();
  $('.elemento').click(function(){
    console.log(this.id);
  });
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

function selec(aele){ //Barrido de los elementos para hacerlos droppable
  for (var n=0;n<800;n=n+100){
    for (var m=10;m<25;m++){
      area(m+n,aele);
    }
  }
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
            barrido(aele);
          }
      });
}

function eliminarElementos(aele){
  aele.forEach(eliminare);//Elimina los elementos del arreglo
  aele = [];
}

function aparicion (){
  var auxid = 0;
  var auxid5 = 0;
  for (var j=0;j<cont+1;j++){ // Muestra los elementos ocultos
    auxid = ident+j;
    auxid5 = auxid+7;
    $('#'+auxid5).show();
  }
}

function anexado (ident){
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

function anex (item){

}

function eliminar(n,aele){
  var ident = 110+n*100;
  var ident2 = 0;
  var cont = 0;
  var auxid2 = 0;
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
            auxid2 = ident2+j;
            //console.log(aele);
            aele.push(auxid2);
            //console.log("add "+auxid2);
          }
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
    for (var i=ident2+100;i<800;i=i+100){ //Recorrido elementos columna
      //console.log("Fijo "+ident2+" - comparado "+i);
      if ($('#'+ident2).attr("src")==$('#'+i).attr("src")){ //comparacion de elementos iguales en columna
        cont++;
      }else {
        if (cont>1){
          for (var j=0;j<cont+1;j++){ //Remocion de elementos iguales
            auxid = ident+j;
            auxid2 = ident2+j*100;
            //console.log("columna "+auxid2);
            auxid5 = auxid2+7;
            aele.push(auxid2);
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
  //console.log(aele);
}

function rap(){
  for (var k=0;k<cont+1;k++){
    auxid3 = ident+k;
    $('#'+auxid3).show("fast");
    console.log(auxid3);
    //$('#'+auxid).attr("src",$('#'+auxid2).attr("src"));
  }
}

function gravity(){
  $('#14').hide("slow",function(){
    var imagen = $('#15').attr("src");
    $('#14').attr("src",imagen);
    $('#14').show();
  });
}

function gravity2(){
  var pos = $('#15').position();
  $('#15').animate(
    {
      top: "+=100"
    },500, function (){
      $('#14').hide();
    }
  );
  //$('#16').attr("id",15);
}

function barrido(aele){ //Funcion comparacion de elementos iguales en malla
  for (var n=0;n<7;n++){//Barido horizontal
    eliminar(n,aele);
  }
  eliminarElementos(aele);
  selec(aele);
  condiciones();
}

function efectoA (aele){
  aele.forEach(function(){
      $('#'+item).animate({
        opacity: 0.1
      },500,efectoB());
  })
}

function efectoB (aele){
  aele.forEach(function(){
      $('#'+item).animate({
        opacity: 0.1
      },500,function(){

      });
  })
}

function eliminarF(n){
  var ident = 110+n;
  var ident2 = 0;
  var cont = 0;
  var auxid = 0;
  var auxid2 = 0;
  var auxid3 = 0;
  var auxid4 = 0;

  for (var c=0;c<400;c=c+100){ //Recorrido 4 primeros elementos fila
    cont = 0;
    ident2 = ident+c;
    for (var i=ident2+100;i<800;i=i+100){ //Recorrido elementos columna
      if ($('#'+ident2).attr("src")==$('#'+i).attr("src")){ //comparacion de elementos iguales en columna
        cont++;
      }else {
        if (cont>1){
          for (var j=0;j<cont+1;j++){ //Remocion de elementos iguales
            auxid = ident+j;
            auxid2 = ident2+j*100;
            auxid5 = auxid2+7;
            $('#'+auxid2).hide("fast");
            $('#'+auxid2).remove();
            $('#'+auxid5).show();
            //console.log("hide "+auxid2);
            //console.log("show "+auxid5);
          }
          for (var m=0; m<cont+1; m++){
            for (var k=0;k<14;k++){//Reasignacion de ids
              auxid3 = ident2+k+m*100;
              auxid4 = auxid3+1;
              $('#'+auxid4).attr("id",auxid3);
              console.log(auxid4 +" -> "+ auxid3);
            }
          }
          var col = Math.floor(ident/100);
          var sel1 = randomico ();
          var ide = (col*100)+24;
          $('.col-'+col).prepend('<img src="image/'+sel1+'.png" class="elemento" id="'+ide+'">');
          $('#'+ide).hide();
          //console.log("col "+ide);
        }
        selec();
        break;
      }
    }//Fin recorrido elementos columna
  }//Fin recorrido 4 primeros elementos columna
}

function eliminare (item){
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
