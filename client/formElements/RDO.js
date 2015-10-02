

Template.RDO.helpers({
  checked:function(qn){
    if(Session.get(qn._id) === qn._id+'_'+this.valueOf()){return 'checked'}
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

Template.RDO.rendered = function(){
  Session.setDefaultPersistent(this.data._id,"");
}

Template.RDO.events({
  // , touchstart .chk
  'click .chk':function(e,template){
    sAlert.success('Your decision has been noted');
    Session.update(template.data._id,e.currentTarget.id);
    Meteor.call('saveRes',template.data._id,e.target.textContent,Session.get('usr'));
  }
});
