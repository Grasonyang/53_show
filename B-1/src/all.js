if (localStorage.getItem('prj') == null) {
  localStorage.setItem('prj', 'false');
} else if (localStorage.getItem('prj') == 'true') {
  addlayer("");
}
if (localStorage.getItem('seals') == null) {
  localStorage.setItem('seals', '0');
}
else if (localStorage.getItem('seals') > '0') {
  getseal();
}
$(window).on('storage', function () {
  if (localStorage.getItem('prj') == 'false') {
    location.href = "index.html";
  }
});

//new project
function newprj() {
  if (confirm('是否離開編輯頁面?')) {
    location.href = "newprj.html";
  }
}
//pick color
$(document).on('click', ".colorr", function () {
  let lstp = `$('.colorbox').empty();$('.colorbox').append(\`${$(".colorbox").html()}\`);drawurl='${drawcolor}'`;
  $('.colorr').css('border-color', 'black');
  $(this).css('border-color', 'yellow');
  drawcolor = $(this).val();
  let nstp = `$('.colorbox').empty();$('.colorbox').append(\`${$(".colorbox").html()}\`);drawurl='${drawcolor}'`;
  laststep.push({ lstp, nstp });
});
//upload image
$("#upl_img").on('change', function () {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;
  let img = new Image();
  img.src = URL.createObjectURL($(this)[0].files[0]);
  img.onload = function () {
    let sx, sy, x, y;
    x = img.width;
    y = img.height;
    while (x > w || y > w) {
      x *= 0.9;
      y *= 0.9;
    }
    sx = (w - x) / 2;
    sy = (h - y) / 2;
    ctx.drawImage(img, 0, 0, img.width, img.height, sx, sy, x, y);
    addlayer(canvas.toDataURL());
  };
});
//seal
$(document).on('click', '.seal', function () {
  let lstp = `$('.seals').empty();$('.seals').append(\`${$(".seals").html()}\`);drawshape=${drawshape};drawurl="${drawurl}"`;
  $('.seal').css('border-color', 'black');
  $(this).css('border-color', 'yellow');
  drawshape = "img";
  drawurl = $(this).data('url');
  let nstp = `$('.seals').empty();$('.seals').append(\`${$(".seals").html()}\`);drawshape=${drawshape};drawurl="${drawurl}"`;
  laststep.push({ lstp, nstp });
});
$("#upl_seal").on('change', function () {
  let file = $(this)[0].files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    let number = parseInt(localStorage.getItem('seals'));
    number++;
    localStorage.setItem('seals', number);
    console.log(e.target.result)
    localStorage.setItem(`seal${number}`, e.target.result);
  };
  getseal();
});
function getseal() {
  let number = parseInt(localStorage.getItem('seals'));
  $(".seal").remove();
  for (let i = 1; i <= number; i++) {
    $(".seals").append(`
      <li class="seal seal${i}" data-url="${localStorage.getItem(`seal${i}`)}">樣章${i}</li>
    `);
  }
}
//筆刷 
// 粗細
$("#drawidth").on('change', function () {
  let lstp = `$("#drawidth").val(${drawidth})`;
  drawidth = parseInt($("#drawidth").val());
  let nstp = `$("#drawidth").val(${drawidth})`;
  laststep.push({ lstp, nstp });
});

// 筆頭
$("#drashape").on('change', function () {
  let lstp = `$('option[value="${drawshape}"]').prop('selected',true)`;
  drawshape = $("#drashape").val();
  let nstp = `$('option[value="${drawshape}"]').prop('selected',true)`;
  laststep.push({ lstp, nstp });
});

//bucket
function bucket() {
  let lstp = `drawshape=${drawshape};`;
  drawshape = "bucket";
  let nstp = `drawshape=${drawshape};`;
  laststep.push({ lstp, nstp });
}

//開始畫
(function () {
  let minx, miny, maxx, maxy;
  let pminx, pminy, pmaxx, pmaxy;
  let lsx, lsy;
  let drawctx = $(".drawcanvas")[0].getContext('2d');
  $(document).on('mousedown', '.drawcanvas', function (e) {
    drawctx = $(".drawcanvas")[0].getContext('2d');
    lsx = e.offsetX;
    lsy = e.offsetY;
    minx = Number.MAX_VALUE;
    miny = Number.MAX_VALUE;
    maxx = Number.MIN_VALUE;
    maxy = Number.MIN_VALUE;
    pminx = Number.MAX_VALUE;
    pminy = Number.MAX_VALUE;
    pmaxx = Number.MIN_VALUE;
    pmaxy = Number.MIN_VALUE;
    minx = Math.min(minx, e.offsetX - drawidth / 2);
    miny = Math.min(miny, e.offsetY - drawidth / 2);
    maxx = Math.max(maxx, e.offsetX + drawidth / 2);
    maxy = Math.max(maxy, e.offsetY + drawidth / 2);
    pminx = Math.min(pminx, e.offsetX);
    pminy = Math.min(pminy, e.offsetY);
    pmaxx = Math.max(pmaxx, e.offsetX);
    pmaxy = Math.max(pmaxy, e.offsetY);
    if (drawshape == "img") {
      drawing = true;
      let img = new Image();
      img.src = drawurl;
      img.onload = function () {
        let sx, sy;
        let ww = drawidth, hh = img.height * drawidth / img.width;
        sx = e.offsetX - ww / 2;
        sy = e.offsetY - hh / 2;
        drawctx.drawImage(img, 0, 0, img.width, img.height, sx, sy, ww, hh);
        lsx = e.offsetX;
        lsy = e.offsetY;
      };
    } else if (drawshape == "butt" || drawshape == "round" || drawshape == "square") {

    } else if (drawshape == "bucket") {
      if (nowlaycode != undefined && drawcolor != undefined) {
        let lstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`);showcanvas();`;
        $(`.layer${nowlaycode}`).data('baccol', drawcolor);
        showcanvas();
        let nstp = `$('.lists').empty();$('.lists').append(\`${$('.lists').html()}\`);showcanvas();`;
        laststep.push({ lstp, nstp });
      }
    }
  });

  $(document).on('mousemove', '.drawcanvas', function (e) {
    drawctx = $(".drawcanvas")[0].getContext('2d');
    minx = Math.min(minx, e.offsetX - drawidth / 2);
    miny = Math.min(miny, e.offsetY - drawidth / 2);
    maxx = Math.max(maxx, e.offsetX + drawidth / 2);
    maxy = Math.max(maxy, e.offsetY + drawidth / 2);
    pminx = Math.min(pminx, e.offsetX);
    pminy = Math.min(pminy, e.offsetY);
    pmaxx = Math.max(pmaxx, e.offsetX);
    pmaxy = Math.max(pmaxy, e.offsetY);
    if (drawshape == "img") {
      if (drawing == true) {
        let img = new Image();
        img.src = drawurl;
        img.onload = function () {
          let sx, sy;
          let ww = drawidth, hh = img.height * drawidth / img.width;
          sx = e.offsetX - ww / 2;
          sy = e.offsetY - hh / 2;
          if (Math.abs(e.offsetX - lsx) > ww || Math.abs(e.offsetY - lsy) > hh) {
            drawctx.drawImage(img, 0, 0, img.width, img.height, sx, sy, ww, hh);
            lsx = e.offsetX;
            lsy = e.offsetY;
          }
        };
      } else {

        let img = new Image();
        img.src = drawurl;
        img.onload = function () {
          console.log(1)
          let sx, sy;
          let ww = drawidth, hh = img.height * drawidth / img.width;
          sx = e.offsetX - ww / 2;
          sy = e.offsetY - hh / 2;
          drawctx.clearRect(0, 0, w, h);
          drawctx.strokeRect(sx, sy, ww, hh);
          drawctx.strokeWidth = "2";
          drawctx.strokeStyle = "black";
        };
      }
    } else if (drawshape == "butt" || drawshape == "round" || drawshape == "square") {

    }
  });

  $(document).on('mouseup', '.drawcanvas', function (e) {
    drawctx = $(".drawcanvas")[0].getContext('2d');
    // minx = Math.min(minx, e.offsetX - drawidth / 2);
    // miny = Math.min(miny, e.offsetY - drawidth / 2);
    // maxx = Math.max(maxx, e.offsetX + drawidth / 2);
    // maxy = Math.max(maxy, e.offsetY + drawidth / 2);
    // pminx = Math.min(pminx, e.offsetX);
    // pminy = Math.min(pminy, e.offsetY);
    // pmaxx = Math.max(pmaxx, e.offsetX);
    // pmaxy = Math.max(pmaxy, e.offsetY);
    if (drawshape == "img") {
      drawing = false;
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let getdata = drawctx.getImageData(minx, miny, maxx - minx, maxy - miny);
      canvas.width = maxx - minx;
      canvas.height = maxy - miny;
      ctx.putImageData(getdata, 0, 0);
      drawctx.strokeRect(minx, miny, maxx - minx, maxy - miny);
      addobject(minx, miny, maxx - minx, maxy - miny, 0, canvas.toDataURL());
    } else if (drawshape == "butt" || drawshape == "round" || drawshape == "square") {

    }
  });
})();

