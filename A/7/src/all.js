$("#sh_text").on('change', function () {
  let text = $.trim($("#sh_text").val());
  $("pre").empty();
  if (/^\#{1}([a-fA-F0-9]{6})$/.test(text) || /^\#{1}([a-fA-F0-9]{3})$/.test(text)) {
    let r, b, g;
    if (text.length == 4) {
      r = parseInt(text[1] + text[1], 16);
      g = parseInt(text[2] + text[2], 16);
      b = parseInt(text[3] + text[3], 16);
    } else {
      r = parseInt(text[1] + text[2], 16);
      g = parseInt(text[3] + text[4], 16);
      b = parseInt(text[5] + text[6], 16);
    }
    $("pre").text(`
      The color type is {HEX}
      HEX value : {Value Sample : ${text}}
      RGB value : {Value Sample : rgb(${r},${g},${b})}
    `);
  } else {
    text = text.replace(' ', '');
    if (/^rgb\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\)$/.test(text)) {
      texts = text.match(/^rgb\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\)$/);
      let r = parseInt(texts[1]);
      let g = parseInt(texts[2]);
      let b = parseInt(texts[3]);
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        $("pre").text(`
          The color type is {RGB}
          HEX value : {Value Sample : #${r}${g}${b}}
          RGB value : {Value Sample : ${text}}
        `);
      } else {
        wrong();
      }
    } else {
      wrong();
    }
  }
});
function wrong() {
  $("pre").text(`Error`);
}