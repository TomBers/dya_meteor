// Session.setDefault('started',false);
Session.setDefault('started',false);
Session.setDefault('usr',Math.random());
Session.setDefault('page',0);
Session.setDefault('params',null);

Template.dya.helpers({
  isSLD: function(){
    return this.type === 'SLD' && Session.get('started');
  },
  isCHK: function(){
    return this.type === 'CHK' && Session.get('started');
  },
  isRDO: function(){
    return this.type === 'RDO' && Session.get('started');
  },
  isLND: function(){
    return this.type === 'LND' && !Session.get('started');
  },
  started: function(){
    return Session.get('started');
  },
  showFinish:function(){
    if(Session.get('params').surveyType == 'CS' && Session.get('started')){return true;}
    else{return false;}
  }
})

Template.dya.rendered = function(){
  Session.set('params',this.data.params);
  // if(!this.data.params.showLND){Session.set('started',true);}
}

Template.dya.events({
  'click button.finished':function(e,template){
    Session.keys = {};
    Session.setDefault('started',false);
    Session.setDefault('usr',Math.random());
  },
  'click .hider,.starter':function(e,template){
    Session.set('started',true);

    if(Session.get('params').surveyType == 'SV'){
      Session.set('page',Session.get('page')+1);


      if(Session.get('page') <= Session.get('params').noPages){
        Router.go('/'+Session.get('params').survey+'/'+Session.get('page'));
      }else{
        window.location = Session.get('params').endLink;
      }
    }else{
      // console.log(e);
    $('#'+e.currentTarget.parentNode.parentNode.id).hide();
    $('html,body').scrollTop(0);
  }
  }



});
