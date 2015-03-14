Session.setDefault('dbtID',0);
Meteor.subscribe('history');
Meteor.subscribe('debates');

Template.history.helpers({
  debate: function(){
    return Debates.findOne({_id:Session.get('dbtID')});
  }
});


Template.history.rendered = function(){
  Session.set('dbtID',this.data);

  $( window ).resize(function() {
    setDimensions();
  });

  this.autorun(function () {

    setDimensions();



    if(Session.get('dbtID') != 0){

      var hist = History.find({debate:Session.get('dbtID')},{sort: {DateTime:1}}).fetch();
      var series = [];
      var agree = [];
      var disagree =[];
      var neutral = [];
      // console.log(hist.length);
      var div = Math.floor(hist.length/15);
      var cnt = 0;
      hist.forEach(function(dat){
        // console.log(dat);
        if((cnt % div) == 0){
        series.push(dat.DateTime.toLocaleTimeString());
        agree.push(dat.agree);
        disagree.push(dat.disagree);
        neutral.push(dat.neutral);
      }
      cnt++;
      })

      var options = {
        width: Session.get('ww'),
        height: Session.get('wh'),
        showLabel:false
      };

      var histGraph = new Chartist.Line('.ct-chart', {
        labels: series,
        series: [
          agree,
          neutral,
          disagree
        ]},options);

        // histGraph.update();
      }


      });



    // BAR code

    //   new Chartist.Bar('.ct-chart', {
    //   labels: series,
    //   series: [
    //     agree,
    //     neutral,
    //     disagree
    //   ]
    // }, {
    //   stackBars: true,
    //   axisY: {
    //     labelInterpolationFnc: function(value) {
    //       return (value);
    //     }
    //   }
    // }).on('draw', function(data) {
    //   if(data.type === 'bar') {
    //     data.element.attr({
    //       style: 'stroke-width: 30px'
    //     });
    //   }
    // });


  }

  function setDimensions(){
    Session.set('wh',$(window).height() - 150);
    Session.set('ww',$(window).width() - 50 );

  }
