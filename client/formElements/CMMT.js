Template.CMMT.events({
  'click .cmmt, touchend .cmmt':function(e,template){
    e.preventDefault()
    var cmt = template.find('textarea').value;

    if(cmt != ''){
    var qn = template.data._id;

    Meteor.call('makeComment',qn,Session.get('usr'),cmt);
  }
  sAlert.success('Thanks');
    template.find('textarea').value = '';
  }
});
