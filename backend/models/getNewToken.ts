const jwt = require("jsonwebtoken");
const config = require("../config-dev.json");

async function getNewToken(user: { isAdmin: string; _id: string }) {
  const payload = {
    user: {
      isAdmin: user.isAdmin,
      _id: user._id,
    },
  };
  return jwt.sign(payload, config.Jwt_Secret, { expiresIn: "1h" });
}

// async function getNewToken(user: { user: { isAdmin: string; _id: string } }) {
//   const payload = {
//     user: {
//       isAdmin: user.user.isAdmin,
//       _id: user.user._id,
//     },
//   };
//   return jwt.sign(payload, config.Jwt_Secret, { expiresIn: "1h" });
// }

module.exports = getNewToken;
