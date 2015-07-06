

Template.graph.helpers({
  cnt: function(){
    return Counts.get(''+this._id);
  },
  // res: function(){
  //   return Session.get(this._id+'_res');
  // },
  keys:function(){
    try{
      var colL = this.cols.length;
      var optsL = this.opts.length;

      if( colL > 0 && optsL > 0){
      var tmp =[];
      var i =0;
      var cols = this.cols;
      var count = Session.get(this._id);
      this.opts.forEach(function(e){
        // var tc =
        tmp.push({label:e,setCol:cols[i],count:count[i]});
        i++;
      });
      return tmp;
    }else{
      return null;
    }

    }catch(e){
      return null;
    }

  }
});


Template.graph.rendered = function(){
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

    Session.set(this._templateInstance.data._id,series);

    var data = {
      labels: labels,
      series: series
    };

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
      new Chartist.Bar('#'+qn, data, {distributeSeries: true});

    // new Chartist.Pie('#'+qn, data,options,responsiveOptions);
  }


  });


}
