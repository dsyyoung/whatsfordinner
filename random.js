$(function () {
  var run = 0,
    heading = $("h1"),
    timer;

  $("#start").click(function () {
    if (!run) {
      heading.html(heading.html().replace("What's for dinner?", "Decision made!"));
      $(this).val("stop");
      $("#stop").show(); // Show the stop button
      
      timer = setInterval(function () {
        // Get random food from the foodList array
        var r = Math.floor(Math.random() * foodList.length),
            food = foodList[r];
        
        $("#what").html(food);
        
        // Animation effects
        var rTop = Math.ceil(Math.random() * $(document).height()),
            rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
            rSize = Math.ceil(Math.random() * (37 - 14) + 14);
        
        $("<span class='temp'></span>")
          .html(food)
          .hide()
          .css({
            top: rTop,
            left: rLeft,
            color: "rgba(0,0,0,." + Math.random() + ")",
            fontSize: rSize + "px",
          })
          .appendTo("body")
          .fadeIn("slow", function () {
            $(this).fadeOut("slow", function () {
              $(this).remove();
            });
          });
      }, 50);
      run = 1;
    } else {
      clearInterval(timer);
      $(this).val("start");
      $("#stop").hide(); // Hide the stop button
      run = 0;
    }
  });

  // Stop button functionality
  $("#stop").click(function() {
    clearInterval(timer);
    $("#start").val("start");
    $(this).hide();
    run = 0;
  });

  document.onkeydown = function enter(e) {
    var e = e || event;
    if (e.keyCode == 13) $("#start").trigger("click");
  };
});