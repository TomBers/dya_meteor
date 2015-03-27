// Session.setDefault('dbtID',0);
Meteor.subscribe('Analysis');
// Meteor.subscribe('Questions');
//
// Template.analysis.helpers({
//   debate: function(){
//     return Questions.findOne({_id:Session.get('dbtID')});
//   }
// });
//
//
Template.analysis.rendered = function(){

  this.autorun(function () {
    var hist = Analysis.find({question:'JiekQBmn5qXA9nxrp'},{sort: {DateTime:1}}).fetch();

          var lbs = [];
          var rat = [];
          var series = [];
          var lastVal = [];

          hist.forEach(function(e){
            if($.inArray(e.rating, rat) == '-1'){
              rat.push(e.rating);
              series[rat.indexOf(e.rating)] = [];
              lastVal[rat.indexOf(e.rating)] = 0;
            }
          });
          hist.forEach(function(e){
              lbs.push(e.DateTime.toLocaleTimeString());


              for(var i = 0; i < rat.length;i++){
                if(rat.indexOf(e.rating) == i){
                  series[rat.indexOf(e.rating)].push(e.total);
                  lastVal[i] = e.total;
                }else{

                  series[i].push(lastVal[i]);
                }
              }



          });


          var data = {
            labels: lbs,
            series: series
          };

var options = {
  seriesBarDistance: 15
};

var responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

new Chartist.Bar('.ct-chart', data, options, responsiveOptions);


  });

}


//   Session.set('dbtID',this.data);
//
//   $( window ).resize(function() {
//     setDimensions();
//   });
//
//   this.autorun(function () {
//
//     // setDimensions();
//
//
//
//     // if(Session.get('dbtID') != 0){
//
//       var hist = analysis.find({debate:Session.get('dbtID')},{sort: {DateTime:1}}).fetch();
//       console.log(hist);
//       // var series = [];
//       // var agree = [];
//       // var disagree =[];
//       // var neutral = [];
//       // // console.log(hist.length);
//       // var div = Math.floor(hist.length/15);
//       // var cnt = 0;
//       // hist.forEach(function(dat){
//       //   // console.log(dat);
//       //   if((cnt % div) == 0){
//       //   series.push(dat.DateTime.toLocaleTimeString());
//       //   agree.push(dat.agree);
//       //   disagree.push(dat.disagree);
//       //   neutral.push(dat.neutral);
//       // }
//       // cnt++;
//       // })
//       //
//       // var options = {
//       //   width: Session.get('ww'),
//       //   height: Session.get('wh'),
//       //   showLabel:false
//       // };
//
//       // var histGraph = new Chartist.Line('.ct-chart', {
//       //   labels: series,
//       //   series: [
//       //     agree,
//       //     neutral,
//       //     disagree
//       //   ]},options);
//       //
//       //
//       // }
//
//
//       // });
//
//
//
//     // BAR code
//
//     //   new Chartist.Bar('.ct-chart', {
//     //   labels: series,
//     //   series: [
//     //     agree,
//     //     neutral,
//     //     disagree
//     //   ]
//     // }, {
//     //   stackBars: true,
//     //   axisY: {
//     //     labelInterpolationFnc: function(value) {
//     //       return (value);
//     //     }
//     //   }
//     // }).on('draw', function(data) {
//     //   if(data.type === 'bar') {
//     //     data.element.attr({
//     //       style: 'stroke-width: 30px'
//     //     });
//     //   }
//     // });
//
//
//   }
//
//   function setDimensions(){
//     Session.set('wh',$(window).height() - 150);
//     Session.set('ww',$(window).width() - 50 );
//
//   }
