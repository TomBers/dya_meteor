Template.VID.rendered = function(){

  Session.setDefault('vidTime',0);
  Session.setDefault('agree',[]);
  Session.setDefault('disagree',[]);

  var iframe = $('#player1')[0];
    var player = $f(iframe);
    player.addEvent('ready', function() {
        player.addEvent('playProgress', onPlayProgress);
    });
    function onPlayProgress(data, id) {
      Session.set('vidTime',data.seconds);
    }
}

Template.VID.helpers({
  time: function(){
    return Session.get('vidTime');
  },
  agreeTime: function(){
    return Session.get('agree');
  },
  disagreeTime: function(){
    return Session.get('disagree');
  }
})

Template.VID.events({
  'click .chk.agree, touchend .chk.agree':function(e,template){

    var time = Session.get('vidTime');
    if(time > 0){
    var tmp = Session.get('agree');
    tmp.push(time);
    console.log(tmp);
    Session.set('agree',tmp);
  }
  },
  'click .chk.disagree, touchend .chk.disagree':function(e,template){
    var time = Session.get('vidTime');

    if(time > 0){
    var tmp = Session.get('disagree');
    tmp.push(time);
    console.log(tmp);
    Session.set('disagree',tmp);
  }
  },
  'click .chk.time, touchend .chk.time':function(e,template){
    var vid = template.find('video');

    alert(vid.currentTime);
  }
});
