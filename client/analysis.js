Session.setDefault('cols',null);
Session.setDefault('opts',null);
Meteor.subscribe('Analysis');
Meteor.subscribe('Comments');
//
Template.analysis.helpers({
  comments: function(){
    return Comments.find({qn:this._id});
  },
  col: function(opt){
    var t = Session.get('opts').indexOf(opt);
    return Session.get('cols')[t];
  },
  cols:function(){
    return Session.get('cols');
  },
  keys:function(opt){
    var tmp =[];
    var i =0;
    Session.get('opts').forEach(function(e){
      // var tc =
      tmp.push({label:e,setCol:Session.get('cols')[i]});
      i++;
    });
    return tmp;
  }
});

Template.analysis.rendered = function(){

  Session.set('cols',this.data.cols);
  Session.set('opts',this.data.opts);

  this.autorun(function () {
    var ratings = [{rating:'Agree Very Important',div:'avi'}
    ,{rating:'Agree Somewhat Important',div:'asi'}
    ,{rating:'Disagree Very Important',div:'dvi'}
    ,{rating:'Disagree Somewhat Important',div:'dsi'}];

    // console.log(this);
    var qn = this._templateInstance.data._id;

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
      var data = drawDat(qn,e.rating);

    if(data.labels.length > 0){
      new Chartist.Line('.'+e.div, data, options, responsiveOptions);
  }

    });





  });



}

function drawDat(qn,rating){

  var hist = Analysis.find({question:qn,rating:rating},{sort: {DateTime:1}}).fetch();
  var lbs = [];
  var series = [];
  var lastVal = [];
  var sides = Session.get('opts');

      for(j=0 ; j < sides.length; j++){
        series[j] = [];
        lastVal[j] = 0;
      }
        // console.log(sides.indexOf('SNP'));

        hist.forEach(function(e){
            lbs.push(e.DateTime.toLocaleTimeString());

            for(var i = 0; i < sides.length;i++){
              if(sides.indexOf(e.res) == i){
                series[sides.indexOf(e.res)].push(e.total);
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
