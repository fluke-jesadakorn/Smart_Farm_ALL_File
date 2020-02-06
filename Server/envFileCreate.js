const crypto = require('crypto');
const fs = require('fs');

const password = 'InsertHere'; //insert Here

const algorithm = 'aes-192-cbc';

const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0); // Initialization vector.

// encrypt
// const cipher = crypto.createCipheriv(algorithm, key, iv);
// let encrypted = cipher.update(fs.readFileSync('./.env', 'utf8') , 'utf8', 'hex');
// encrypted += cipher.final('hex');
// console.log(encrypted);

//decrypt
if (password !== 'InsertHere') {
    const encrypted = 'ac075bedf9be623b033ec4f31cecad5af8988189f690ded7e6556bf60966207f63b8cfe431518f242a823de1ce5d3a9f0165749335686a655b0c887bb19378b86e2d6c1b0e8a5a76e1408bc7713d6add2d401d7b2315df8dfb68d8a995e99561113ae2c3137497e609b25feb17990ec3d2b0f676489b59fafc5239e22ffdb153c90f743c967f531e07804b21e48f8fc1031806c39395aeda68dc08c0234d3cb46fc6b9e6be77fe8e6a280dd34ca68a7046733238bc990a510cf0e0d1ea94ea625faf881752177703a2e785197f163bf92ee19b23d1b138f2554de30a12844c3dc448df5a019becaff9e5c1548a099467188cf0455bf77ed4f1c333fd90baeed4eb1db0430f175e26c50d07fc56b957c94833d9b3b3b8eb8b38a655df1fae04bc993b18fcae63617bbabbefe612655e0429e73db09095b9a645367ecdd616b605';
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    fs.writeFileSync('./.env', decrypted, () => {
        console.log(`creacted .env`)
    });
}
else {
    console.log('please Insert Your Password')
}
