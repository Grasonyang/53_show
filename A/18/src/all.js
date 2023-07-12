let nowname = ""
$("#addchatform").dialog({
  autoOpen: false,
});
$(".first").show();
$(".second").hide();
if (localStorage.getItem('user') == null) {
  localStorage.setItem('user', 'true');
}
if (localStorage.getItem('chat') == null) {
  localStorage.setItem('chat', 'true');
}
$(window).on('storage', function () {
  if (localStorage.getItem('user') == 'false') {
    user_data();
  }
  if (localStorage.getItem('chat') == 'false') {
    chat_data();
  }
});
function join() {
  if ($.trim($("#formname").val()) != "") {
    $.ajax({
      type: "POST",
      url: "data.php?call=0",
      data: {
        user: $("#formname").val(),
      },
      success: function (e) {
        console.log(e)
        if (e != "0") {
          localStorage.setItem('user', 'false');
          localStorage.setItem('chat', 'false');
          user_data();
          chat_data();
          nowname = $("#formname").val();
          $(".first").hide();
          $(".second").show();
          $("#addchatform").dialog('close');
        }

      },
    });
  }

}
function chats() {
  $.ajax({
    type: "POST",
    url: "data.php?call=3",
    data: {
      user: nowname,
      chat: $("#chatttttt").val(),
    },
    success: function (e) {
      localStorage.setItem('chat', 'false');
      chat_data();
    },
  });
}
function chat_data() {
  $.ajax({
    type: "POST",
    url: "data.php?call=1",
    success: function (e) {
      console.log(e)
      let list = e.split("(+)");
      list.pop();
      $(".chatbox").remove();
      for (let i = 0; i < list.length; i++) {
        let arr = JSON.parse(list[i]);
        if (arr[1] == nowname) {
          $(".se .second .chattttt").append(`
          <div class="chatbox" style="text-align:right">
            <h2>${arr[1]}</h2>
            <p>${arr[2]}</p>
          </div>
        `);
        } else {
          $(".se .second .chattttt").append(`
          <div class="chatbox">
            <h2>${arr[1]}</h2>
            <p>${arr[2]}</p>
          </div>
        `);
        }
      }
      localStorage.setItem('chat', 'true');
    },
  });
}
function user_data() {
  $.ajax({
    type: "POST",
    url: "data.php?call=2",
    success: function (e) {
      console.log(e)
      let list = e.split("(+)");
      list.pop();
      $("h1").empty();
      $(".listname").empty();

      for (let i = 0; i < list.length; i++) {
        let arr = JSON.parse(list[i]);
        if (arr[1] == nowname) {
          $(".fu h1").text(arr[1]);
        } else {
          $(".fu .second .listname").append(`
          <h3>${arr[1]}</h3>
        `);
        }

      }
      localStorage.setItem('user', 'true');
    },
  });
}
function leave() {
  $.ajax({
    type: "POST",
    url: "data.php?call=4",
    data: {
      name: nowname,
    },
    success: function (e) {
      localStorage.setItem('user', 'false');
      localStorage.setItem('chat', 'false');
      $(".first").show();
      $(".second").hide();
    },
  });
}
window.onbeforeunload = function () {
  leave();
};
window.onclose = function () {
  leave();
};
