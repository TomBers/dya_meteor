Template.dya.rendered = function(){
  Session.set('params',this.data.params);
  Session.setDefaultPersistent('usr', Random.fraction());
  Session.setDefaultPersistent(this.data.params.title+'_showLND',true);
  Session.set('hicn','glyphicon-question-sign');

  sAlert.config({
    effect: 'stackslide',
    position: 'bottom',
    timeout: 1000
  });

  qnV = false;
}


Template.dya.helpers({
  headerIcon:function(){
    return Session.get('hicn');
  },
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
  isRI: function(){
    return this.type === 'RI';
  },
  isVID: function(){
    return this.type === 'VID';
  },
  isSML: function(){
    return this.type === 'SML';
  },
  isSCL: function(){
    return this.type === 'SCL';
  },
  showLND: function(){
    try{
    return Session.get(this.params.title+'_showLND');
  }catch(e){

  }
  },
  showFinish:function(){
    if(this.surveyType == 'SV' && Session.get(this.title+'_showLND') == false){return true;}
    else{return false;}
  }
})



Template.dya.events({
  'click #goToQn':function(e,t){
    if(qnV == false){
      $(".qnView").fadeOut(function(){
        $(".ansView").fadeIn();
      });
      Session.set('hicn', 'glyphicon-comment');
      qnV=true;
    }else{
      $(".ansView").fadeOut(function(){
        $(".qnView").fadeIn();
      });
      Session.set('hicn', 'glyphicon-question-sign');
      qnV=false;
    }
  },
  // , touchstart button.finished
  'click button.finished':function(e,template){
    if(template.data.params.hasOwnProperty('tablet')){
        alert('Thank you');
        Session.update(template.data.params.title+'_showLND',true);
        Session.update('usr', Random.fraction());

        template.data.questions.forEach(function(qn){
          Session.clear(qn._id);
        });
        // Router.go('/tablet/tst');//+template.data.params.title);
        $('html,body').scrollTop(0);
    }else{
      $(".qnView").fadeOut(function(){
        $(".getEmail").fadeIn();
      });

    // var lnk = template.data.params.endLink;
    // if (typeof lnk != 'undefined'){
    //   window.location.assign(lnk);
    // }else{
    //   Router.go('/');
    // }
  }
  },
  // , touchstart .hider,.starter
  'click .hider,.starter':function(e,template){
    Session.setPersistent(template.data.params.title+'_showLND',false);

    // template.$('.starter').hide();
    $('#'+e.currentTarget.parentNode.parentNode.id).hide();
    $('html,body').scrollTop(0);
    // }
  }



});
