Meteor.methods({
  regInterest: function(qn,usr,dat,rate){
    var dte = new Date();
    var nT = 0;
    try{
    var tTot = Analysis.find({question:qn,res:dat,rating:rate},{sort: {DateTime:-1},limit:1}).fetch();
    nT = ++tTot[0].total;
  }catch(e){
    nT = 1;
  }
    return Analysis.insert({
      question:qn
      ,usr:usr
      ,DateTime:dte
      ,res:dat
      ,rating:rate
      ,total:nT
      });

  },
  saveRes: function(qn,dat,usr){
    Count.update({qn:qn,usr:usr},{qn:qn,usr:usr},{upsert:true});
    return Votes.update({qn:qn,usr:usr},{qn:qn,usr:usr,res:dat},{upsert:true});
  },
  saveCHK: function(qn,dat,usr){
    Count.update({qn:qn,usr:usr},{qn:qn,usr:usr},{upsert:true});
    return Votes.insert({qn:qn,usr:usr,res:dat});
  },
  changeVisible: function(qn,show){
    return Questions.update({_id:qn},{$set:{visible:show}});
    // return Votes.insert({qn:qn,usr:usr,res:dat});
  },
  removeCHK: function(qn,dat,usr){
    return Votes.remove({qn:qn,res:dat,usr:usr});
  },
  makeComment: function(qn,usr,cmt,count){
    var dte = new Date();
    Comments.insert({qn:qn,usr:usr,comment:cmt,count:count,DateTime:dte});
  },
  upDownVoteComment:function(qn,val){
    Comments.update({_id:qn}, {$inc:{count:val}});
  },

  makeDebate: function(title,ac,nc,dc,url,did){
    var dte = new Date();
    if (did == ''){
    return Questions.insert({title:title,ac:ac,nc:nc,dc:dc,url:url,DateTime:dte});
  }else{
    return Questions.update({_id:did},{_id:did,title:title,ac:ac,nc:nc,dc:dc,url:url,DateTime:dte},{upsert:false});
  }
},
clearDebate: function(qn,del){

  Comments.remove({qn:qn});
  Votes.remove({qn:qn});
  Analysis.remove({question:qn});
  Count.remove({qn:qn});
  if(del){
  Questions.remove({_id:qn});
}
}
});
