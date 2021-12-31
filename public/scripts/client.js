/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (object) {

  return ` 
    <article class="tweet-component">
        <!-- image-username-refkey -->
        <div class="image-username-refkey">
          <div class="image-username">
            <img src=${object.user.avatars} alt="" />
            <span>${escape(object.user.name)}</span>
          </div>
          <div>${escape(object.user.handle)}</div>
          </div>
        <!-- tweet contect -->
        <div class="tweet-content">
        ${escape(object.content.text)}
        </div>
        <!-- time and reactions icons -->
        <div class="time-reactions">
          <p>${escape(timeago.format(object.created_at))}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </article>
    <!-- <div class="tweet-container"> 
        <div>
            <i id="usert"class="fas fa-user-circle"></i>
             <a class= "displayname">${escape(object.user.name)}</a>
            <a id="username">${escape(object.user.handle)}</a>
        </div>
        <div class="tweet"> ${escape(object.content.text)}
        </div>
        <a class="time">${escape(timeago.format(object.created_at))}</a>
        <a class="icon-container">
         <i id="flag" class="far fa-flag"></i>
        <i id="retweet"class="fas fa-retweet"></i>
        <i id="heart"class="far fa-heart"></i>
        </a>
    </div> -->`

}

const renderTweets = function (tweets) {
  // for (let i = tweets.length - 1; i > 0; i--) {
  //   // creates the html for each tweet
  //   const $tweet = createTweetElement(tweets[i])

  //   // adds the tweet-container element to tweets-container
  //   $('.tweets-container').append($tweet);
  // }
tweets.forEach(tweet => {
  let $tweet = createTweetElement(tweet)
  $(".tweets-container").prepend($tweet)
});
}

const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json"
  })
    .then(function (data) {
      // console.log('Success: ', data);
      renderTweets(data)
    });
}
const toggleBackToTopBtn = () => {
  if ($(window).scrollTop() > 0) {
    $(".back-to-top")
      .show()
      .fadeIn("slow");
  } else {
    $(".back-to-top")
      .hide()
      .fadeOut("slow");
  }
};
const toggleTweetForm = () => {
  var $section = $("section.new-tweet");
  if ($section.is(":visible")) {
    $section.slideUp("fast");
  } else {
    $section.slideDown("fast");
    $section.find("textarea").focus();
  }
};

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append(`hello`); 

$(document).ready(function () {
  $(".new-tweet").hide()
  loadTweets();
  $("#form").on("submit", function (event) {
    event.preventDefault()
    // console.log("")
    let data = $(this).serialize()
    let lengthOfTweet = data.length - 5
    // console.log(lengthOfTweet) 
    if (lengthOfTweet == 0) {
      $("#error-zero").slideDown(1500)
      setTimeout(() => {
        $("#error-zero").slideUp(1000)
      }, 4000)
      return 
      // $("#errormessage").append("<div class='error'> This tweet is empty. Please add text. </div>")
    } else if (lengthOfTweet > 140) {
      $("#error-long").slideDown(1500) 
      setTimeout(() => {
        $("#error-long").slideUp(1000)
      }, 4000)
      return
    }
    $.ajax({
      method: "post",
      url: "/tweets",
      type: "application/json",
      data: data,
      success: function () {
        $("textarea").val("")
        $.get("/tweets", function (data) {
          console.log(data)
          $("output").text(140)
          const newtweet = [data.slice(-1).pop()]
          renderTweets(newtweet)
        })

      }
    })
  })
  $(".back-to-top").hide();
  // call toggleBackTpTopBtn on page scroll
  $(window).scroll(toggleBackToTopBtn);
  // clicking on back to top
  $(".back-to-top").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    toggleBackToTopBtn();
  });
  $(".form-toggle").on("click", toggleTweetForm) 

  // $("#form").on("submit" ,function(event) {
  //   event.preventDefault()
  //   let data = $( this ).serialize()
  //   let lengthOfTweet = data.length - 5
  //   console.log(lengthOfTweet)
  //   if(lengthOfTweet == 0 ) {
  //     $("#error-zero").slideDown(1500)
  //     setTimeout(()=>{
  //       $("#error-zero").slideUp(1000)
  //     },4000)
  //     // $("#errormessage").append("<div class='error'> This tweet is empty. Please add text. </div>")
  //   } else if (lengthOfTweet > 140) {
  //     $("#error-long").slideDown(1500)
  //     setTimeout(()=>{
  //       $("#error-long").slideUp(1000)
  //     },4000)
  //   } else {
  //     // send data to localhost:8080/tweets
  //     $.ajax({
  //       type: "POST",
  //     url: "/tweets",
  //     data: $( this ).serialize()
  //     })
  //     location.reload()
  //   }
  // });

});