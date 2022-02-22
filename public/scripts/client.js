/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
**/

$(document).ready(function() {
  const createTweetElement = function(tweetObject) {
    const timePosted = timeago.format(tweetObject.created_at);
    const markup = `
      <article>
        <section class="tweet-header">
          <div class="tweet-avatar">
            <img src="${tweetObject.user.avatars}">
            <span>&nbsp&nbsp${tweetObject.user.name}</span>
          </div>
          <span class="tweet-handle">${tweetObject.user.handle}</span>
        </section>
        <br>
        <div class="posted-tweet">
        ${$(`<p class="tweeted-text">`).text(tweetObject.content.text).html()}
        </div>
        <footer class="tweet-footer">
          <div class="tweet-days-ago">
            <i>${timePosted}</i>
          </div>
          <div class="tweet-icons">
            <i class="far fa-flag">&nbsp &nbsp</i>
            <i class="fas fa-heart">&nbsp &nbsp</i> 
            <i class="fas fa-retweet"></i>
          </div>
        </footer>
      </article>
      `;
    return markup;
  };

  const renderMarkup = function(tweetArr) {
    for (let tweetObject of tweetArr) {
      // Create HTML element
      const markup = createTweetElement(tweetObject);
      // Append item to container, newest to oldest
      $('#tweets-container').prepend(markup);
    }
  };

  const getTweets = function() {
    // Get request - old tweets
    $.ajax({
      url: `/tweets/`,
      method: 'GET'
    })
      .done(tweetArr => {
        renderMarkup(tweetArr);
      })
      .fail(err => {
        console.log(`ERROR: ${err.message}`);
      })
      .always(()=> {
        console.log('Request to tweet object has been executed');
      });
  };

  const errorBanner = function(err) {
    if (!$('.invalid-tweet').hasClass("toggled-invalid-tweet")) {
      $('.invalid-tweet').addClass('toggled-invalid-tweet');
    }
    $('.invalid-tweet')
      .text(`Error: ${err}`)
      .slideDown(250, function() {
        setTimeout(function() {
          $('.toggled-invalid-tweet').slideUp(250);
        }, 3500);
      });
  };

  $('.new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    console.log('Submit is being triggered');

    // Post request - new tweets
    const inputBox = $(this).children('#tweetText');
    const tweetText = inputBox.val();
    console.log(`Tweet: ${tweetText}`);

    if (tweetText.length > 140) {
      console.log('REDUCE LENGTH OF YOUR TWEET');
      let err = `Reduce the length of your tweet`;
      return errorBanner(err);
    } else if (tweetText.length === 0) {
      console.log('CANNOT POST AN EMPTY TWEET');
      let err = `Cannot post an empty tweet`;
      return errorBanner(err);
    } else {
      // post to /tweets
      $.ajax({
        url: `/tweets/`,
        method: 'POST',
        data: $(this).serialize()
      }).then(function() {
        $('#tweetText').val("");
        $.get('/tweets/', (data) => {
          const latestTweet = data.slice(-1).pop();
          const latestTweetObj = createTweetElement(latestTweet);
          $('#tweets-container').prepend(latestTweetObj);
        });
      })
        .fail(err => {
          console.log(`ERROR: ${err.message}`);
        })
        .always(()=> {
          $('#counter').val(140);
          console.log('Posting tweet object has been executed, and counter reset');
        });
    }
  });
  getTweets();
});