const sendEmail = require('../misc/mailer');
const { getMaxListeners } = require( '../models/User.model' );

const verifyUserEmail = async (req, firstName, email, secretToken) => {
   const html = `
      Hello ${firstName},
      <br/>
      <br/>

      Thank you for registering an account with us at .
      <br/><br/>
      Please copy  to verify your account:  <strong>${secretToken}<strong/>
      <br/>

      <br/><br/>
      Kind regards,
      <br/>
      <strong>Team WAAWTube.</strong>
   `;

   await sendEmail(
      'akpologun.winner@gmail.com',
      'akpologun.winner@gmail.com',
      "Please verify your account",
      html
   )
}

module.exports = verifyUserEmail;

