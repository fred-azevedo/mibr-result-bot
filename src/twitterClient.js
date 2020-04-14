const Twitter = require('twitter-lite');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});
  
async function tweet(status) {
    const tweet = await client
        .post("statuses/update", {
            status: status
    });
}

module.exports = tweet;