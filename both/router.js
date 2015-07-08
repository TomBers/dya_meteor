Router.configure({
layoutTemplate: 'layout',
// fastRender: true
// data: function() {
//   return {Questions : Questions.find().fetch()}
// }
});



Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'home',

  });


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


  this.route('dya', {
    path: '/:_id',
    template: 'dya',
    waitOn: function(){
      Meteor.subscribe('Questions',this.params._id);
      return Meteor.subscribe('Survey',this.params._id);
    },
    fastRender: true,
    data: function() {
      return {questions : Questions.find({survey:this.params._id,visible:true},{sort: {order:1}}).fetch(),params:Survey.findOne({title:this.params._id})};
    }
  });



});
