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
            //auxid = ident+j;
            auxid2 = ident2+j*100;
            //auxid5 = auxid2+7;

            //$('#'+auxid2).hide("fast");
            //$('#'+auxid2).remove();
            //$('#'+auxid5).show();
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
