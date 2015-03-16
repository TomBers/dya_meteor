// Session.set('path',this.location.pathname);
Session.setDefault('started',false);

// Template.dya.rendered = function(){
//
//   $('.finished').on('click',function(evt){
//     alert('Thank you');
//     location.reload();
//   });
// }

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
    var tmp = template.data.questions;
    // console.log(tmp[0].survey);
    Meteor.call('countRes',tmp[0].survey, function(e,d){    
      alert('Thank you');
      location.reload();
    });

  }
});
