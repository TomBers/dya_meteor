

Session.setDefault('usr',Math.random());
Session.setDefault(''+this._id,[]);
console.log(this);
Session.set('SLYEEjg6MAyfy8gf7',[]);

Template.CHK.helpers({

  visible: function(){
    // console.log(Template.parentData());
    if(Template.parentData().dependsOn){
  return Session.get(Template.parentData().dependsOn).indexOf(this.valueOf()) > -1;
}else{
  return true;
}
}
})

Template.CHK.events({
  'click paper-button':function(e,template){
    $('#'+template.data._id).parent().hide();
    // Meteor.call('saveRes',template.data._id,Session.get(template.data._id),Session.get('usr'), function(e,d){

    // })
  },
  'click paper-checkbox':function(e,template){

    // console.log(e.currentTarget.checked_);

    if(e.currentTarget.checked_){
      Meteor.call('removeCHK',template.data._id,e.target.label_,Session.get('usr'));
    }else{
      var tmp = Session.get(template.data._id);
      tmp.push(e.target.label_);
      Session.set(template.data._id,tmp);
      // Session.set(template.data._id,Session.get(template.data._id).push(e.target.label_));
      Meteor.call('saveCHK',template.data._id,e.target.label_,Session.get('usr'));
    }

    // if(e.currentTarget._checked){alert('checked');}
    // else{alert('unchecked');}
    // Meteor.call('saveRes',template.data._id,e.target.label_,Session.get('usr'));

  }
});
