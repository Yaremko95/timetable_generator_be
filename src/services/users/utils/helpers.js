const jwt = require("jsonwebtoken");
const User = require("../UserSchema");

const authenticate = async (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "150000",
  });
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: "1 week",
    }
  );

  user.refresh_tokens = user.refresh_tokens.concat(refreshToken);
  await User.update(
    { refresh_tokens: user.refresh_tokens },
    { where: { _id: user._id } }
  );

  return { accessToken: token, refreshToken };
};

module.exports = { authenticate };
