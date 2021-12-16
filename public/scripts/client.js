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
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }



// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append(`hello`); 

$(document).ready(function() {
    const $tweet = createTweetElement(tweetData);
    // Test / driver code (temporary)
    // console.log($tweet); // to see what it looks like
    $('.tweets-container').append($tweet); 
});