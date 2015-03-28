Template.RI.rendered = function(){
Session.setDefault(this.data._id,'');
Session.setDefault(this.data._id+'_rank','');

$('#'+this.data._id+'_RANK').hide();
$('#'+this.data._id+'_CMMT').hide();

}

Template.RI.events({
  'click .chk':function(e,template){
    // alert('BOB');
    // alert(e.currentTarget.id);
    template.$( ".chk.checked" ).removeClass( "checked" );

    e.currentTarget.className = 'chk checked';
    Session.set(template.data._id,e.currentTarget.id);

    $('#'+template.data._id+'_RANK').show();

    // Save Response
    // Meteor.call('saveRes',template.data._id,e.currentTarget.id,Session.get('usr'));

    // Get a agreement score

    // Offer comment
  },
  'click .scale':function(e,template){
    template.$( ".chk.checked" ).removeClass( "checked" );

    $('#'+template.data._id+'_PI').hide();
    $('#'+template.data._id+'_RANK').hide();
    $('#'+template.data._id+'_CMMT').show();
    Session.set(template.data._id+'_rank',e.currentTarget.innerText);
    Meteor.call('regInterest',template.data._id,Session.get('usr'),Session.get(template.data._id),e.currentTarget.innerText, function(e,d){

    });

    // alert(Session.get(template.data._id));
    // alert(e.currentTarget.innerText);
    // console.log(e);
    // console.log(template);
  },
  'click .cmmt':function(e,template){
    var cmt = template.find('textarea').value;
    var qn = template.data._id;
    var side = Session.get(template.data._id);
    var rank = Session.get(template.data._id+'_rank');

    Meteor.call('makeComment',qn,Session.get('usr'),cmt,side,rank);
    template.find('textarea').value = '';
    $('#'+template.data._id+'_PI').show();
    $('#'+template.data._id+'_RANK').hide();
    $('#'+template.data._id+'_CMMT').hide();

  },
  'click .skip':function(e,template){
    template.find('textarea').value='';
    $('#'+template.data._id+'_PI').show();
    $('#'+template.data._id+'_RANK').hide();
    $('#'+template.data._id+'_CMMT').hide();

  },

});
