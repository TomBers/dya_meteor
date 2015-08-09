var updateSurveyFormHooks = {
  onSuccess: function(operation, result, template) {
    console.log(this.template.data.doc._id);
    console.log(this.template.data.doc.title);
    Router.go('/es/'+this.template.data.doc._id+'/'+this.template.data.doc.title);
  }
}

AutoForm.addHooks('updateSurveyForm', updateSurveyFormHooks);
