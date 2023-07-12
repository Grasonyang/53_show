function convert() {
  $.ajax({
    type: "POST",
    url: "data.php?call=0",
    data: {
      data: $("textarea").val(),
    },
  });
}