Meteor.publish("debates", function () {
    return Debates.find();
  });


  Meteor.publish("votes", function () {
      return Votes.find();
    });

    Meteor.publish("comments", function () {
        return Comments.find();
      });

      Meteor.publish("history", function () {
          return History.find();
        });

        Meteor.publish("count", function () {
            return Count.find();
          });
