Router.configure({
layoutTemplate: 'layout',
waitOn: function() {
  Meteor.subscribe('Survey');
  return Meteor.subscribe('Questions'); },
  fastRender: true
// data: function() {
//   return {Questions : Questions.find().fetch()}
// }
});



Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'home'
  });

  // this.route('/create', {
  //   path: '/create',
  //   template: 'create'
  // });

  this.route('results', {
    path: '/results/:_id',
    template: 'results',
    data: function() {
      return {questions : Questions.find({survey:this.params._id},{sort: {order:1}}).fetch()};
    }
  });

  this.route('/makeQn', {
    path: '/makeQn/:_id',
    template: 'makeQn',
    data: function(){
      return {survey:this.params._id};
    }
  });

  this.route('/editQn', {
    path: '/editQn/:_id',
    template: 'editQn',
    data: function() {
      // console.log(Questions.findOne({_id:this.params._id}).fetch());
      return Questions.findOne({_id:this.params._id});
    }
  });

  this.route('/createSurvey', {
    path: '/createSurvey',
    template: 'makeSurvey'
  });

  this.route('/editSurvey', {
    path: '/editSurvey/:_id',
    template: 'editSurvey',
    data: function() {
      return {survey:Survey.findOne({title:this.params._id}), questions: Questions.find({survey:this.params._id},{sort: {order:1}}).fetch()};
    }
  });

  // this.route('/editSurvey', {
  //   path: '/editSurvey/:_id',
  //   template: 'editSurvey',
  //   data: function() {
  //     return {questions : Questions.find({survey:this.params._id},{sort: {order:1}}).fetch()};
  //   }
  // });



  this.route('analysis', {
    path: '/analysis/:_id',
    template: 'analysis',
    data: function() {
      return Questions.findOne({_id:this.params._id});
    }
  });

  this.route('admin', {
    path: '/admin/',
    template: 'admin',
    data: function() {
      return {Questions : Questions.find({},{sort: {DateTime:-1}}).fetch()};
    }
  });


  this.route('edit', {
    path: '/edit/:_id',
    template: 'create',
    data: function() {
      return Questions.findOne({_id:this.params._id});
    }
  });

  this.route('clear', {
    path: '/clear/:_id',
    template: 'clear',
    data: function() {
      return  Questions.findOne({_id:this.params._id});
    }
  });

  this.route('del', {
    path: '/del/:_id',
    template: 'del',
    data: function() {
      return this.params._id;
    }
  });

  this.route('debate', {
    path: '/debate/:_id',
    template: 'dya',
    data: function() {
      console.log('debate');
      var tmpQ = Questions.find({survey:this.params._id,visible:true},{sort: {order:1}}).fetch();
      var tmpParam = Survey.findOne({title:this.params._id});
      tmpParam.surveyType = "DB";
      console.log(tmpParam);
      return {questions : tmpQ,params:tmpParam};
    }
  });

  this.route('tablet', {
    path: '/tablet/:_id',
    template: 'dya',
    data: function() {
      var tmpQ = Questions.find({survey:this.params._id,visible:true},{sort: {order:1}}).fetch();
      var tmpParam = Survey.findOne({title:this.params._id});
      tmpParam.surveyType ='CS';
      return {questions : tmpQ,params:tmpParam};
    }
  });

  this.route('singleView', {
    path: '/:_id/:page',
    template: 'dya',
    data: function() {
      var tmpQ = Questions.find({survey:this.params._id,visible:true},{sort: {order:1}, limit:1,skip:parseInt(this.params.page)}).fetch();
      var tmpParam = Survey.findOne({title:this.params._id});
      return {questions : tmpQ,params:tmpParam};

    }
  });

  this.route('dya', {
    path: '/:_id',
    template: 'dya',
    data: function() {
      return {questions : Questions.find({survey:this.params._id,visible:true},{sort: {order:1}}).fetch(),params:Survey.findOne({title:this.params._id})};
    }
  });



  // this.route('Questions', {
  //   path: '/:_id',
  //   template: 'dya',
  //   data: function() {
  //     return Questions.findOne({_id:this.params._id});
  //   }
  // });

});
