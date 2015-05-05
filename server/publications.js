Meteor.publish("Questions", function (survey) {
  return Questions.find({survey:survey});
});

Meteor.publish("questionById", function (id) {
  return Questions.find({_id:id});
});


Meteor.publish("Votes", function (qn) {
  return Votes.find({qn:qn});
});

Meteor.publish("Count", function (qn) {
  Counts.publish(this, ''+qn, Count.find({qn:qn}));
});

Meteor.publish("Comments", function (qn) {
  return Comments.find({qn:qn});
});

Meteor.publish("Analysis", function (id) {
  return Analysis.find({question:id});
});


Meteor.publish("Survey", function (survey) {
  return Survey.find({title:survey});
});
