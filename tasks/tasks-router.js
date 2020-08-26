const router = require("express").Router();
const Tasks = require("./task-model");
const { isValidTask, isValidTaskUpdate } = require("../utils");

// Middleware to dynamically read in post requests
const taskParser = require("./task-parser");

router.get("/", async (req, res) => {
  const { id } = req.decodedToken;
  try {
    const tasks = await Tasks.getByUserId(id);
    res.status(200).json(tasks);
    console.log(tasks);
  } catch (e) {
    res.status(500).json({ message: "Unable to complete your GET request" });
  }
});

router.post("/", taskParser, async (req, res) => {
  // const { name, dueDate, completed, user_id } = req.body;
  const newTask = req.body;
  console.log(newTask);
  if (isValidTask(newTask)) {
    try {
      console.log("hi");
      const resData = await Tasks.add(newTask);
      res.status(201).json(resData);
    } catch (e) {
      res.status(500).json({ message: "Unable to complete your POST request" });
    }
  } else {
    res.status(400).json({ message: "Task is not valid" });
  }
});
router.get("/:task_id", async (req, res) => {
  const { task_id } = req.params;
  try {
    const task = await Tasks.getTask(task_id);
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Unable to complete your request" });
  }
});
router.put("/:task_id", async (req, res) => {
  const { task_id } = req.params;
  const { body: changes } = req;
  if (isValidTaskUpdate(changes)) {
    try {
      const count = await Tasks.update(task_id, changes);
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `Task ${task_id} not found` });
      }
    } catch (e) {
      res.status(500).json({ message: "Unable to complete your request" });
    }
  } else {
    res.status(400).json({ message: "No valid changes detected" });
  }
});

router.delete("/:task_id", async (req, res) => {
  const { task_id } = req.params;
  try {
    const count = await Tasks.remove(task_id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: `Task ${task_id} not found` });
    }
  } catch (e) {
    res.status(500).json({ message: "Unable to complete your request" });
  }
});

module.exports = router;
