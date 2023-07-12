let canvas = $("canvas")[0];
let ctx = canvas.getContext('2d');
let imgg = false;
$("#upl_img").on('change', function () {
  let url = URL.createObjectURL($(this)[0].files[0]);
  let img = new Image;
  img.src = url;
  img.onload = function () {
    canvas.width = "600";
    canvas.height = "400";
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  };
  imgg = true;
});
$("canvas").on('mousemove', function (e) {
  let data = ctx.getImageData(e.offsetX - 0.5, e.offsetY - 0.5, 1, 1)['data'];
  let r = data[0];
  let g = data[1];
  let b = data[2];
  let a = data[3] / 255;
  let color = `rgb(${r},${g},${b})`;
  $(".colorr").css('background-color', color);
  $("p").text(color);
  let k = 0;
  for (let i = -5; i <= 5; i++) {
    for (let j = -5; j <= 5; j++, k++) {
      data = ctx.getImageData(e.offsetX - 0.5 + j, e.offsetY - 0.5 + i, 1, 1)['data'];
      r = data[0];
      g = data[1];
      b = data[2];
      a = data[3] / 255;
      color = `rgb(${r},${g},${b})`;
      $(`.box:eq(${k})`).css('background-color', color);
    }
  }
  $(".boxs").css({
    'display': "grid",
    'top': e.pageY + 'px',
    'left': e.pageX + 'px',
  });
});