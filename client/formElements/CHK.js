Template.CHK.rendered = function(){
Session.setDefault(this.data._id,[]);
}

Template.CHK.helpers({
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
  'click .chk, touchstart .chk':function(e,template){
    sAlert.success('Your decision has been noted');
    
    var checked = e.currentTarget.className.split(' ')[1];


    if(checked == 'checked'){
      Meteor.call('removeCHK',template.data._id,e.currentTarget.id,Session.get('usr'));
      var tmp = Session.get(template.data._id);
      tmp.splice(tmp.indexOf(e.currentTarget.name),1);
      Session.set(template.data._id,tmp);
      e.currentTarget.className = 'chk';

    }else{
      var tmp = Session.get(template.data._id);
      tmp.push(e.currentTarget.id);
      Session.set(template.data._id,tmp);
      e.currentTarget.className = 'chk checked';
      Meteor.call('saveCHK',template.data._id,e.currentTarget.id,Session.get('usr'));
    }

  }
});
