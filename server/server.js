Meteor.methods({
  vote: function(debate,usr,val) {
    Votes.update({debate:debate,usr:usr},{debate:debate,usr:usr,side:val},{upsert:true});
    var dte = new Date();
    History.insert({debate:debate
      ,usr:usr
      ,agree:Votes.find({debate:debate,side:'Agree'}).fetch().length
      ,neutral:Votes.find({debate:debate,side:'Neutral'}).fetch().length
      ,disagree:Votes.find({debate:debate,side:'Disagree'}).fetch().length
      ,DateTime:dte
      });
  },
  saveRes: function(qn,dat,usr){
    return Votes.update({qn:qn,usr:usr},{qn:qn,usr:usr,res:dat},{upsert:true});
  },
  comment: function(debate,usr,side,comment){
    var dte = new Date();
    Comments.insert({debate:debate,usr:usr,side:side,comment:comment,DateTime:dte});
  },
  makeDebate: function(title,ac,nc,dc,url,did){
    var dte = new Date();
    if (did == ''){
    return Debates.insert({title:title,ac:ac,nc:nc,dc:dc,url:url,DateTime:dte});
  }else{
    return Debates.update({_id:did},{_id:did,title:title,ac:ac,nc:nc,dc:dc,url:url,DateTime:dte},{upsert:false});
  }
},
clearDebate: function(debate,del){
  Comments.remove({debate:debate});
  Votes.remove({debate:debate});
  History.remove({debate:debate});
  if(del){
  Debates.remove({_id:debate});
}
}
});
