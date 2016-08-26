var runner = require('./index');

runner.exec({
    timeout: 100,
    language: 'php',
    code: `
    <?php
    echo 'Hello';ffdfd
    `
});
