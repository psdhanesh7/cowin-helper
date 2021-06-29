const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = async ({ subject, recipients }, content) => {

    try {
        sgMail.setApiKey(keys.SENDGRID_API_KEY);
        const formattedRecipients = recipients;
        // console.log(formattedRecipients);
        //   const formattedRecipients = recipients.map(({email}) => email);
        const msg = {
            to: formattedRecipients,
            from: 'psdhanesh777@gmail.com',
            subject: subject,
            html: content,
        };
        const response =  await sgMail.send(msg);
        // console.log(response);
        console.log('Email send');
    } catch(err) {
        console.log(err.message)
    }

}
