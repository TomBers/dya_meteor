Template.RI.rendered = function(){
Session.setDefault(this.data._id,'');
}

Template.RI.events({
  'click .chk':function(e,template){
    // alert('BOB');
    // alert(e.currentTarget.id);
    template.$( ".chk.checked" ).removeClass( "checked" );

    e.currentTarget.className = 'chk checked';
    Session.set(template.data._id,e.currentTarget.id);

    // Save Response
    // Meteor.call('saveRes',template.data._id,e.currentTarget.id,Session.get('usr'));

    // Get a agreement score

    // Offer comment
  },
  'click .scale':function(e,template){
    template.$( ".chk.checked" ).removeClass( "checked" );

    Meteor.call('regInterest',template.data._id,Session.get('usr'),Session.get(template.data._id),e.currentTarget.innerText, function(e,d){
      console.log(e);
      console.log(d);

    });

    // alert(Session.get(template.data._id));
    // alert(e.currentTarget.innerText);
    // console.log(e);
    // console.log(template);
  }
});
