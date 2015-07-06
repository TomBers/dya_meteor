
Template.ask.rendered = function(){
  Session.setDefaultPersistent('qnsVotedFor',[]);
  Session.set('qn', this.data.params.title);
  Meteor.subscribe('Comments',this.data.params.title);
}


Template.ask.helpers({
  cmmts: function(){
      return Comments.find({},{sort: {count:-1}});
  }
});




Template.ask.events({
  'click span.askQn, touchstart span.askQn':function(e,template){
      e.preventDefault()
      var cmt = template.find('#qntext').value;
      if(cmt != ''){
      Meteor.call('makeComment',Session.get('qn'),Session.get('usr'),cmt,0);
    }
    // alert.success('Thanks');
      template.find('#qntext').value = '';
  }
})

Template.qnVote.helpers({
  voted: function(){
    return Session.get('qnsVotedFor').indexOf(this._id) > - 1;
  }
})

Template.qnVote.events({
  'click div.upVote, touchstart div.upVote':function(e,template){
    var tmp = Session.get('qnsVotedFor');
    tmp.push(this._id);
    Session.setPersistent('qnsVotedFor',tmp);
    Meteor.call('upDownVoteComment',this._id,1);
  },
  'click div.downVote, touchstart div.downVote':function(e,template){
    var tmp = Session.get('qnsVotedFor');
    tmp.push(this._id);
    Session.setPersistent('qnsVotedFor',tmp);
    Meteor.call('upDownVoteComment',this._id,-1);
  }
});
