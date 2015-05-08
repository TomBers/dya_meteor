Template.results.helpers({
    drawGraph:function(type){
      if(type == "RI" || type == "LND" || type=='CMMT'){return false;}
      else{return true;}
    },
    isRI:function(type){
      if(type == "RI"){return true;}
      else{return false;}
    },
    isCMMT:function(type){
      if(type == "CMMT"){return true;}
      else{return false;}
    }
})
