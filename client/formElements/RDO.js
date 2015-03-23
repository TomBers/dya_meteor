Template.RDO.rendered = function(){


$('.hider').unbind().on('click',function(evt){
  // console.log(evt);

  $('#'+evt.currentTarget.parentElement.id).hide();
  $('html,body').scrollTop(0);
});

}


Template.RDO.events({
  'click .chk':function(e,template){
    // alert('BOB');
    // alert(e.currentTarget.id);
    template.$( ".chk.checked" ).removeClass( "checked" )


    e.currentTarget.className = 'chk checked';
    Meteor.call('saveRes',template.data._id,e.currentTarget.id,Session.get('usr'));//, function(e,d){
  }
});
