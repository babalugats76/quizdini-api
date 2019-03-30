const passport = require("passport");

module.exports = app => {
  /**
   * Contact Google have them prompt
   * the user for permission / authentication
   * If given, a request will be sent to `callbackURL'
   * with metadata needed to make handshake which
   * will culminate in Google sending user's profile info
   */
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  /**
   * Implement route for `callbackURL`
   */
  app.get("/auth/google/callback", passport.authenticate("google"));
};
