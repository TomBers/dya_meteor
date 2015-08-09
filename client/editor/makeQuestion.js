Template.makeQuestion.rendered = function(){
console.log(this);
Session.set('surveyName', this.data.title);
Session.set('surveyId', this.data.id);
 // Meteor.subscribe('Questions',this.params._id);
}

var questionHooks = {
  before: {
    insert: function(doc) {
      doc.survey = Session.get('surveyName');
      var tmp = Session.get('surveyLength')
      doc.order = ++tmp;
      Session.set('surveyLength',tmp);
      doc.visible=true;

      if(doc.type === 'SML'){
        doc.opts = ['Positive','Neutral','Negative'];
      }

      return doc;
    }
  },
  onSuccess: function(operation, result, template) {
    Router.go('/es/'+Session.get('surveyId')+'/'+Session.get('surveyName'));
  }
}

AutoForm.addHooks('insertQuestionForm', questionHooks);


var updateQuestionFormHooks = {
  onSuccess: function(operation, result, template) {
    Router.go('/es/'+Session.get('surveyId')+'/'+Session.get('surveyName'));
    // Router.go('/es/'+this.template.data.doc._id+'/'+this.template.data.doc.title);
  }
}

AutoForm.addHooks('updateQuestionForm', updateQuestionFormHooks);
