$(document).ready(function(){
    $(window).resize(function(){
      window_width = $(window).width();
      console.log(window_width);
      if(window_width <=768) {
        $("#wrapper").addClass("active")
      } else{
        $("#wrapper").removeClass("active")
      }
    })
});
$(".sidebar-toggle").click(function(e) {
      if (!$("#wrapper").hasClass("active")){
        $("#wrapper").toggleClass("active")
      } else {
        $("#wrapper").toggleClass("active");
        div = '<div id="bodyClick"></div>';
        $(div).appendTo("body").click(function(){
          e.preventDefault();
          $("#wrapper").toggleClass("active");
          $("#bodyClick").remove();
        })
      }
    });

    var $draggable = $('.task').draggabilly({
      containment: '.task-container'
    })
