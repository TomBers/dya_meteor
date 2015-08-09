

Template.SML.helpers({
  checked:function(tpe){
    if(Session.get(this._id) == tpe){return 'checked'}
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

Template.SML.rendered = function(){
  Session.setDefaultPersistent(this.data._id,"");
}

Template.SML.events({
  // , touchstart .chk
  'click .chk':function(e,template){
    // e.preventDefault();
    sAlert.success('Your decision has been noted');
    var uopt = e.currentTarget.id.split('_')[1];
    Session.update(template.data._id,uopt);

    var slab = '';
    switch (uopt) {
      case 'HSM': slab = 'Positive';
        break;
        case 'NSM':slab = 'Neutral';
        break;
        case 'SSM': slab = 'Negative'
        break;
    }
    Meteor.call('saveRes',template.data._id,slab,Session.get('usr'));//, function(e,d){
  }
});
