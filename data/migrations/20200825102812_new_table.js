exports.up = function (knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments("id");

      tbl.string("firstName").notNullable();
      tbl.string("lastName").notNullable();
      tbl.string("username").notNullable().unique();
      tbl.string("password").notNullable();
    })
    .createTable("tasks", tbl => {
      tbl.increments("id");

      tbl.string("taskName").notNullable();
      tbl.date("dueDate").nullable();
      tbl.boolean("completed").defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tasks").dropTableIfExists("users");
};
