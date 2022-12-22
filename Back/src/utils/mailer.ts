import nodemailer from 'nodemailer';

const mailerConfig = {
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(mailerConfig);

export const sendConfirmationMail = (to: string, link: string) => {
  const mailOptions = {
    from: 'info@domain.com',
    to,
    subject: 'Please confirm your account',
    html: `<h1>Email Confirmation</h1>    
        <h2>Hello</h2>                
        <p>Please confirm your email by clicking on the following link</p>     
        <a href='${link}'>Click here</a>             
        </div>`,
  };

  return !!mailerConfig.service && transporter.sendMail(mailOptions);
};

export const sendResetMail = (to: string, link: string) => {
  const mailOptions = {
    from: 'info@domain.com',
    to,
    subject: 'Reset account password',
    html: `<h1>Reset Password</h1>    
        <h2>Hello</h2>                
        <p>You can reset your password on the following link</p>     
        <a href='${link}'> Click here</a>             
        </div>`,
  };

  return !!mailerConfig.service && transporter.sendMail(mailOptions);
};
