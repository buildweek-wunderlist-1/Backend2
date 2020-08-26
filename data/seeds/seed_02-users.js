const bc = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "rowValue1",
          name: "brandon",
          email: "b@n.com",
          password: bc.hashSync("password", 8),
        },
      ]);
    });
};
