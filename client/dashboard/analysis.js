
Template.analysis.helpers({
  comments: function(){
    return Comments.find({qn:this._id});
  },
  col: function(opt){
    try{
    var t = Session.get('opts').indexOf(opt);
    return Session.get('cols')[t];
  }catch(e){
    return null;
  }
  },
  cols:function(){
    return Session.get('cols');
  },
  keys:function(){
    var tmp =[];
    var i =0;
    if(Session.get('opts')){
      Session.get('opts').forEach(function(e){
        // var tc =
        tmp.push({label:e,setCol:Session.get('cols')[i]});
        i++;
      });
      return tmp;
    }else{return null;}
  }
});



Template.analysis.rendered = function(){

  // console.log(this.data);
  Session.setDefault('cols',null);
  Session.setDefault('opts',null);
  Meteor.subscribe('Analysis');
  Meteor.subscribe('Comments');

  Session.set('cols',this.data.cols);
  Session.set('opts',this.data.opts);
  var ratings = [];
  this.data.piOpts.forEach(function(key,val){
    ratings.push({rating:key,div:key});
  });

  this.autorun(function () {


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
  var div = Math.floor(hist.length/15);
  var cnt = 0;

  hist.forEach(function(e){
    if((cnt % div) == 0 || div == 0){
      lbs.push(e.DateTime.toLocaleTimeString());

      for(var i = 0; i < sides.length;i++){
        if(sides.indexOf(e.res) == i){
          series[sides.indexOf(e.res)].push(e.total);
          lastVal[i] = e.total;
        }else{
          series[i].push(lastVal[i]);
        }
      }
    }
    cnt++;
  });
  return {
    labels: lbs,
    series: series
  };
}
