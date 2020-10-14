const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const User = require("../services/users/UserSchema");
const { authenticate } = require("../services/users/utils/helpers");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      return await User.findOne({ where: { email: email } })
        .then(async (user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          } else if (!user.validPassword(password)) {
            return cb(null, false, { message: "Incorrect email or password." });
          } else if (!user.isVerified) {
            return cb(null, false, {
              message: "Not verified. Please, check your Email",
            });
          } else {
            return cb(null, user, {
              message: "Logged In Successfully",
            });
          }
        })
        .catch((e) => {
          console.log(e);
          return cb(null, false, { message: "Incorrect email or password." });
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: function (req) {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies["accessToken"];
        }
        return token;
      },
      secretOrKey: process.env["JWT_SECRET"],
    },
    async function (jwtPayload, cb) {
      console.log("jwtPayload", jwtPayload);

      const user = await User.findOne({
        where: {
          id: jwtPayload.id,
        },
      });
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false, { message: "unauthorized" });
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/auth/googleRedirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleid: profile.id,
        email: profile.emails[0].value,
        role: "user",
      };

      try {
        const user = await User.findOne({ where: { googleid: profile.id } });
        if (user) {
          const tokens = await authenticate(user);
          done(null, { user, tokens });
        } else {
          await User.create(newUser);
          const tokens = await authenticate(user);
          done(null, { user, tokens });
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
