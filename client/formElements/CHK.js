Template.CHK.rendered = function(){
Session.setDefault('usr',Math.random());
Session.setDefault(this.data._id,[]);
// console.log(this.data);

$('.hider').unbind().on('click',function(evt){
  // console.log(evt);

  $('#'+evt.currentTarget.parentElement.id).hide();
  $('html,body').scrollTop(0);
});

// $('paper-checkbox').unbind().on('change',function(evt){
//   // alert('clicked');
//   var checked = evt.currentTarget.checked;
//   var ans = evt.currentTarget.label_;
//   // console.log(evt.currentTarget.parentElement);
//   var tmp = evt.currentTarget.parentElement.id.split('_');
//   var tid = tmp[0];
//
//   if(!checked){
//     Meteor.call('removeCHK',tid,ans,Session.get('usr'));
//     var tmp = Session.get(tid);
//     tmp.splice(tmp.indexOf(ans),1);
//     Session.set(tid,tmp);
//
//
//   }else{
//     var tmp = Session.get(tid);
//     tmp.push(ans);
//     Session.set(tid,tmp);
//
//     Meteor.call('saveCHK',tid,ans,Session.get('usr'));
//   }
//
// });


}



Template.CHK.helpers({

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
