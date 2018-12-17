const exec = require('child_process').exec;

function deploy (cmd, errCb) {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      errCb();
      return
    }

    console.log('stdout-------->', stdout);
    console.log('stderr-------->', stderr);
  })
}

module.exports = deploy;