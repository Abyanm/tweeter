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

const createTweetElement = function(object) {

    return ` 
    <div class="tweet-container">
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
    </div>`

}

const renderTweets = function(tweets) {
  for (let i=tweets.length-1; i > 0; i--){
    // creates the html for each tweet
    const $tweet = createTweetElement(tweets[i])

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
    console.log(lengthOfTweet)
    if(lengthOfTweet == 0 ) {
      $("#error-zero").slideDown(1500)
      setTimeout(()=>{
        $("#error-zero").slideUp(1000)
      },4000)
      

      // $("#errormessage").append("<div class='error'> This tweet is empty. Please add text. </div>")
    } else if (lengthOfTweet > 140) {
      $("#error-long").slideDown(1500)
      setTimeout(()=>{
        $("#error-long").slideUp(1000)
      },4000)
    } else {

      // send data to localhost:8080/tweets
      $.ajax({
        type: "POST",
      url: "/tweets",
      data: $( this ).serialize()
      })
      location.reload()


    }

  });




});