"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Post",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/theran-3f2473/awesome-backend/dev?headers={"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTEzNjk3MDQsIm5iZiI6MTU1MTM2OTcwNCwiZXhwIjoxNTUxNDU2MTA0fQ.dUxs7zvWIFLnVJFlb5I_TmUI0e0LeTLFZfPRxb21SCU"}`
});
exports.prisma = new exports.Prisma();
