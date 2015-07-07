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
    modQns:function(){
      // this.questions.forEach(function(e){
      //   e.col = Session.get('cols');
      // })
      return this.questions;
    }
})

Template.results.rendered = function(){
  var tmpCol = [];
  this.data.survey.cols.forEach(function(c){
    tmpCol.push(c.col);
  })
  Session.set('cols',tmpCol);
  // console.log(this.data.survey.cols);
}

Template.results.events({
  "click #showAsBar": function(event, template){
    // console.log(event);
    Session.set('showAsBar',event.currentTarget.checked);

  }
});
