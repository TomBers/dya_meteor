Template.CHK.rendered = function(){
Session.setDefault('usr',Math.random());
Session.setDefault(this.data._id,[]);
// console.log(this);

}



Template.CHK.helpers({

  visible: function(){
    if(Template.parentData().dependsOn){
      try{
        return Session.get(Template.parentData().dependsOn).indexOf(this.valueOf()) > -1;
      }catch(e){

      }
}else{
  return true;
}
}
})

Template.CHK.events({
  'click paper-button':function(e,template){
    $('#'+template.data._id).parent().hide();

  },
  'click paper-checkbox':function(e,template){


    if(e.currentTarget.checked_){
      Meteor.call('removeCHK',template.data._id,e.target.label_,Session.get('usr'));
      var tmp = Session.get(template.data._id);
      tmp.splice(tmp.indexOf(e.target.label_),1);
      Session.set(template.data._id,tmp);


    }else{
      var tmp = Session.get(template.data._id);
      tmp.push(e.target.label_);
      Session.set(template.data._id,tmp);

      Meteor.call('saveCHK',template.data._id,e.target.label_,Session.get('usr'));
    }

  }
});
