Template.getEmail.events({
  'submit #getContact':function(e,t){
    e.preventDefault();

    var em = t.find('#emTxt').value;
  // console.log(em);
  //   console.log(t);
    var lnk = t.data.params.endLink;

    Meteor.call('storeContact',t.data.params._id,em,function(e,d){
      if (typeof lnk != 'undefined'){
        window.location.assign(lnk);
      }else{
        Router.go('/');
      }
    })
  },
  'click #skipContact':function(e,t){
    e.preventDefault();
    var lnk = t.data.params.endLink;
    if (typeof lnk != 'undefined'){
      window.location.assign(lnk);
    }else{
      Router.go('/');
    }
  }
});
