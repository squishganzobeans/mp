// JavaScript Document$(document).ready(function() {
  let tooltipVisible = false;
  let tooltipFixed = false;

  function updateTooltipPosition(e) {
    let top = e.pageY - $('#info-box').height() - 30;
    let left = e.pageX - ($('#info-box').width()) / 2;

    // Check if the tooltip will cut off at the top
    if (top < $(window).scrollTop()) {
      top = e.pageY + 20;
    }

    // Check if the tooltip will cut off at the left
    if (left + $('#info-box').outerWidth() > $(window).scrollLeft() + $(window).width()) {
      left = e.pageX - $('#info-box').outerWidth() - 20;
    }

    $('#info-box').css({
      top: top,
      left: left
    });
  }

  $("path, circle").hover(function(e) {
    if (!tooltipVisible) {
      $('#info-box').css('display', 'block');
      $('#info-box').html($(this).data('info'));
      updateTooltipPosition(e);
    }
  });

  $("path, circle").mouseleave(function(e) {
    if (!tooltipVisible) {
      $('#info-box').css('display', 'none');
    }
  });

  $("path, circle").click(function(e) {
    tooltipVisible = !tooltipVisible;
    tooltipFixed = tooltipVisible;
    if (tooltipVisible) {
      $('#info-box').css('display', 'block');
      $('#info-box').html($(this).data('info'));
      updateTooltipPosition(e);
    } else {
      $('#info-box').css('display', 'none');
    }
  });

  $(document).mousemove(function(e) {
    if ($('#info-box').css('display') === 'block' && !tooltipFixed) {
      updateTooltipPosition(e);
    }
  }).mouseover();

  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (ios) {
    $('a').on('click touchend', function() {
      var link = $(this).attr('href');
      window.open(link, '_blank');
      return false;
    });
  }
});
