Template.editSurvey.events({
"change .isVisible input": function (event) {
  Meteor.call('changeVisible',this._id,event.currentTarget.checked);
}
});
