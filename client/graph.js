Template.graph.helpers({
  getCol:function(j){
    try{
      var cl = Session.get('cols');
    if(cl.length >= j){
    return cl[j];
  }else{
    return null;
  }
}catch(e){
  return null;
}
  },
  cnt: function(){
    return Counts.get(''+this._id);
  },
  // res: function(){
  //   return Session.get(this._id+'_res');
  // },
  keys:function(c){
    var prms = Session.get(c);
    if(Array.isArray(prms) && prms.length > 0){return prms;}
    else{return null;}

  }
});


Template.graph.rendered = function(){
  Session.setDefault('showAsBar', false);
  console.log(this.data);
  Session.set('cols',this.data.cols);
  Meteor.subscribe('Votes',this.data._id);
  Meteor.subscribe('Count',this.data._id);

  Session.setDefault(this.data._id,null);

  this.autorun(function (template) {
    var qn = this._templateInstance.data._id;
    var labels = this._templateInstance.data.opts;



    var responses = Votes.find({qn:qn},{fields :{res :1 }}).fetch();

    var series = [];
    for(i = 0;i < labels.length;i++){
      series[i] = 0;
    }
    var cnt = 0;
    responses.forEach(function(key,value){
      series[labels.indexOf(key.res)]++;
      cnt++;
    });



    var data = {
      labels: labels,
      series: series
    };

    var tmpDat=[];

    var t = Session.get('cols');
    for(i = 0 ; i < labels.length; i++){
      tmpDat.push({label:labels[i],value:series[i],col:t[i]});
    }
    Session.set(this._templateInstance.data._id,tmpDat);


    var options = {
      donut: true
      ,donutWidth:90,
      showLabel: false

  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      // labelInterpolationFnc: function(value) {
      //   return value;
      // }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: -20,
      chartPadding: 0
    }]
  ];


    var sum = function(a, b) { return a + b };
    if(cnt > 0){
      if (Session.get('showAsBar')) {
        new Chartist.Bar('#'+qn, data, {distributeSeries: true});
      }
        else{
          new Chartist.Pie('#'+qn, data,options,responsiveOptions);
        }
  }


  });


}
