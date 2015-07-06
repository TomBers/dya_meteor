

Template.RDO.helpers({
  checked:function(qn){
    if(Session.get(qn._id) == this){return 'checked'}
    else{
    return null;
  }
  },
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
    sAlert.success('Your decision has been noted');
    template.$( ".chk.checked" ).removeClass( "checked" );

    Session.setPersistent(''+template.data._id,e.currentTarget.id);

    e.currentTarget.className = 'chk checked';
    Meteor.call('saveRes',template.data._id,e.currentTarget.id,Session.get('usr'));//, function(e,d){
  }
});
