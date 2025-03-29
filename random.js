$(function () {
  var run = 0,
    heading = $("h1"),
    timer,
    clickCount = 0; // Track clicks

  // Reset to initial state
  function resetUI() {
    heading.text("What's for dinner?");
    $("#what").text("");
    $("#start").val("start").show();
    $("#stop").hide();
  }

  $("#start").click(function () {
    clickCount++;
    
    // Hide start button after 5 clicks
    if (clickCount >= 5) {
      $(this).hide();
      heading.text("So indecisive? Don't eat then!");
      return;
    }

    if (!run) {
      heading.text("What's for dinner?");
      $(this).val("start"); // Keep as "start"
      $("#stop").show();
      
      timer = setInterval(function () {
        var r = Math.floor(Math.random() * foodList.length),
            food = foodList[r];
        
        $("#what").text(food);
        
        // Animation effects
        var rTop = Math.ceil(Math.random() * $(document).height()),
            rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
            rSize = Math.ceil(Math.random() * (37 - 14) + 14);
        
        $("<span class='temp'></span>")
          .text(food)
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
    }
  });

  $("#stop").click(function() {
    clearInterval(timer);
    heading.text("Decision made!");
    $("#start").val("start").show();
    $(this).hide();
    run = 0;
    clickCount = 0; // Reset counter
  });

  document.onkeydown = function enter(e) {
    var e = e || event;
    if (e.keyCode == 13) $("#start").trigger("click");
  };
});