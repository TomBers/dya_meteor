Template.RDO.helpers({
showBtn:function(){
  try{
  if(Session.get('params').surveyType == 'DB'){return false;}
  else{return true;}
}catch(e){
  return true;
}
}});

Template.RDO.events({
  'click .chk, touchstart .chk':function(e,template){
    // e.preventDefault();
    template.$( ".chk.checked" ).removeClass( "checked" );

    e.currentTarget.className = 'chk checked';
    Meteor.call('saveRes',template.data._id,e.currentTarget.id,Session.get('usr'));//, function(e,d){
  }
});
