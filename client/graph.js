Template.graph.helpers({
  cnt: function(){
    return Count.find({qn:this._id}).fetch().length;
  },
  res: function(){
    return Session.get(this._id+'_res');
  }
});

// Template.graph.helpers({
//   qnID: function(){
//     return Session.get('qn');
//   }
// });

Template.graph.rendered = function(){
  Meteor.subscribe('Votes');
  Meteor.subscribe('Count');
//   Session.set(this.data._id)
// console.log(this);
  // console.log(this.data._id);


  this.autorun(function (template) {
    var qn = this._templateInstance.data._id;
    var labels = this._templateInstance.data.opts;

    // console.log(template);
    // console.log(this);
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

    var options = {
      donut: true
      ,donutWidth:90,
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: -20,
      chartPadding: 0
    }]
  ];


    var sum = function(a, b) { return a + b };
    if(cnt > 0){
    new Chartist.Pie('#'+qn, data,options,responsiveOptions);
  }


  });


}
