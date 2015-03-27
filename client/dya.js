Session.setDefaultPersistent('usr', Random.fraction());

Session.setDefault('started',false);
Session.setDefault('page',0);
Session.setDefault('surveyLength',0);
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
  isRI: function(){
    return this.type === 'RI' && Session.get('started');
  },
  started: function(){
    return Session.get('started');
  },
  showFinish:function(){
  
    try{
    if(Session.get('params').surveyType == 'CS' && Session.get('started')){return true;}
    else{return false;}
  }catch(e){}
  return false;
  }
})

Template.dya.rendered = function(){
  Session.set('params',this.data.params);
  Session.set('surveyLength',this.data.questions.length);

}

Template.dya.events({
  'click button.finished':function(e,template){
    var tmpS = Session.get('params');
    // Session.keys = {};
    Session.clear();
    Session.setDefault('started',false);
    Session.update('usr', Random.fraction());
    Session.set('params',tmpS);
  },
  'click .hider,.starter':function(e,template){
    Session.set('started',true);

    if(Session.get('params').surveyType == 'SP'){
      Session.set('page',Session.get('page')+1);

      if(Session.get('page') >= Session.get('surveyLength') ){
        window.location.assign(Session.get('params').endLink);
      }else{
        Router.go('/'+Session.get('params').title+'/'+Session.get('page'));
      }




    }else{
      // console.log(e);
    $('#'+e.currentTarget.parentNode.parentNode.id).hide();
    $('html,body').scrollTop(0);
  }
  }



});
