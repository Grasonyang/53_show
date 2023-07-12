function srh() {
  let text = $("p").text();
  let sh_text = $("#sh_text").val();
  if (/[\[\]\(\)\{\}\.\!\-\+\*\/]/g.test(sh_text)) {
    sh_text = sh_text.replace(/[\[\]\(\)\{\}\.\!\-\+\*\/]/g, '\\$&');
  }
  let nex = new RegExp(sh_text, 'g');
  text = text.replace(nex, `<span style="background-color:${color()};">$&</span>`);
  $("p").html(text);
}
function color() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}