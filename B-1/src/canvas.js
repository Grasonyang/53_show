let laststep = [];
let nextstep = [];
let w = parseInt(localStorage.getItem('w'));
let h = parseInt(localStorage.getItem('h'));
let nowlaycode = undefined;
let nowlaycount = 0;

let selecting = false;

let drawshape = $("#drashape").val();
let drawurl = "";
let drawing = false;
let drawidth = parseInt($("#drawidth").val());
let drawcolor;


//選取
function selecttt() {
  if (nowlaycode != undefined) {
    selecting = !selecting;
    checkslt();
  }

}
function checkslt() {
  if (nowlaycode != undefined) {
    if (selecting == true) {
      $("#slt").text("取消選取");
      $('.drawcanvas').remove();
      let lstp = `$('.drawcanvas').remove()`;
      let nstp = "$('.canvas').append(\`<canvas class='drawcanvas' width='${w}' height='${h}'></canvas>\`)";
      laststep.push({ lstp, nstp });
    } else {
      $("#slt").text("選取");
      let lstp = `$('.canvas').append(\`<canvas class='drawcanvas' width='${w}' height='${h}'></canvas>\`)`;
      eval(lstp);
      let nstp = "$('.drawcanvas').remove()";
      laststep.push({ lstp, nstp });
    }
  }

}
//畫面
function showcanvas() {
  console.log(nowlaycode)
  $(".canvas").empty();
  let showend = false;
  for (let i = 0; i < $(".layer").length; i++) {
    let data = $($(".layer")[i]).data();
    let color;
    if (data.baccol == "" && i == 0) {
      color = localStorage.getItem('basecolor');
    } else if (data.baccol == "" && i != 0) {
      color = "transparent";
    } else {
      color = data.baccol;
    }
    $(".canvas").append(`
      <div class="drawlayer drawlayer${data.laycode}"
           data-laycode="${data.laycode}"
           data-w="${data.w}"
           data-h="${data.h}"
           data-bacurl="${data.bacurl}"
           data-baccol="${data.baccol}"
           style="width:${data.w}px;
                  height:${data.h}px;
                  background-color:${color};
                  background-image:url(${data.bacurl})">
      </div>
    `);
    for (let j = 0; j < $(`.layer${data.laycode} .objects li`).length; j++) {
      let lidata = $($(`.layer${data.laycode} .objects li`)[j]).data();
      $(`.drawlayer${data.laycode}`).append(`
        <div class="object"
             style="width:${lidata.w}px;
                    height:${lidata.h}px;
                    left:${lidata.left}px;
                    top:${lidata.top}px;
                    background-image:url(${lidata.url});
                    transform:rotate(${lidata.deg}rad)">
        </div>
      `);
    }
    if (nowlaycode != undefined) {
      if (showend == false) {
        $(`.drawlayer${data.laycode}`).show();
        if (nowlaycode == data.laycode) {
          showend = true;
        }
      } else {
        $(`.drawlayer${data.laycode}`).hide();
      }
    }
  }
  $(".canvas").scrollTop((h - $('.canvas').height()) / 2);
  $(".canvas").scrollLeft((w - $('.canvas').width()) / 2);
  checkslt();
}



// 復原 重做
function lstep() {
  if (laststep.length > 0) {
    let lastelm = laststep.pop();
    eval(lastelm.lstp);
    nextstep.push(lastelm);
  }
}
function nstep() {
  if (nextstep.length > 0) {
    let lastelm = nextstep.pop();
    eval(lastelm.nstp);
    laststep.push(lastelm);
  }
}