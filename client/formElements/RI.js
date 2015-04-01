Template.RI.rendered = function(){
Session.setDefault(this.data._id,'');
Session.setDefault(this.data._id+'_rank','');
Session.setDefault(this.data._id+'_dya','');

$('#'+this.data._id+'_RANK').hide();
$('#'+this.data._id+'_CMMT').hide();

}

Template.RI.events({
  'click .chk.agree':function(e,template){

    // console.log(e.currentTarget.previousElementSibling.innerText);
    template.$( ".chk.checked" ).removeClass( "checked" );
    e.currentTarget.className = 'chk agree checked';
    Session.set(template.data._id,e.currentTarget.previousElementSibling.innerText);
    Session.set(template.data._id+'_dya','Agree');

    $('#'+template.data._id+'_RANK').show();
    $('#'+template.data._id+'_PI').hide();
  },
  'click .chk.disagree':function(e,template){

    template.$( ".chk.checked" ).removeClass( "checked" );
    e.currentTarget.className = 'chk disagree checked';
    Session.set(template.data._id,e.currentTarget.previousElementSibling.previousElementSibling.innerText);
    Session.set(template.data._id+'_dya','Disagree');

    $('#'+template.data._id+'_RANK').show();
    $('#'+template.data._id+'_PI').hide();
  },
  'click .scale':function(e,template){
    template.$( ".chk.checked" ).removeClass( "checked" );

    $('#'+template.data._id+'_PI').hide();
    $('#'+template.data._id+'_RANK').hide();
    $('#'+template.data._id+'_CMMT').show();
    Session.set(template.data._id+'_rank', Session.get(template.data._id+'_dya')+' '+e.currentTarget.innerText);
    var rank = Session.get(template.data._id+'_dya')+' '+e.currentTarget.innerText;

    Meteor.call('regInterest',template.data._id,Session.get('usr'),Session.get(template.data._id),rank, function(e,d){

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
