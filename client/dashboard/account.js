

Template.account.helpers({
  loggedIn: function(){
     return Meteor.userId();
  }
});

var SurveyHooks = {
  before: {
    insert: function(doc) {
      doc.owner = Meteor.userId();
      return doc;
    }
  }
}

AutoForm.addHooks('makeSurvey', SurveyHooks);
