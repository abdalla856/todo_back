const CronJob = require("node-cron");
const notifier = require("node-notifier");
const Todo = require("../models/Todo");
exports.initScheduledJobs = (id) => {
  const scheduledJobFunction = CronJob.schedule("* * * * *", async () => {
    console.log("I'm executed on a schedule!");
    // Add your custom logic here
    const todos = await Todo.find({"user_id" :id});
    for (const task of todos) {
      const timeToDeadline = task.date - new Date();
      const minutesToDeadline = Math.round(timeToDeadline / 60000);

      // send a notification if the task is due within the next hour
      if (minutesToDeadline <= 60 && minutesToDeadline>0) {
        const message = `Task '${task.text}' is due in ${minutesToDeadline} minutes`;
        notifier.notify(
          { message, title: "Task Reminder", sound: true, wait: true },
          (err, response) => {
            if (err) console.error(err);
            console.log(response);
          }
        );
      }
    }
  });

  scheduledJobFunction.start();
};
