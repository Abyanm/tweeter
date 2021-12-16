$(document).ready(function() {
    // --- our code goes here ---
    $("#tweet-text").on('keypress', function() {
        let textarea = $("#tweet-text").val()
        let textareaLength = textarea.length

        let charactersLeft = 139 - textareaLength

        let counter = $(".counter").val(charactersLeft)

        if(charactersLeft < 0) {
          //change colour to red
          $(".counter").css("color", "red");
        }
      });
      
  });
  