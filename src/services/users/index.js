const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../db/UserSchema");
const jwt = require("jsonwebtoken");
const Timetable = require("../../db/TimeTableSchema");
const { sendVerificationEmail } = require("./utils/index");
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      req.user.refresh_tokens = req.user.refresh_tokens.filter(
        (t) => t !== req.cookies.refreshToken
      );
      await User.update(
        { refresh_tokens: req.user.refresh_tokens },
        { where: { id: req.user.id } }
      );

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).send();
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

router
  .route("/me")
  .get(
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      try {
        const timetable = await Timetable.findOne({
          where: { adminId: req.user.id },
        });
        console.log(timetable);
        res.status(200).send({
          ...req.user.dataValues,
          password: "",
          refresh_tokens: [],
          timetable: timetable.get({ plain: true }),
        });
      } catch (e) {
        console.log(e);
        const error = new Error();
        error.httpStatusCode = 404;
        next(error);
      }
    }
  );

router.route("/signUp").post(async (req, res, next) => {
  try {
    //console.log(req.body);
    const newUser = await User.create(req.body);

    if (newUser) {
      await sendVerificationEmail(newUser, req, res);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.route("/login").post(async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err || !user) {
        return res.status(404).json({
          ...info,
        });
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          res.status(500).send(err);
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1 week",
        });
        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_JWT_SECRET,
          {
            expiresIn: "1 week",
          }
        );
        user.refresh_tokens = user.refresh_tokens.concat(refreshToken);
        console.log(user);
        await User.update(
          { refresh_tokens: user.refresh_tokens },
          { where: { id: user.id } }
        );
        res.cookie("accessToken", token, {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });

        res.cookie("refreshToken", refreshToken, {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });

        return res.json({
          refreshToken,
          accessToken: token,
        });
      });
    }
  )(req, res, next);
});

router.route("/refreshToken").post(async (req, res, next) => {
  console.log(req.cookies);
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        console.log("no user");

        res.status(401).send("no user");
      } else {
        const currentToken = user.refresh_tokens.find(
          (token) => token === refreshToken
        );
        if (!currentToken) {
          console.log("no token");
          res.status(401).send("no token");
        } else {
          user.refresh_tokens = user.refresh_tokens.filter(
            (t) => t !== currentToken
          );
          const { accessToken, refreshToken } = authenticate(user);
          res.cookie("accessToken", accessToken, {
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });

          res.cookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });
          res.send({
            refreshToken,
            accessToken,
          });
        }
      }
    } else {
      console.log("catch");
      const error = new Error("no token");
      error.httpStatusCode = 500;
      next(error);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router
  .route("/googleLogin")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/googleRedirect")
  .get(passport.authenticate("google"), async (req, res, next) => {
    try {
      const { token, refreshToken } = req.user.tokens;
      res.cookie("accessToken", token, {
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refreshToken",
      });
      res.status(200).send("ok");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
router.route("/verify/:token").get(async (req, res, next) => {
  try {
    if (!req.params.token)
      return res
        .status(400)
        .json({ message: "We were unable to find a user for this token." });
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const user = await User.findOne({ id: decoded.id });

    if (!user)
      return res.status(400).json({
        message:
          "We were unable to find a valid token. Your token my have expired.",
      });

    if (user.isVerified)
      return res
        .status(400)
        .json({ message: "This user has already been verified." });
    await User.update({ isVerified: true }, { where: { id: user.id } });
    res.redirect(`${process.env.FE_URL}/login`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
