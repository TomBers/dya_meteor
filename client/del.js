Template.del.rendered = function(){

Meteor.call('clearDebate'
  ,this.data
  ,true
  ,function(error,data){
    alert('Your Debate has been Cleared.');
    Router.go('/');
  })


}
