const queue = require("./");
const sendMessage = require("../controllers/sendMessage");
const debug = require("debug")("debug:dispatcherMessage");

queue.process("message", (job, done) => {
  queue
    .getJobsCount("message")
    .then(n => debug("messages jobs", n))
    .catch(e => debug("messages job error", e));

  debug("process:message", job.data);
  circuitBreaker
    .exec(job.data, done)
    .then(ok => debug("exec:ok", ok))
    .catch(error => debug("exec:error", error.message));
});
