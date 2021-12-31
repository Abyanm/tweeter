$(document).ready(function() {
    // --- our code goes here ---
    
    $("#tweet-text").on('keyup', function() {
        let textarea = $("#tweet-text").val()
        let textareaLength = textarea.length

        let charactersLeft = 140 - textareaLength

        let counter = $(".counter").val(charactersLeft)

        if(charactersLeft < 0) {
          //change colour to red
          $(".counter").css("color", "red");
        }
      });
      
  });
  