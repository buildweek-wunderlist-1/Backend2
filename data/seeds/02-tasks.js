exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        { id: 1, name: "rowValue1" },
        { id: 2, dueDate: "rowValue2" },
        { id: 3, colName: "rowValue3" },
      ]);
    });
};
