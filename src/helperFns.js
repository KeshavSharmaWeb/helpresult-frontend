const { default: axios } = require("axios");
const { url } = require("./config");

function formattedDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

const userExists = async (userId) =>  {
  const res = await axios.post(`${url}/user/check`, { id: userId });
  return res.data.exists;
}

exports.formattedDate = formattedDate;
exports.userExists = userExists;