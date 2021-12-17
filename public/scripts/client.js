/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(object) {
    return ` 
    <div class="tweet-container">
        <div>
            <i id="usert"class="fas fa-user-circle"></i>
             <a class= "displayname">${object.user.name}</a>
            <a id="username">${object.user.handle}</a>
        </div>
        <div class="tweet"> ${object.content.text}
        </div>
        <a class="time">${timeago.format(object.created_at)}</a>
        <a class="icon-container">
         <i id="flag" class="far fa-flag"></i>
        <i id="retweet"class="fas fa-retweet"></i>
        <i id="heart"class="far fa-heart"></i>
        </a>
    </div>`

}

const renderTweets = function(tweets) {
  for (const tweetInfo of tweets){
    // creates the html for each tweet
    const $tweet = createTweetElement(tweetInfo)

    // adds the tweet-container element to tweets-container
    $('.tweets-container').append($tweet); 
  }

}

const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json"
  })
  .then(function (data) {
    console.log('Success: ', data);
    renderTweets(data)
  });
}

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append(`hello`); 

$(document).ready(function() {
  loadTweets();
  
  $("#form").on("submit" ,function(event) {
    event.preventDefault()
    let data = $( this ).serialize()
    let lengthOfTweet = data.length - 5
    if(lengthOfTweet == 0 || lengthOfTweet > 140) {
      return;
    } else {
      // send data to localhost:8080/tweets
      $.ajax({
        type: "POST",
      url: "/tweets",
      data: $( this ).serialize()
      })

    }

  });




});