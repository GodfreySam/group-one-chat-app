const sendEmail = require('../misc/mailer');
const { getMaxListeners } = require( '../models/User.model' );

const resetPasswordEmail = async (req, firstName, email, secretToken) => {
   const html = `
      Hello ${firstName},
      <br/>
      <br/>
      Please follow this link to reset your password:  <strong>${secretToken}<strong/>
      <br/>

      <br/><br/>
      Kind regards,
      <br/>
      <strong>Team WAAWTube.</strong>
   `;

   await sendEmail(
      'akpologun.winner@gmail.com',
      email,
      "Please verify your account",
      html
   )
}

module.exports = resetPasswordEmail;

