let winner = undefined;
let nowplayer;
getdata();
$(".box").on('click', function () {
  if ($(this).text() == " " && winner == undefined) {
    $(this).text('X');
    addata($(`.box`).text(), "O");
  }
});
function bot() {
  let data = $(".box").text();
  let ii = Math.floor(Math.random() * 8);
  while (data[ii] != " ") {
    ii = Math.floor(Math.random() * 8);
  }
  $(`.box:eq(${ii})`).text('O');
  addata($(`.box`).text(), "X");
}
function winnerr() {
  let arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let data = $(".box").text();
  for (let i = 0; i < arr.length; i++) {
    if (data[arr[i][0]] == data[arr[i][1]] && data[arr[i][0]] == data[arr[i][2]] && data[arr[i][2]] != " ") {
      winner = data[arr[i][2]];
    }
  }
}
function getdata() {
  $.ajax({
    type: "POST",
    url: "data.php?call=1",
    async: true,
    success: function (e) {
      let data = JSON.parse(e);
      console.log(e)
      nowplayer = data[2];
      for (let i = 0; i < data[1].length; i++) {
        $(`.box:eq(${i})`).text(data[1][i]);
      }
      winnerr();
      console.log(winner)
      if (winner != undefined) {
        $("pre").text(`{${winner}} Win!`);
      } else {
        if (nowplayer == 'O') {
          bot();
        }
      }
    },
  });
}
function addata(data, player) {
  $.ajax({
    type: "POST",
    url: "data.php?call=0",
    async: true,
    data: {
      data: data,
      player: player,
    },
    success: function (e) {
      getdata();
    },
  });
}
function reset() {
  addata("         ", "X");
  winner = undefined;
}
