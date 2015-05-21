Template.dya.rendered = function(){
  Session.setDefaultPersistent('usr', Random.fraction());
  Session.setDefaultPersistent(this.data.params.title+'_showLND',true);
  Session.set('params',this.data.params);
  sAlert.config({
       effect: 'stackslide',
       position: 'top',
       timeout: 1000
   });

}


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
  isCMMT: function(){
    return this.type === 'CMMT';
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
    if(this.surveyType == 'SV' && Session.get(this.title+'_showLND') == false){return true;}
    else{return false;}
  }
})



Template.dya.events({
  'click button.finished, touchstart button.finished':function(e,template){
    var lnk = template.data.params.endLink;
    if (typeof lnk != 'undefined'){
      window.location.assign(lnk);
    }else{
      Router.go('/');
    }
  },
  'click .hider,.starter, touchstart .hider,.starter':function(e,template){
    Session.setPersistent(template.data.params.title+'_showLND',false);

    // template.$('.starter').hide();
    $('#'+e.currentTarget.parentNode.parentNode.id).hide();
    $('html,body').scrollTop(0);
  // }
  }



});
