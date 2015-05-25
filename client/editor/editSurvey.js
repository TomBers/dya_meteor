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

}
});

Template.autoformModals.events({
"click .btn-danger":function(e,t){
  var tmp = Session.get('surveyLength');
  Session.set('surveyLength',--tmp);
  Meteor.call("clearDebate", Session.get('toDel'),false, function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){

    }
  });
}
})

Template.editQn.helpers({
  isRI: function(type){
    if(type =='RI'){return true;}
    else{return false;}
  }
});

Template.editSurvey.rendered = function(){
  Session.set('surveyName',this.data.survey.title);
  Session.set('surveyLength', this.data.questions.length);
}

// AutoForm.hooks({
//       makeQn: {
//         before: {
//            insert: function(doc) {
//              doc.survey = Session.get('surveyName');
//              var tmp = Session.get('surveyLength')
//              doc.order = ++tmp;
//              Session.set('surveyLength',tmp);
//              doc.visible=true;
//              return doc;
//            }
//          },
//         onError: function(operation, error, template) {
//             alert('There was an error with your submission. Please try again.');
//         }
//       },
//       delQn: {
//         removeData : function(){
//           console.log('Bob');
//         },
//         onSuccess: function(operation, result, template) {
//           alert('Thank you for your inquiry! We will get back to you shortly.');
//         },
//         onError: function(operation, error, template) {
//             alert('There was an error with your submission. Please try again.');
//         }
//       }
//     });

var postHooks = {
  before: {
    insert: function(doc) {
      doc.survey = Session.get('surveyName');
      var tmp = Session.get('surveyLength')
      doc.order = ++tmp;
      Session.set('surveyLength',tmp);
      doc.visible=true;
      return doc;
    }
  },
  onSuccess: function(operation, result, template) {
    // alert('Thank you for your inquiry! We will get back to you shortly.');
  }
}


AutoForm.addHooks('makeQn', postHooks);
