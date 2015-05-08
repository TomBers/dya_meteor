Template.showCmmts.rendered = function(){
  Meteor.subscribe('Comments',this.data._id);
}

Template.showCmmts.helpers({
comments: function(){
  return Comments.find({qn:this._id});
}
})
