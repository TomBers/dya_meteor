Session.setDefaultPersistent('usr', Random.fraction());

// Session.setDefault('started',false);
Session.setDefault('page',0);
Session.setDefault('surveyLength',0);
Session.setDefault('params',null);


Template.dya.helpers({
  isSLD: function(){
    return this.type === 'SLD';
  },
  isCHK: function(){
    return this.type === 'CHK';
  },
  isRDO: function(){
    return this.type === 'RDO';
  },
  isLND: function(){
    return this.type === 'LND';
  },
  isRI: function(){
    return this.type === 'RI';
  },
  isVID: function(){
    return this.type === 'VID';
  },
  showLND: function(){

    return Session.get(this.survey+'_showLND');
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
  Session.setDefaultPersistent(this.data.params.title+'_showLND',true);

  sAlert.config({
       effect: 'stackslide',
       position: 'top',
       timeout: 1000
   });

}

Template.dya.events({
  'click button.finished, touchstart button.finished':function(e,template){
    var tmpS = Session.get('params');
    // Session.keys = {};
    Session.clear();
    Session.setPersistent(tmpS.title+'_showLND',true);
    Session.update('usr', Random.fraction());
    Session.set('params',tmpS);
  },
  'click .hider,.starter, touchstart .hider,.starter':function(e,template){
    Session.setPersistent(Session.get('params').title+'_showLND',false);

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
