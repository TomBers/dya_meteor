Template.RDO.helpers({
showBtn:function(){

  if(Session.get('params').surveyType == 'DB'){return false;}
  else{return true;}
}});

Template.RDO.events({
  'click .chk':function(e,template){
    template.$( ".chk.checked" ).removeClass( "checked" );

    e.currentTarget.className = 'chk checked';
    Meteor.call('saveRes',template.data._id,e.currentTarget.id,Session.get('usr'));//, function(e,d){
  }
});
