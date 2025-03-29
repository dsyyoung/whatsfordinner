$i = 0;
$("#start").click(function () {
  $i++;
  if ($i >= 4) {
    $("#start").hide();
    $("#stop").show();
  }
});
$("#stop").click(function () {
  alert("So indecisive? Don't eat then!");
  $(this).hide();
});