var last_known_scroll_position = 0;
var last_mouse_position = 0;
var ticking = false;

function reveal(scroll_pos) {
  console.log(`test`);
  if (last_known_scroll_position > 50) {
    $("#what").show("slow");
  }

  if (last_known_scroll_position > 120) {
    $("#how").show("slow");
  }

  if (last_known_scroll_position > 350) {
    $("#who").show("slow");
  }
}

window.addEventListener("wheel", function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      reveal(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

window.addEventListener;

$("#what").hide();
$("#how").hide();
$("#who").hide();

$("html").bind("mousewheel DOMMouseScroll", function(e) {
  let delta = e.originalEvent.wheelDelta;
  if (delta) {
    console.log(delta);
  }
  if (delta <= -1) {
    $("#what").show("slow");
  }
  if (delta <= -40) {
    $("#how").show("slow");
  }
  if (delta <= -80) {
    $("#who").show("slow");
  }
});
