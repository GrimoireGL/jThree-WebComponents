SimpleScroll = function(elms){
  var header         = $(elms.header);
  var target         = $(elms.target);
  var $window        = $(window);
  var existing       = false;
  var animating      = false;
  var lastPosition   = $window.scrollTop();
  var latestPosition = $window.scrollTop();
  var targetThrough  = elms.through;
  var position       = elms.position;
  var type           = elms.moveaction;
  var showParams;
  var hideParams;

  var paramsCheck = function(){
    if(position == 'top'){
      showParams = {'top' : '0'};
      hideParams = {'top' : -header.outerHeight()};
    }else{
      showParams = {'bottom' : '0'};
      hideParams = {'bottom' : -header.outerHeight()};
    }
  }

  paramsCheck();

  $('.ss-header-none').css(hideParams);
  $('.ss-header-exist').css(showParams);

  var isLowerThanTarget = function(){
    return $(window).scrollTop() > target.offset().top + targetThrough;
  }

  var isScrollDown = function(){
    return latestPosition - lastPosition > -1;
  }

  this.hideHeader = function(){
    animating    = true;
    header.addClass('ss-header-animating');
    var duration = 400;
    var easing   = "swing";
    var complete = function(){
      existing  = false;
      animating = false;
      header.addClass('ss-header-none')
      header.removeClass('ss-header-exist');
      header.removeClass('ss-animating');
    };

    if( type == 'animate'){
      $('.ss-header-exist').animate(hideParams, duration, easing, complete);
    }
  }

  this.showHeader = function(){
    animating    = true;
    header.addClass('ss-animating');
    var duration = 400;
    var easing   = "swing";
    var complete = function(){
     existing  = true;
     animating = false;
     header.addClass('ss-header-exist');
     header.removeClass('ss-header-none')
     header.removeClass('ss-header-animating');
    };

    if( type == 'animate'){
      $('.ss-header-none').animate(showParams, duration, easing, complete);
    }
  }

  this.onScroll = function(){
    latestPosition = $window.scrollTop();
    if(isLowerThanTarget()){
      if(isScrollDown()){
        if(existing && !animating){
          var e = $.Event( "scrolluptodown" );
          $window.trigger( e );
        }
      }else{
        if(!existing && !animating){
          var e = $.Event( "scrolldowntoup" );
          $window.trigger( e );
          // showHeader();
        }
      }
    }else{
      if(existing && !animating){
        var e = $.Event( "beforetargetexisting" );
        $window.trigger( e );
      }else if(!existing && !animating){
        var e = $.Event( "beforetargetnone" );
        $window.trigger( e );
        // showHeader();
      }
    }
    lastPosition = $window.scrollTop();
  }
}

