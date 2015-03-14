Meteor.subscribe('votes');

// Template.graph.helpers({
//   qnID: function(){
//     return Session.get('qn');
//   }
// });

Template.graph.rendered = function(){
//   Session.set(this.data._id)
// console.log(this);
  // console.log(this.data._id);


  this.autorun(function (template) {
    var qn = this._templateInstance.data._id;
  
    // console.log(template);
    // console.log(this);
    var responses = Votes.find({qn:qn},{fields :{res :1 }}).fetch();
    var all = [];
    responses.forEach(function(key,value){
      all.push(key.res);
    });

    var fdat = formatAndCount(all);
    // var data = {
    //   labels : fdat[0],
    //   series : [ fdat[1] ]
    // };
    // console.log(fdat);

    var data = {
      series: fdat[1]
    };

    var options = {
  width: '300px',
  height: '200px'
};

    var sum = function(a, b) { return a + b };

    new Chartist.Pie('#'+qn, data,options, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });


  });


}

function formatAndCount(arr) {
  var a = [], b = [], prev;

  arr.sort();
  for ( var i = 0; i < arr.length; i++ ) {
    if ( arr[i] !== prev ) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length-1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}
