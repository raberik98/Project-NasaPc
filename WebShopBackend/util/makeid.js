const fs = require('fs');

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    do {
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
       charactersLength));
         }
    } while (fs.existsSync(__dirname + "/images/products/" + result + ".jpg"))
   return result;
}

module.exports = makeid;