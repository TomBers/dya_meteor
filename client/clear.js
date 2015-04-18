Template.clear.rendered = function(){
 // console.log(this);
}

Template.clear.helpers({
  survey: function(){
    return this.survey || null;
  },
  qn : function(){
    return this.title || null;
  }
});

Template.clear.events({
  'click button':function(e,template){
    var r = confirm("Are you sure? Data will be lost");
if (r == true) {

  Meteor.call('clearDebate'
    ,template.data._id
    ,template.data._type
    ,false
    ,function(error,data){
      alert('Your Debate has been Cleared.');

    })
} else {

}


}
});
