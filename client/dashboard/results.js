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
    },
    cols:function(){
      try{
      var cls = [];
      this.survey.cols.forEach(function(e){
        cls.push(e.col);
      })
      Session.set('cols',cls);
      return null;
    }catch(e){
      return null;
    }

    },
    modQns:function(){
      this.questions.forEach(function(e){
        e.cols = Session.get('cols');
      })
      return this.questions;


    }
})
