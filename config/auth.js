// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1541798349241263', // your App ID
        'clientSecret'    : 'dd5489d88cabdaa6e029f5ac4a2f6fd1', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'o0Q0ZkND9JFAVTh4jBK8lxblA',
        'consumerSecret'     : '4AlJnW6N3UYDEu8wOIM8VeK916zX74tk5rj3nOq5MsAPp0Pkog',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
