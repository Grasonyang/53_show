function addobject(left, top, w, h, deg, url) {
  // $(`.layer${nowlaycode} .objects`)
  $(`.layer${nowlaycode} .objects`).append(`
    <li data-left='${left}'
    data-top='${top}'
    data-w='${w}'
    data-h='${h}'
    data-deg='${deg}'
    data-url='${url}'>物件</li>
  `);
  showcanvas();
}
$(document).on('click', '.object', function () {
  $(".object").empty();
  $(this).append(`
    <div class="ctrlbox lt"></div>
    <div class="ctrlbox rt"></div>
    <div class="ctrlbox lb"></div>
    <div class="ctrlbox rb"></div>
    <div class="ctrlbox rotate"></div>
    <div class="ctrlbox move"></div>
  `);
  let dragging = false;
  let rotating = false;
  let objcode;
  $(document).on('mousedown', '.move', function (e) {
    dragging = true;
    objcode = $(this).parent().index();
  });
  $(document).on('mousedown', '.rotate', function (e) {
    rotating = true;
    objcode = $(this).parent().index();
  });
  $(document).on('mousemove', '.drawlayer', function (e) {
    // console.log(e.pageX - $(".drawlayer").offset().left, e.pageY - $(".drawlayer").offset().top)
    if (dragging) {
      let ww = $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).width() * 1.2;
      let hh = $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).width() * 0.5;
      $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).css('top', e.offsetY - hh - 10);
      $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).css('left', e.offsetX - ww - 10);
    } else if (rotating) {
      // console.log($(`.drawlayer${nowlaycode} .object:eq(${objcode})`).offset(), $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).css('top'), $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).css('left'))
      let mx, my;
      let topp = parseInt($(`.drawlayer${nowlaycode} .object:eq(${objcode})`).css('top'), 10);
      let leftt = parseInt($(`.drawlayer${nowlaycode} .object:eq(${objcode})`).css('left'), 10);
      mx = leftt + $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).width() / 2;
      my = topp + $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).height() / 2;
      // console.log(mx, my);
      let xx = e.pageX - $(".drawlayer").offset().left;
      let yy = e.pageY - $(".drawlayer").offset().top;
      // console.log(xx, yy);
      let dx = xx - mx;
      let dy = yy - my;
      let deg = ((Math.atan2(dy, dx)) * (180 / Math.PI) + 90) / (180 / Math.PI);
      console.log(deg)
      $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).css('transform', `rotate(${deg}rad)`);
    }
  });
  $(document).on('mouseup', function (e) {
    if (dragging) {
      let ww = $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).width() * 1.2;
      let hh = $(`.drawlayer${nowlaycode} .object:eq(${objcode})`).width() * 0.5;
      $(`.layer${nowlaycode} .objects li:eq(${objcode})`).data('top', e.offsetY - hh);
      $(`.layer${nowlaycode} .objects li:eq(${objcode})`).data('left', e.offsetX - ww);
      showcanvas();
      dragging = false;
    } else if (rotating) {
      rotating = false;
    }
  });
});