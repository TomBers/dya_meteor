
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
  // , touchstart span.askQn
  'click span.askQn':function(e,template){
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
    if(Session.get('qnsVotedFor')){
    return Session.get('qnsVotedFor').indexOf(this._id) > - 1;
  }else{
    return null;
  }
  }
})

Template.qnVote.events({
  // , touchstart div.upVote
  'click div.upVote':function(e,template){
    var tmp = Session.get('qnsVotedFor');
    tmp.push(this._id);
    Session.setPersistent('qnsVotedFor',tmp);
    Meteor.call('upDownVoteComment',this._id,1);
  },
  // , touchstart div.downVote
  'click div.downVote':function(e,template){
    var tmp = Session.get('qnsVotedFor');
    tmp.push(this._id);
    Session.setPersistent('qnsVotedFor',tmp);
    Meteor.call('upDownVoteComment',this._id,-1);
  }
});
