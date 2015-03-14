Meteor.subscribe('votes');
Meteor.subscribe('comments');


Session.setDefault('usr',Math.random());
Session.setDefault('agree',0);
Session.setDefault('neutral',0);
Session.setDefault('disagree',0);
Session.setDefault('side','Neutral');
Session.setDefault('sideNo',1);
Session.setDefault('voted',false);
data = {
series: [1, 1, 1]
};

var sum = function(a, b) { return a + b };

Template.SLD.rendered = function(){



$('paper-slider').on('change',function(evt){
  Session.set('voted',true);

  switch(evt.target.immediateValue_){
    case 0: Session.set('side','Disagree');break;
    case 1: Session.set('side','Neutral');break;
    case 2: Session.set('side','Agree');break;
  }


  Meteor.call('vote',Session.get('debate'),Session.get('usr'),Session.get('side'));

  // console.log(evt);

});



this.autorun(function () {
  Session.set('debate',Router.current().location.get().path.substring(1));
  var vtes = Votes.find({debate:Session.get('debate')});


  mypie = new Chartist.Pie('.ct-chart', data,{donut: true,showLabel:false,donutWidth:90});

  $('paper-tab').on('down', function(evt){

    Session.set('voted',true);
    Session.set('side',evt.currentTarget.id);
    Meteor.call('vote',Session.get('debate'),Session.get('usr'),evt.currentTarget.id);
  });



  $('core-icon-button').on('click', function(evt){
    var com = $('.the_item').val();
    if(com != ''){
         Meteor.call('comment',Session.get('debate'),Session.get('usr'),Session.get('side'),com);
       }
         $('.the_item').val('');
  });

  $('input').keypress(function(e){
    if(e.charCode == 13){
      var com = $('.the_item').val();
      if(com != ''){
           Meteor.call('comment',Session.get('debate'),Session.get('usr'),Session.get('side'),com);
         }
           $('.the_item').val('');

    }
  });



  if(Session.get('agree') == 0 && Session.get('neutral') == 0 && Session.get('disagree') ==0){
    var data = {
    series: [1, 1, 1]
  };
}else{
  data = {
    series: [Session.get('agree'),Session.get('neutral'),Session.get('disagree')]
  };
}
  mypie.update(data);

});

};

Template.SLD.helpers({
  usr: function () {
    return Session.get('usr');
  },
  side:function(){
    var sd;
    try{
    tsd = Votes.findOne({debate:Session.get('debate'),usr:Session.get('usr')});
    sd = tsd.side;
    switch (tsd.side){
      case 'Disagree' : Session.set('sideNo',0);break;
      case 'Neutral' : Session.set('sideNo',1);break;
      case 'Agree' : Session.set('sideNo',2);break;
    }
  }catch(e){}
    return sd || 'Neutral';
  },
  sideNo:function(){
    return Session.get('sideNo');
  },
  showGraph:function(){
    return Session.get('voted');
  },
  agree: function () {
    var ta = Votes.find({debate:Session.get('debate'),side:'Agree'}).fetch().length;
    Session.set('agree',ta);
    return ta;
  },
  neutral: function () {
    var tn = Votes.find({debate:Session.get('debate'),side:'Neutral'}).fetch().length;
    Session.set('neutral',tn);
    return tn;
  },
  disagree: function () {
    var td = Votes.find({debate:Session.get('debate'),side:'Disagree'}).fetch().length;
    Session.set('disagree',td);
    return td;
  },
  total: function () {
    return Session.get('agree') + Session.get('neutral') + Session.get('disagree');
  }

});
