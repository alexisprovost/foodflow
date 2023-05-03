import { Router } from "express";
import passport from "passport";

export function discordRoutes(router: Router): void {
  router.get("/auth/discord", passport.authenticate("discord"));

  router.get("/auth/discord/callback", passport.authenticate("discord", {
    successRedirect: "/success",
    failureRedirect: "/failure"
  }));
}
