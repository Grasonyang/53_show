let nowcolor = undefined;
$(".colorbox").on('click', function () {
  $(".colorbox").css('border-color', 'gray');
  $(this).css('border-color', 'yellow');
  nowcolor = $(this).css('background-color');
});
$(".box").on('mousemove', function () {
  $(this).css('background-color', nowcolor);
});