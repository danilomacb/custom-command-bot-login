const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");

const User = require("./models/User");

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }

  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.PASSPORT_SECRET,
    },
    async (payload, done) => {
      let user;
      try {
        user = await User.findById({ _id: payload.sub });
      } catch (err) {
        done(err, false);
        return;
      }

      if (user) {
        done(null, user);
        return;
      }

      done(null, false);
      return;
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let user;
    try {
      user = await User.findOne({ username });
    } catch (err) {
      done(err);
      return;
    }

    if (!user) {
      done(null, false);
      return;
    }

    let isMatch;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      done(err);
      return;
    }

    if (!isMatch) {
      done(null, isMatch);
      return;
    }

    done(null, user);
    return;
  })
);
