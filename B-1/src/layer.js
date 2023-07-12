function addlayer(url) {
  nowlaycount++;
  let lstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`);showcanvas();`;
  $('.lists').append(`
    <div class="layer layer${nowlaycount}"
         data-laycode="${nowlaycount}"
         data-w="${w}"
         data-h="${h}"
         data-bacurl="${url}"
         data-baccol="">
      <h3>圖層${nowlaycount}</h3>
      <button onclick="delayer($(this))">刪除圖層</button>
      <ul class="objects">
      </ul>
    </div>
  `);
  let nstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`);showcanvas();`;
  laststep.push({ lstp, nstp });
  nowlaycode = nowlaycount;
  $(".layer").css('border-color', 'black');
  $(`.layer${nowlaycode}`).css('border-color', 'yellow');
  showcanvas();
}
function delayer(thiss) {
  let lstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`)`;
  $(thiss).parent().remove();
  let nstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`)`;
  laststep.push({ lstp, nstp });
}
(function () {
  let lstp;
  let nstp;
  $(".lists").sortable({

    items: ".layer",
    containment: ".lists",
    start: function () {
      lstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`)`;
    },
    stop: function () {
      nstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`);`;
      laststep.push({ lstp, nstp });
    },
  });
})();
$(document).on('click', '.layer', function () {
  let lstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`);nowlaycode=${nowlaycode};showcanvas();`;
  $(".layer").css('border-color', 'black');
  $(this).css('border-color', 'yellow');
  nowlaycode = $(this).data('laycode');
  showcanvas();
  let nstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`);nowlaycode=${$(this).data('laycode')};showcanvas();`;
  laststep.push({ lstp, nstp });
});
