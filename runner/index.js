var shell = require('shelljs');
var fs = require('fs');

class Runner {
    static exec (options){
        var code = options.code.trim();
        var language = options.language;
        var timeout = options.timeout;
	var resultLimit = options.resultLimit || 1000;

        return writeFile(code, language)
            .then(function (file) {
                return exec(file, timeout);
            })
	    .then(function(data){
		data.result = data.result.substr(0, resultLimit);
		return data;
	    })
}
}

var languages = {
    php: {
        extension: 'php'
    },
    javascript: {
        extension: 'js'
    }
};

function writeFile(code, language){

    return new Promise(function (resolve, reject) {
        var langSpec = languages[language];

        if(langSpec === undefined){
            reject(new Error('Language not supported'));
        }

        fs.writeFile(__dirname + "/code/file."+langSpec.extension, code, function(err) {
            if(err) {
                reject(err);
            }
            resolve('file.'+langSpec.extension);
        });
    });

}

function exec(file, timeout) {
    timeout = timeout || 1000;
    return new Promise(function (resolve, reject) {
        var _timeout;
        shell.cd(__dirname +'/code');
        _timeout = setTimeout(function () {
            reject(new Error('Script timeout'));
        }, timeout + 100);
        shell.exec('bash ../runner '+file+'', {async: true, silent: false, timeout: timeout}, function (code, stdout, stderr) {
            clearTimeout(_timeout);
            
		resolve({
                result: (code !== 0)? stderr||stdout : stdout,
                error: (code !== 0)
            });
        });
    });



}

module.exports = Runner;
