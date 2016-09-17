var qr = require('qr-image');
const config = require('../config');
module.exports = {
    
    qr: function (req, res) {
        var id = req.params.id;
        var code = qr.image(config.baseUrl + id, {
            type: 'svg'
        });
        res.type('svg');
        code.pipe(res);
    }

};
