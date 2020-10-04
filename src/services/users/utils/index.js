const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(mailOptions, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

async function sendVerificationEmail(user, req, res, password = null) {
  try {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1 week",
    });

    let subject = "Account Verification Token";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = "http://" + req.headers.host + "/users/verify/" + token;
    let html = `<p>Hi,  ${
      user.name
    } <p><br> <p>Please click on the following <a href="${link}">link</a> to verify your account.</p>${
      password
        ? `<br><p>Email:${user.email}</p><br><p>Password: ${password}</p>`
        : ``
    }
                  <br><p>If you did not request this, please ignore this email.</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message: "A verification email has been sent to " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { sendEmail, sendVerificationEmail };
