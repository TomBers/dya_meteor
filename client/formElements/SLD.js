Session.setDefault('usr',Math.random());

Template.SLD.helpers({

  sldLabel: function(){
  return this.opts[''+Session.get(this._id)];
},
  max:function(){
    return this.opts.length - 1;
  },
  startVal:function(){
    return Math.floor( (this.opts.length-1)/2);
  }
})

Template.SLD.events({
  'click paper-button':function(e,template){
    $('#'+template.data._id).parent().hide();
    // Meteor.call('saveRes',template.data._id,Session.get(template.data._id),Session.get('usr'), function(e,d){

    // })
  },
  'change paper-slider':function(e,template){
    Session.set(template.data._id,e.currentTarget.immediateValue_);
      Meteor.call('saveRes',template.data._id,template.data.opts[''+e.currentTarget.immediateValue_],Session.get('usr'));
  }
});
