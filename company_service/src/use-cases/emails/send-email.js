module.exports = function makeSendEmail({
  Transporter,
  Joi
}) {
  return async function sendEmail({ toEmail }) {
    console.log("toemail", toEmail);
    validateInputData({ toEmail });

    Transporter.sendEmail({
      from: 'divyeshparmar112001@gmail.com',
      to: toEmail,
      subject: 'Sending Email to company',
      text: 'new employee is join to your company'
    });
  }
  function validateInputData({ toEmail }) {
    const schema = Joi.object({
      toEmail: Joi.string().email().required(),
    });
    const { error } = schema.validate({ toEmail });
    if (error) {
      console.log("error", error.details[0].message)
      throw new ValidationError(error.details[0].message);
    }
  }
}

