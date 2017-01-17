$('.selector').css({
  'left' : '-300px',
  'display' : 'block'
});

$('.selector-trigger').css({
  'left' : '0px',
  'display' : 'block'
});

$(document).ready(function() {
  var SetColorSchema = $.cookie('colorSchema');
  var SetFontSchema  = $.cookie('fontSchema');

  if($.cookie("colorSchema") == null) {
    // do nothing
  } else {
    $('#color-schema').attr('href', 'assets/css/style-' + SetColorSchema + '.min.css');
    $('.selector .colors span').each(function() {$(this).removeClass('choosed')});
    $('.selector .colors').find('[data-color-schema= '+ SetColorSchema +']').addClass('choosed');
  }

  if($.cookie("fontSchema") == null) {
    // do nothing
  } else {
    $('#font-schema').attr('href', 'assets/css/webfonts-' + SetFontSchema + '.min.css');
  }

});

$('.selector-trigger').click(function() {
  if($(this).hasClass('open')) {
    $(this).removeClass('open').addClass('close');
    $(this).find('i').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');

    $(this).animate({
      left: '300px'
    }, default_transition);
    $('.selector').animate({
      left: '0px'
    }, default_transition);
  } else {
    $(this).removeClass('close').addClass('open');
    $(this).find('i').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');

    $(this).animate({
      left: '0px'
    }, default_transition);
    $('.selector').animate({
      left: '-300px'
    }, default_transition);
  }
});

// Color schema
$('.selector .colors span').click(function() {
  var colorSchema = $(this).data('color-schema');

  if($.cookie("colorSchema") == null) {
    $.cookie("colorSchema", colorSchema, {expires: 30});
  } else {
    $.cookie("colorSchema", colorSchema);
  }

  $(this).siblings().removeClass('choosed');
  $(this).addClass('choosed');
  $('#color-schema').attr('href', 'assets/css/style-' + colorSchema + '.min.css');

  setTimeout(function(){
    resetCanvas();
  }, 100);

});

// Font schema
$('.selector .fonts select').change(function() {
  var fontSchema = $(this).find('option:selected').val();
  console.log(fontSchema);

  if($.cookie("fontSchema") == null) {
    $.cookie("fontSchema", fontSchema, {expires: 30});
  } else {
    $.cookie("fontSchema", fontSchema);
  }

  $('#font-schema').attr('href', 'assets/css/webfonts-' + fontSchema + '.min.css');

});

// Reset canvas when selector is used
function resetCanvas() {



  $('canvas').remove();
  $('.tms-progress').attr('data-effect', 'tms-circle');

  $('[data-effect=tms-circle]').each(function() {
    $(this).circleGraphic();
  });
}
