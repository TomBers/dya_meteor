





  Template.comment.helpers({
    comments: function(){
      return Comments.find({debate:Session.get('debate')},{sort: {DateTime:-1}});
    }
  });




//   Template.comment.events({
//     'click core-icon-button': function(e){
//       // var com = $('.the_item').val();
//       // Meteor.call('comment',Session.get('usr'),Session.get('side'),com);
//       // $('.the_item').val('');
//     // console.log(e);
//   },
//   'keypress input': function(e){
//
// }
//   });

  // Template.hello.events({
  //   'click paper-tab': function(evt){
  //     alert('Clcked');
  //     // $('.instructions').hide();
  //     // $('.chart-container').show();
  //     // Session.set('side',evt.currentTarget.id)
  //     // Meteor.call('vote',Session.get('usr'),evt.currentTarget.id);
  //     // console.log(evt.currentTarget.id);
  //   }
  //
  // });
