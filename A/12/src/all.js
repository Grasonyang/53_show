let nowcode;
$('#lightbox').hide();
function show(nt) {
  if (nt <= 0) {
    nt = 0;
  } else if (nt >= $('.imgs img').length) {
    nt = $('.imgs img').length - 1;
  }
  nowcode = nt;
  $('#lightbox').show();
  $('#lightbox img').attr('src', $(".imgs img:eq(" + nt + ")").attr('src'));
}
$(document).on('click', function (e) {
  console.log($(e.target).closest('.lightbox'))
  if ($(e.target).closest('img,button,#lightbox').length == 0) {
    $('#lightbox').hide();
  }
});