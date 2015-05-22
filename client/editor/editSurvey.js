Template.editSurvey.events({
"change .isVisible input": function (event) {
  Meteor.call('changeVisible',this._id,event.currentTarget.checked);
}
});

Template.editSurvey.helpers({
  showVisible: function(){
    return this.type != 'LND';
  },
  isRI: function(type){
    if(type =='RI'){return true;}
    else{return false;}
  }
});

Template.editSurvey.rendered = function(){
  Session.set('surveyName',this.data.survey.title);
}

var postHooks = {
  before: {
    insert: function(doc) {
      doc.survey = Session.get('surveyName');
      if(doc.type == 'LND'){
        doc.order = 0;
      }
      return doc;
    }
  }

}

AutoForm.addHooks('makeQn', postHooks);
