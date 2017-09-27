//Import statements
const request = require('request');

//Getting input

let vars = {};
vars.msg = process.argv[2] || null;
vars.icon = process.argv[3] || null;
vars.token = process.argv[4] || null;


// Making Variables nice and easy to access

const {msg, icon, token} = vars;

let setSlackStatus = (statusText, statusEmoji, accessToken) => {
    return new Promise((resolve, reject) => {
        const profile = {
            'status_text': statusText,
            'status_emoji': statusEmoji,
        };
    const profileJson = JSON.stringify(profile);
    const encodedProfile = encodeURIComponent(profileJson);
    const baseUrl = 'https://slack.com/api/users.profile.set';
    const fullUrl = `${baseUrl}?token=${accessToken}&profile=${encodedProfile}`;
    request.post({
        url: fullUrl,
    }, (error, response, body) => {
        if (error || response.statusCode >= 400) {
        reject(error || new Error('Failed to set Slack status'));
    } else {
        resolve(statusText);
        console.log("Status Has Been Changed");
    }
});
});
};


if(msg && icon && token){
    setSlackStatus(msg, icon, token);
}else{
    console.log("Slack-Status-Changer: \n Example Usage: node app.js [status message] [status icon] [slack user token] \n Example Emojis: :coffee: :airplane: :alien: :apple: :airplane: :thumbsup: ");
}





