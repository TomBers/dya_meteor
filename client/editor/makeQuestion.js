Template.makeQuestion.rendered = function(){

Session.set('surveyName', this.data.title);
Session.set('surveyId', this.data.id);
}


var questionHooks = {
  before: {
    insert: function(doc) {


      doc.survey = Session.get('surveyName');

      var tmp = Session.get('surveyLength');

      doc.order = ++tmp;
      Session.set('surveyLength',tmp);
      doc.visible=true;

      if(doc.type === 'SML'){
        doc.opts = ['Positive','Neutral','Negative'];
      }
      if(doc.type === 'SCL'){
        doc.opts = ['100%','75%','50%','25%','0%'];
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
  }
}

AutoForm.addHooks('updateQuestionForm', updateQuestionFormHooks);
