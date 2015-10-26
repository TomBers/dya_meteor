var updateSurveyFormHooks = {
  onSuccess: function(operation, result, template) {
    Router.go('/es/'+this.template.data.doc._id+'/'+this.template.data.doc.title);
  }
}

AutoForm.addHooks('updateSurveyForm', updateSurveyFormHooks);
