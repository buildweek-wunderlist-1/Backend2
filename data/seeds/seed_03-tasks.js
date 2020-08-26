exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          id: 1,
          name: "TEST TASK 1",
          dueDate: "2020-08-29",
          completed: true,
          user_id: 1,
        },
      ]);
    });
};
