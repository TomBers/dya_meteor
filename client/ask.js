Template.ask.events({
  'click span.askQn, touchstart span.askQn':function(e,template){
      e.preventDefault()
      var cmt = template.find('#qntext').value;
      if(cmt != ''){
      var qn = template.data.qn;
      Meteor.call('makeComment',qn,Session.get('usr'),cmt,0);
    }
    // alert.success('Thanks');
      template.find('#qntext').value = '';
  }
})



Template.qnVote.events({
  'click div.upVote, touchstart div.upVote':function(e,template){
    Meteor.call('upDownVoteComment',this._id,1);
  },
  'click div.downVote, touchstart div.downVote':function(e,template){
    Meteor.call('upDownVoteComment',this._id,-1);
  }
});
