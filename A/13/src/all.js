$(".boxs").sortable({
  connectWith: ".boxs",
  placeholder: "holder",
  cursor: "move",
  start: function (e, ui) {
    console.log($(ui.item[0]))
    $(ui.item[0]).css('transform', "rotate(15deg)");
    $(".holder").css({
      width: $(ui.item[0]).width() + 'px',
      height: $(ui.item[0]).height() + 'px',

    });
  },
  stop: function (e, ui) {
    $(ui.item[0]).css('transform', "rotate(0deg)");
  },

});