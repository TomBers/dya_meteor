Template.dya.rendered = function(){
  Session.set('params',this.data.params);
  Session.setDefaultPersistent('usr', Random.fraction());
  Session.setDefaultPersistent(this.data.params.title+'_showLND',true);
  Session.set('hicn','glyphicon-chevron-right');

  sAlert.config({
    effect: 'stackslide',
    position: 'top',
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
  // isLND: function(){
  //   return this.type === 'LND';
  // },
  isRI: function(){
    return this.type === 'RI';
  },
  isVID: function(){
    return this.type === 'VID';
  },
  showLND: function(){
    return Session.get(this.params.title+'_showLND');
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
      Session.set('hicn', 'glyphicon-chevron-left');
      qnV=true;
    }else{
      $(".ansView").fadeOut(function(){
        $(".qnView").fadeIn();
      });
      Session.set('hicn', 'glyphicon-chevron-right');
      qnV=false;
    }
  },
  'click button.finished, touchstart button.finished':function(e,template){
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
    var lnk = template.data.params.endLink;
    if (typeof lnk != 'undefined'){
      window.location.assign(lnk);
    }else{
      Router.go('/');
    }
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
