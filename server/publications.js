Meteor.publish("Questions", function () {
    return Questions.find();
  });


  Meteor.publish("votes", function () {
      return Votes.find();
    });

    Meteor.publish("comments", function () {
        return Comments.find();
      });

      Meteor.publish("Analysis", function () {
          return Analysis.find();
        });

        Meteor.publish("count", function () {
            return Count.find();
          });
          Meteor.publish("Survey", function () {
              return Survey.find();
            });
