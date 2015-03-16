Template.RDO.rendered = function(){
Session.setDefault('usr',Math.random());

}

Template.RDO.events({
  'click paper-button':function(e,template){
    $('#'+template.data._id).parent().hide();
    // Meteor.call('saveRes',template.data._id,Session.get(template.data._id),Session.get('usr'), function(e,d){

    // })
  },
  'click paper-radio-button':function(e,template){
    // console.log(template);
    Meteor.call('saveRes',template.data._id,e.target.label_,Session.get('usr'));//, function(e,d){
    // Session.set(template.data._id,e.target.label_);
  }
});
