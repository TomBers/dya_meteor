Template.LND.rendered = function(){
  $('.starter').unbind().on('click',function(evt){
    Session.set('started',true);
  });
}
