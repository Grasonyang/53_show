$.ajax({
  url: "src/csv/actual_answer.csv",
  datatype: "text",
  success: function (e) {
    let text = e.split('\r\n');
    for (let i = 1; i < text.length - 1; i++) {
      let arr = text[i].split(',');
      $("table").append(`
        <tr>
          <td>${i + 1}</td>
          <td>${arr[1]}</td>
          <td></td>
        </tr>
      `);
    }
  },
});
$.ajax({
  url: "src/csv/submitted_answer.csv",
  datatype: "text",
  success: function (e) {
    let text = e.split('\r\n');
    console.log(text)
    let count = 0;
    for (let i = 0; i < text.length - 1; i++) {
      let arr = text[i + 1].split(',');
      $(`table tr:eq(${i + 1}) td:eq(2)`).text(arr[1]);
      if (arr[1] == $(`table tr:eq(${i + 1}) td:eq(1)`).text()) {
        count++;
      }
    }
    $("pre").text(`
      Score:${count}/${text.length - 2}
    `);
  },
});