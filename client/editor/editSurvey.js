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
