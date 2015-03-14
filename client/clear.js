Template.clear.rendered = function(){ 

Meteor.call('clearDebate'
  ,this.data
  ,false
  ,function(error,data){
    alert('Your Debate has been Cleared.');
    Router.go('/');
  })


}
