Template.RDO.rendered = function(){
Session.setDefault(this.data._id,null);
Session.setDefault('usr',Math.random());



}

Template.RDO.events({
  'click paper-button':function(e,template){

    Meteor.call('saveRes',template.data._id,Session.get(template.data._id),Session.get('usr'), function(e,d){

    })
  },
  'click paper-radio-button':function(e,template){
    // console.log(template);
    Session.set(template.data._id,e.target.label_);
  }
});
