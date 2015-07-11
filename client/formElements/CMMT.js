Template.CMMT.events({
  // , touchend .cmmt
  'click .cmmt':function(e,template){
    e.preventDefault()
    var cmt = template.find('textarea').value;

    if(cmt != ''){
    var qn = template.data._id;

    Meteor.call('makeComment',qn,Session.get('usr'),cmt,0);
  }
  sAlert.success('Thanks');
    template.find('textarea').value = '';
  }
});
