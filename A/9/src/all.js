$("textarea").on('change', function () {
  let text = $("textarea").val();
  text = bold(text);
  text = link(text);
  text = text.split('\n');
  let thisi;
  let last = 0;
  for (let i = 0; i < text.length; i++) {
    if (/^\s{0,}(\#{1,6})\s(\S.*?)$/.test(text[i])) {
      let thismatch = text[i].match(/^\s{0,}(\#{1,6})\s(\S.*?)$/);
      let lth = thismatch[1].length;
      text[i] = `<h${lth}>${thismatch[2]}</h${lth}>`;
      last = 0;
    } else if (/^\s{0,}(\-\-\-){1,}\s{0,}$/.test(text[i])) {
      text[i] = '<hr>';
      last = 0;
    } else if (/^(\s{0,})(\-|\+|\*|\/)\s(\S.*?)$/.test(text[i])) {
      let thismatch = text[i].match(/^(\s{0,})(\-|\+|\*|\/)\s(\S.*?)$/);
      let lth = thismatch[1].length;
      let lay = lth / 2;
      let ul = 1;
      let textt = `<ul><li>${thismatch[3]}`;
      let nowi = i;
      while (i + 1 < text.length && /^(\s{0,})(\-|\+|\*|\/)\s(\S.*?)$/.test(text[i + 1])) {
        i++;
        let thematch = text[i].match(/^(\s{0,})(\-|\+|\*|\/)\s(\S.*?)$/);
        let thislth = thematch[1].length;
        console.log(thislth, lth);
        if (thislth - lay * 2 >= 2 && thislth - lth >= 2) {
          ul++;
          lay++;
          textt += `<ul><li>${thematch[3]}`;
        } else if (thislth - lay * 2 < 2 && thislth - lay * 2 >= 0) {
          textt += `<li>${thematch[3]}`;
        } else {
          while (thislth - lay * 2 < 0) {
            lay--;
            ul--;
            if (ul < 0) {
              ul = 0;
            } else {
              textt += '</ul>';
            }
          }
          if (ul == 0) {
            textt += '<ul>';
            ul = 1;
          }
          textt += '<li>' + thematch[3];
        }
        lth = thislth;
        text[i] = "";
      }
      text[nowi] = textt;
      last = 0;
    } else {
      if (text[i] == "") {
        last = 0;
      } else {
        if (last == 0) {
          thisi = i;
          text[thisi] = '<p>' + text[i];
          // text[i]
        } else {
          text[thisi] += '<br>' + text[i];
          text[i] = '';
        }
        last = 1;
      }
    }
  }
  $("div").html(text);
});
function bold(text) {
  if (/\*\*(.+)\*\*/g.test(text)) {
    text = text.replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>');
  }
  if (/\*(.+)\*/g.test(text)) {
    text = text.replace(/\*(.+)\*/g, '<em>$1</em>');
  }
  return text;
}
function link(text) {
  if (/\!\[(.*?)\]\((.*?)\)/g.test(text)) {
    text = text.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alit="$1">');
  }
  if (/\[(.*?)\]\((.*?)\)/g.test(text)) {
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  }
  return text;
}