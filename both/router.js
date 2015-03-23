Router.configure({
layoutTemplate: 'layout',
waitOn: function() { return Meteor.subscribe('debates'); },
  fastRender: true
// data: function() {
//   return {debates : Debates.find().fetch()}
// }
});



Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'home'
  });

  this.route('/create', {
    path: '/create',
    template: 'create'
  });
  this.route('/makeQn', {
    path: '/makeQn',
    template: 'makeQn'
  });

  this.route('/editQn', {
    path: '/editQn/:_id',
    template: 'editQn',
    data: function() {
      // console.log(Debates.findOne({_id:this.params._id}).fetch());
      return Debates.findOne({_id:this.params._id});
    }
  });

  this.route('/editSurvey', {
    path: '/editSurvey/:_id',
    template: 'editSurvey',
    data: function() {
      return {questions : Debates.find({survey:this.params._id},{sort: {order:1}}).fetch()};
    }
  });



  this.route('analysis', {
    path: '/analysis/:_id',
    template: 'history',
    data: function() {
      return this.params._id;
    }
  });

  this.route('admin', {
    path: '/admin/',
    template: 'admin',
    data: function() {
      return {debates : Debates.find({},{sort: {DateTime:-1}}).fetch()};
    }
  });


  this.route('edit', {
    path: '/edit/:_id',
    template: 'create',
    data: function() {
      return Debates.findOne({_id:this.params._id});
    }
  });

  this.route('clear', {
    path: '/clear/:_id',
    template: 'clear',
    data: function() {
      return this.params._id;
    }
  });

  this.route('del', {
    path: '/del/:_id',
    template: 'del',
    data: function() {
      return this.params._id;
    }
  });

  this.route('singleView', {
    path: '/singleView/:_id/:page',
    template: 'dya',
    data: function() {
      return {questions : Debates.find({survey:this.params._id},{sort: {order:1}, limit:1,skip:parseInt(this.params.page)}).fetch()};
    }
  });

  this.route('dya', {
    path: '/:_id',
    template: 'dya',
    data: function() {
      return {questions : Debates.find({survey:this.params._id},{sort: {order:1}}).fetch()};
    }
  });
  this.route('results', {
    path: '/results/:_id',
    template: 'results',
    data: function() {
      return {questions : Debates.find({survey:this.params._id},{sort: {order:1}}).fetch()};
    }
  });


  // this.route('debates', {
  //   path: '/:_id',
  //   template: 'dya',
  //   data: function() {
  //     return Debates.findOne({_id:this.params._id});
  //   }
  // });

});
