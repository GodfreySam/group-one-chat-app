const sendEmail = require('../misc/mailer');
const { getMaxListeners } = require( '../models/User.model' );

const verifyUserEmail = async (req, firstName, email, secretToken) => {
   const html = `
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>iconnect Email Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8f8f8">
    <table
      id="body"
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        max-width: 800px;
        margin: 0 auto;
        font: 1em Raleway;
        background-color: #ffffff;
      "
    >
      <tr>
        <td style="padding: 0">
          <table
            align="center"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="border-collapse: collapse"
          >
            <tr>
              <td
                width="100%"
                height="139px"
                align="center"
                style="
                  background: #959a9e
                    no-repeat center/cover;
                "
              >
                <a
                  href="https://test.futurexeducation.com
               "
                >
                  <div>
                    <img
                      src="https://cloud1.email2go.io/144a3f71a03ab7c4f46f9656608efdb2/c4985a205e367ea68b9ff0d09f6ba3592379458e72a76692878f439658f4e3a5.jpg"
                      width="150px"
                      height="50px"
                      style="display: block"
                    />
                  </div>
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 1em 0.5em">
                <table
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="border-collapse: collapse"
                >
                  <tr>
                    <td style="padding: 0.5em 0">
                      <p style="margin: 0px 0px 0px 30px; font: 2em Roboto; color: #000000dd">
                        Dear ${firstName}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 0.5em 3em">
                      <p style="margin:0px 0px 0px 30px; color: #000000dd; font: 1em Raleway">
                        You have been signed up as a user on our
                        platform. To continue with your registration, copy
                        the six digit code below:
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="border-collapse: collapse"
                      >
                        <tr>
                          <td align="center" width="100%">
                              <div
                                style="
                                  width: 100%;
                                  color: #000000dd;
                                 
                                  max-width: 200px;
                                  
                                  background-color: #f3f3f3;
                                "
                              >
                              <p style="font: 2em Raleway; font-weight: bolder;  padding: 1em; cursor: pointer;
                              ">${secretToken}</p>
                              </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding: 1em 0.5em">
                            <div style="margin-top: 0.3em; font: 1em Raleway">
                              For more enquiries, call +234 703 251 2345
                            </div>
                            <div style="margin-top: 0.3em; font: 1em Raleway">
                              support@iconnect.com
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                width="100%"
                height="165px"
                align="center"
                style="
                  background: #0d4d92
                    no-repeat center/cover;
                "
              >
                <table
                  cellpadding="0"
                  cellspacing="0"
                  width="90%"
                  style="border-collapse: collapse"
                >
                  <tr align="center">
                    <td style="margin: 0">
                      <a href="https://www.facebook.com/futurexedu/">
                        <img
                          src="https://cloud1.email2go.io/144a3f71a03ab7c4f46f9656608efdb2/e273421eb93b2880380dfb56165648f6c8c978774a1815d85cd4ba754ca4c85f.png"
                          style="width: 2em"
                      /></a>
                    </td>
                    <td>
                      <a href="https://www.twitter.com/futurexedu/"
                        ><img
                          src="https://cloud1.email2go.io/144a3f71a03ab7c4f46f9656608efdb2/b85bed922f7a131915f6e8dfd59b5444ecd8354a8dd461ba2fa8fb81d2807d90.png"
                          width="40px"
                          style="width: 2em"
                      /></a>
                    </td>
                    <td>
                      <a href="https://www.instagram.com/futurexedu/">
                        <img
                          src="https://cloud1.email2go.io/144a3f71a03ab7c4f46f9656608efdb2/9ffac1cdb351fca85c901fcaef1bd68ab6ee55e2c0d8958b90859c0ef9a84d61.png"
                          style="width: 2em"
                        />
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="3"
                      style="
                        text-align: center;
                        color: #ffffff;
                        font: 1em Raleway;
                      "
                    >
                      <div style="margin-top: 2em">
                        All rights reserved &copy; 2021
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

   `;

   await sendEmail(
      'akpologun.winner@gmail.com',
      email,
      "Please verify your account",
      html
   )
}

module.exports = verifyUserEmail;

