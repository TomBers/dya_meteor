Meteor.publish("Questions", function () {
    return Questions.find();
  });


  Meteor.publish("Votes", function () {
      return Votes.find();
    });

    Meteor.publish("Comments", function () {
        return Comments.find();
      });

      Meteor.publish("Analysis", function () {
          return Analysis.find();
        });

        Meteor.publish("Count", function () {
            return Count.find();
          });
          Meteor.publish("Survey", function () {
              return Survey.find();
            });
