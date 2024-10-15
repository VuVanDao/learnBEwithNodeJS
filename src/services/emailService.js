require("dotenv").config();

const nodemailer = require("nodemailer");

let sendSimpleEMail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Van Dao 👻" <dao28905@gmail.email>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend), // html body
  });
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language == "vi") {
    result = ` <h3>Xin chào ${dataSend.patientName}!</h3>
    <h4>Đoán xem ai là người đã đặt lịch thành công nàooo </h4>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thòi gian ${dataSend.time}</b></div> , 
    <div><b>Bác sĩ ${dataSend.doctorName}</b></div>
    <p>Nếu thông tin trên là chuẩn , plzz ấn xác nhận và hoàn tất thủ tục</p>
    <div><a href=${dataSend.redirectLink} target='_blank'>Xác nhận</a></div>
    <div>Cảm ơnnnnnn</div> `;
  }
  if (dataSend.language == "en") {
    result = ` <h3>Hello ${dataSend.patientName}!</h3>
    <h4>Guess who successfully booked the appointment </h4>
    <p>Information on scheduling medical examinations</p>
    <div><b>Time: ${dataSend.time}</b></div> , 
    <div><b>Doctor ${dataSend.doctorName}</b></div>
    <p>If the above information is correct, please click confirm and complete the procedure</p>
    <div><a href=${dataSend.redirectLink} target='_blank'>Confirm</a></div>
    <div>Thank</div> `;
  }
  return result;
};
module.exports = {
  sendSimpleEMail: sendSimpleEMail,
};
