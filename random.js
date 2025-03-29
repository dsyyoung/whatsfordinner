$(function () {
  var run = 0,
      heading = $("h1"),
      timer,
      clickCount = 0,
      currentFood = ""; // Track the currently displayed food

  // Function to display a random food
  function showRandomFood() {
    var r = Math.floor(Math.random() * foodList.length),
      currentFood = foodList[r-1];
    $("#what").html(currentFood);
    
    // Animation effects
    var rTop = Math.ceil(Math.random() * $(document).height()),
        rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
        rSize = Math.ceil(Math.random() * (37 - 14) + 14);
    
    $("<span class='temp'></span>")
      .html(currentFood)
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
  }

  $("#start").click(function () {
    if (run) return; // Prevent multiple starts
    
    clickCount++;
    if (clickCount > 3) {
      heading.text("So indecisive? Don't eat then!");
      $("#start").hide();
      return;
    }
    
    run = 1;
    $(this).hide();
    $("#stop").show();
    $("#question").text("What's for dinner?");
    
    showRandomFood();
    
    // Continue cycling foods
    timer = setInterval(showRandomFood, 300);
  });

  $("#stop").click(function() {
    if (!run) return; // Prevent stopping when not running
    
    clearInterval(timer);
    run = 0;
    $("#stop").hide();
    $("#start").show();
    $("#question").text("Decision made!");
    if (currentFood) {
      $("#what").html(currentFood);
    } else {
      // If somehow currentFood is empty, display a message
      $("#what").html("No food selected.");
    }
  });

  // Reset click counter when starting fresh
  $(document).on('click', '#start', function() {
    if (!run) clickCount = 0;
  });

  document.onkeydown = function enter(e) {
    var e = e || event;
    if (e.keyCode == 13) $("#start").trigger("click");
  };
});