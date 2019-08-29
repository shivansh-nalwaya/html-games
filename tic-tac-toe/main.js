$(document).ready(function() {
  var move = 1;
  var turn = true;
  $("#board tr td").click(function() {
    if ($(this).text() == "" && turn) {
      if (move % 2 == 1) $(this).append("X");
      else $(this).append("O");
      move++;
      let winner = findWinner();
      if (winner != -1 && winner != "") {
        if (winner == "X") $("#final").text("Player 1 wins!");
        else $("#final").text("Player 2 wins!");
        turn = false;
      }
      if (move == 10) $("#final").text("Draw!");
    }
  });
  function findWinner() {
    var field1 = $("#c00").text();
    var field2 = $("#c01").text();
    var field3 = $("#c02").text();
    var field4 = $("#c10").text();
    var field5 = $("#c11").text();
    var field6 = $("#c12").text();
    var field7 = $("#c20").text();
    var field8 = $("#c21").text();
    var field9 = $("#c22").text();
    if (field1 == field2 && field2 == field3) return field3;
    else if (field4 == field5 && field5 == field6) return field6;
    else if (field7 == field8 && field8 == field9) return field9;
    else if (field1 == field4 && field4 == field7) return field7;
    else if (field2 == field5 && field5 == field8) return field8;
    else if (field3 == field6 && field6 == field9) return field9;
    else if (field1 == field5 && field5 == field9) return field9;
    else if (field3 == field5 && field5 == field7) return field7;
    return -1;
  }
});
