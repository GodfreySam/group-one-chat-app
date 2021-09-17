const sendEmail = require('../misc/mailer');

const verifyUserEmail = async (req, username, email, secretToken) => {
   const html = `
      Hello ${firstName},
      <br/>
      <br/>

      Thank you for registering an account with us at .
      <br/><br/>
      Please copy  to verify your account:  ${secretToken}
      <br/>

      <br/><br/>
      Kind regards,
      <br/>
      <strong>Team WAAWTube.</strong>
   `;

   await sendEmail(
      'godfreysam09@gmail.com',
      email,
      "Please verify your account",
      html
   )
}

module.exports = verifyUserEmail;

