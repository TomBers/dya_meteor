Template.results.helpers({
    drawGraph:function(type){
      if(type == "RI" || type == "LND"){return false;}
      else{return true;}

    },
    notLND:function(type){
      if(type == "LND"){return false;}
      else{return true;}

    }
})
