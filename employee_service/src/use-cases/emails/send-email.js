module.exports = function makeSendEmail({
  nodemailer,
  Transporter,
  Jwt_Secret_Key,
  jwt,
  Joi,
  ValidationError,
  getEmployeeByEmail
}) {
  return async function sendEmail({ toEmail }) {


    validateInputData({ toEmail });
    // send mail with defined transport object



    const employeeData = await getEmployeeByEmail({ emailAddress: toEmail })
    console.log("employeeData", employeeData);
    const verificationToken = generateToken(employeeData.id, Jwt_Secret_Key)
    await Transporter.sendMail({
      from: 'divyeshparmar112001@gmail.com',
      to: toEmail,
      subject: "Employee Registered!", // Subject line
      text: `Hello Please click the following link to verify your account: http://localhost:3003/employee/verify/${verificationToken}`,
    });

    console.log(`Email sent to email: ${toEmail}`);
    return 'emali is sent'

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

  function generateToken(id, Jwt_Secret_Key) {
    // Generate the JWT token
    console.log('id', Jwt_Secret_Key)
    const token = jwt.sign(id, Jwt_Secret_Key);

    return token;
  }
}