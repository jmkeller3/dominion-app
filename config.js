"use strict";

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb://john:cookies8@ds141671.mlab.com:41671/dominion-card-app";
exports.TEST_DATABASE_URL ||
  "mongodb://my-first-user:password123@ds161322.mlab.com:61322/dominion-app-test";
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
