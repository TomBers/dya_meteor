Template.CHK.rendered = function(){
  Session.setDefaultPersistent(this.data._id,[]);
}

Template.CHK.helpers({
  checked:function(qn){
    var tmp = Session.get(qn._id);
    if(_.indexOf(tmp,qn._id+'_'+this.valueOf()) > -1){return 'checked'}
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
  },
  visible: function(){
    if(Template.parentData().dependsOn){
      try{
        // return true;
        return Session.get(Template.parentData().dependsOn).indexOf(this.valueOf()) > -1;
      }catch(e){

      }
}else{
  return true;
}
}
})

Template.CHK.events({
  'click .chk':function(e,template){
    sAlert.success('Your decision has been noted');
    var checked = e.currentTarget.className.split(' ')[1];
    if(checked == 'checked'){
      var tmp = Session.get(template.data._id);
      Session.update(template.data._id, _.without(tmp,e.currentTarget.id));
      // tmp.splice(tmp.indexOf(e.currentTarget.name),1);
      // Session.set(template.data._id,tmp);
      // e.currentTarget.className = 'chk';
      Meteor.call('removeCHK',template.data._id,e.target.textContent,Session.get('usr'));

    }else{
      var tmp = Session.get(template.data._id);
      tmp.push(e.currentTarget.id);
      Session.update(template.data._id,tmp);
      Meteor.call('saveCHK',template.data._id,e.target.textContent,Session.get('usr'));
    }

  }
});
