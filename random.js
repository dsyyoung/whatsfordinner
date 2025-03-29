$(function () {
  var run = 0,
      heading = $("h1"),
      timer,
      clickCount = 0,
      currentFood = ""; // Track the currently displayed food

  // Function to display a random food
  function showRandomFood() {
    var r = Math.floor(Math.random() * foodList.length);
    currentFood = foodList[r];
    $("#what").text(currentFood);
    
    // Animation effects
    var rTop = Math.ceil(Math.random() * $(document).height()),
        rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
        rSize = Math.ceil(Math.random() * (37 - 14) + 14);
    
    $("<span class='temp'></span>")
      .text(currentFood)
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
    if (clickCount > 5) {
      heading.text("So indecisive? Don't eat then!");
      return;
    }
    
    run = 1;
    $(this).hide();
    $("#stop").show();
    heading.text("What's for dinner?");
    
    // Show first food immediately
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
    heading.text("Decision made!");
    
    // Ensure the last food remains visible
    if (currentFood) {
      $("#what").text(currentFood);
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