Template.RDO.rendered = function(){
Session.setDefault('usr',Math.random());

$('.hider').unbind().on('click',function(evt){
  // console.log(evt);

  $('#'+evt.currentTarget.parentElement.id).hide();
  $('html,body').scrollTop(0);
});

// $('paper-radio-button').unbind().on('change',function(evt){
//   var ans = evt.currentTarget.label_;
//   // console.log(evt);
//
//   var ans = evt.currentTarget.label_;
//   var tmp = evt.currentTarget.parentElement.parentElement.id.split('_');
//   var tid = tmp[0];
//
//   Meteor.call('saveRes',tid,ans,Session.get('usr'));
// });

}


Template.RDO.events({
//   'click paper-button':function(e,template){
//     $('#'+template.data._id).parent().hide();
//     // Meteor.call('saveRes',template.data._id,Session.get(template.data._id),Session.get('usr'), function(e,d){
//
//     // })
//   },
  'click .rdo':function(e,template){
    // alert('BOB');
    // alert(e.currentTarget.value);
    Meteor.call('saveRes',template.data._id,e.currentTarget.value,Session.get('usr'));//, function(e,d){
    // Session.set(template.data._id,e.target.label_);
  }
});
