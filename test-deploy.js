const exec = require('child_process').exec;

console.log('--------CMD START!---------');
exec('sh ./deploy.sh', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    errCb();
    return
  }

  console.log('stdout-------->', stdout);
  console.log('stderr-------->', stderr);
})
