const QRCode = require("qrcode");
const generateQR = async (text) => {
  try {
    const encoded_data = await QRCode.toDataURL(text);
    // console.log(encoded_data);
    return encoded_data;
  } catch (err) {
    console.error(err);
  }
};
module.exports = {generateQR}