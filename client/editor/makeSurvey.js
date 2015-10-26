var SurveyHooks = {
  before: {
    insert: function(doc) {
      doc.owner = Meteor.userId();
      var tmpC = [{col : "#2D3C4D"},{col:'#DF8503'},{col:'#2C4E86'},{col:'#60BAE3'},{col:'#68468F'},{col:'#64AB23'}];

      doc.title = doc.title.replace(/ /g,"_");
      if(!doc.cols){
        doc.cols = tmpC;
      }else{
        for(var i = doc.cols.length; i < tmpC.length;i++){
          doc.cols[i] = tmpC[i];
        }
      }

      return doc;
    }
  },
  onSuccess: function(operation, result, template) {
    Router.go('/account');
  }
}

AutoForm.addHooks('insertSurveyForm', SurveyHooks);
