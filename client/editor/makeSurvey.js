var SurveyHooks = {
  before: {
    insert: function(doc) {
      doc.owner = Meteor.userId();
      doc.title = doc.title.replace(/ /g,"_");
      return doc;
    }
  },
  onSuccess: function(operation, result, template) {
    Router.go('/account');
  }
}

AutoForm.addHooks('insertSurveyForm', SurveyHooks);
