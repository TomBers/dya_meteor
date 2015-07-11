Template.RI.rendered = function(){

// $('#'+this.data._id+'_CMMT').hide();
Session.setDefault(this.data._id,'');
Session.setDefault(this.data._id+'_dya','');




}

Template.RI.events({
  // , touchend .chk
  'click .chk':function(e,template){
    e.preventDefault()
    var pos = e.currentTarget.parentElement.previousElementSibling.innerText;

    var rank = e.currentTarget.innerText;
    Meteor.call('regInterest',template.data._id,Session.get('usr'),pos,rank, function(e,d){
    });
    sAlert.success('You '+rank+' with '+pos);
    // alert('You '+rank+' with '+pos);
  },
  // , touchend .qry
  'click .qry':function(e,template){
    $('#'+template.data._id+'_PI').hide();
    $('#'+template.data._id+'_CMMT').show();
  },
  // , touchend .cmmt
  'click .cmmt':function(e,template){
    e.preventDefault()
    var cmt = template.find('textarea').value;

    if(cmt != ''){
    var qn = template.data._id;

    Meteor.call('makeComment',qn,Session.get('usr'),cmt);
  }
  sAlert.success('Thanks');
    template.find('textarea').value = '';
    $('#'+template.data._id+'_PI').show();
    $('#'+template.data._id+'_CMMT').hide();

  }

});
