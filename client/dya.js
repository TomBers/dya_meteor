// Session.setDefault('started',false);
Session.setDefault('started',true);
Session.setDefault('usr',Math.random());

Template.dya.helpers({
  isSLD: function(){
    return this.type === 'SLD' && Session.get('started');
  },
  isCHK: function(){
    return this.type === 'CHK' && Session.get('started');
  },
  isRDO: function(){
    return this.type === 'RDO' && Session.get('started');
  },
  isLND: function(){
    return this.type === 'LND' && !Session.get('started');
  },
  started: function(){
    return Session.get('started');
  }

})

Template.dya.events({
  'click button.finished':function(e,template){
    Session.keys = {};
    Session.setDefault('started',false);
    Session.setDefault('usr',Math.random());

      // alert('Thank you');
      // location.reload();
  }
});
