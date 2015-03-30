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
    var ratings = [{rating:'Agree Very Important',div:'avi'}
    ,{rating:'Agree Somewhat Important',div:'asi'}
    ,{rating:'Disagree Very Important',div:'dvi'}
    ,{rating:'Disagree Somewhat Important',div:'dsi'}];


    var qn = this._templateInstance.data;

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


    ratings.forEach(function(e){

      var data = drawDat(qn,e.rating,e.div);
      new Chartist.Line('.'+e.div, data, options, responsiveOptions);
    });





  });



}

function drawDat(qn,rating,div){

  var hist = Analysis.find({question:qn,rating:rating},{sort: {DateTime:1}}).fetch();

        var res = [];
        var lbs = [];
        var rat = [];
        var series = [];
        var lastVal = [];

        hist.forEach(function(e){
        //   if($.inArray(e.res, res) == '-1'){
        //   res.push(res);
        //   }


          if($.inArray(e.res, res) == '-1'){
            res.push(e.res);
            series[res.indexOf(e.res)] = [];
            lastVal[res.indexOf(e.res)] = 0;
          }
        });




        hist.forEach(function(e){
            lbs.push(e.DateTime.toLocaleTimeString());


            for(var i = 0; i < res.length;i++){
              if(res.indexOf(e.res) == i){
                series[res.indexOf(e.res)].push(e.total);
                lastVal[i] = e.total;
              }else{

                series[i].push(lastVal[i]);
              }
            }



        });


        return {
          labels: lbs,
          series: series
        };







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
