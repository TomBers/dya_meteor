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
  this.route('dya', {
    path: '/dya',
    template: 'dya',
    data: function() {
      return {questions : Debates.find({},{sort: {DateTime:-1}}).fetch()};
    }
  });


  this.route('debates', {
    path: '/:_id',
    template: 'dya',
    data: function() {
      return Debates.findOne({_id:this.params._id});
    }
  });

});
