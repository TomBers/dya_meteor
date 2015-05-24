Router.configure({
layoutTemplate: 'layout',
fastRender: true
// data: function() {
//   return {Questions : Questions.find().fetch()}
// }
});



Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'home',

  });

  // this.route('/create', {
  //   path: '/create',
  //   template: 'create'
  // });

  this.route('results', {
    path: '/results/:_id',
    template: 'results',
    waitOn: function(){
      Meteor.subscribe('Questions',this.params._id);
      return Meteor.subscribe('Survey',this.params._id);
    },
    data: function() {
      return {survey:Survey.findOne({title:this.params._id}),questions : Questions.find({survey:this.params._id},{sort: {order:1}}).fetch()};
    }
  });


  this.route('/ask', {
    path: '/ask/:_survey/:_id',
    template: 'ask',
    waitOn: function(){
      Meteor.subscribe('Survey',this.params._survey);
      return Meteor.subscribe('Comments',this.params._id);
    },
    data: function() {
      return {params:Survey.findOne({title:this.params._survey}),qn:this.params._id,cmmts:Comments.find({qn:this.params._id},{sort: {count:-1}})};
    }
  });

  this.route('/createSurvey', {
    path: '/createSurvey',
    template: 'makeSurvey'
  });

  this.route('/editSurvey', {
    path: '/editSurvey/:_id',
    template: 'editSurvey',
    waitOn: function(){
      Meteor.subscribe('Questions',this.params._id);
      return Meteor.subscribe('Survey',this.params._id);
    },
    data: function() {
      return {survey:Survey.findOne({title:this.params._id}), questions: Questions.find({survey:this.params._id},{sort: {order:1}}).fetch()};
    }
  });



  this.route('track', {
    path: '/track/:_survey/:_id',
    template: 'track',
    waitOn: function(){
      Meteor.subscribe('Survey',this.params._survey);
      return Meteor.subscribe('questionById',this.params._id);
    },
    data: function() {
      return {survey:Survey.findOne({title:this.params._survey}),qn:Questions.findOne({_id:this.params._id})};
    }
  });





  // Need to refactor

  // this.route('debate', {
  //   path: '/debate/:_id',
  //   template: 'dya',
  //   data: function() {
  //     var tmpQ = Questions.find({survey:this.params._id,visible:true},{sort: {order:1}}).fetch();
  //     var tmpParam = Survey.findOne({title:this.params._id});
  //     tmpParam.surveyType = "DB";
  //     return {questions : tmpQ,params:tmpParam};
  //   }
  // });
  //
  // this.route('tablet', {
  //   path: '/tablet/:_id',
  //   template: 'dya',
  //   data: function() {
  //     var tmpQ = Questions.find({survey:this.params._id,visible:true},{sort: {order:1}}).fetch();
  //     var tmpParam = Survey.findOne({title:this.params._id});
  //     tmpParam.surveyType ='CS';
  //     return {questions : tmpQ,params:tmpParam};
  //   }
  // });
  //
  // this.route('singleView', {
  //   path: '/:_id/:page',
  //   template: 'dya',
  //   data: function() {
  //     var tmpQ = Questions.find({survey:this.params._id,visible:true},{sort: {order:1}, limit:1,skip:parseInt(this.params.page)}).fetch();
  //     var tmpParam = Survey.findOne({title:this.params._id});
  //     return {questions : tmpQ,params:tmpParam};
  //
  //   }
  // });

  this.route('dya', {
    path: '/:_id',
    template: 'dya',
    waitOn: function(){
      Meteor.subscribe('Questions',this.params._id);
      return Meteor.subscribe('Survey',this.params._id);
    },
    data: function() {

      return {questions : Questions.find({survey:this.params._id,visible:true},{sort: {order:1}}).fetch(),params:Survey.findOne({title:this.params._id})};
    }
  });



});
