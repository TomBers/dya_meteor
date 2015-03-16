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
      labels: fdat[0],
      series: fdat[1]
    };



    var options = {
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
      labelOffset: 80,
      chartPadding: 20
    }]
  ];


    var sum = function(a, b) { return a + b };

    new Chartist.Pie('#'+qn, data,options,responsiveOptions);


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
