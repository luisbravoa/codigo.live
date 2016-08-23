const spawn = require('child_process').spawn;
var data = `"echo 'sadas';";`;
console.log(data)

const ls = spawn('php', ['-r', data]);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});