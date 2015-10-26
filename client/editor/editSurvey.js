Template.editSurvey.rendered = function(){
  // console.log(this.data);
  Session.set('surveyName',this.data.survey.title);
  Session.set('surveyId', this.data.survey._id);
  Session.set('surveyLength', Questions.find().fetch().length);
}

Template.editQn.events({
  "change .isVisible input": function (e,t) {
    Meteor.call('changeVisible',this._id,e.target.checked);
  },
  "click .btn-danger":function(e,t){
    // console.log(t);
    Session.set('toDel',t.data._id);
  },
  "click .btn-warning":function(e,t){
    var r = confirm("This will clear all data");
    if (r == true) {
      Meteor.call("clearDebate", t.data._id,false, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          alert('Cleared');
        }
      });
    } else {
    }
  },
  "click .btn-danger":function(e,t){

    var r = confirm("This will delete this question");
    if (r == true) {
      var tmp = Session.get('surveyLength');
      Session.set('surveyLength',--tmp);
      Meteor.call("clearDebate", t.data._id,true, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          alert('Cleared');
        }
      });
    } else {
    }
  }
});

Template.editSurvey.helpers({
  qns: function(){
  return Questions.find({},{sort: {order:1}});
}
});


Template.editQn.helpers({
  isRI: function(type){
    if(type =='RI'){return true;}
    else{return false;}
  }
});
