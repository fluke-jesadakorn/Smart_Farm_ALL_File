const cp = require('child_process');
const express = require('express');
const app = express();
const port = 90;

app.post('/onPush', async (req, res) => {
    await cp.exec('cd /root/SmartFarmV.2 && git pull', (err, stdout, stderr) => {
        if (err) {
            console.log(err);

        } else {
            console.log(stdout);
        }
    });

    await res.status(200).end("Thank You For Sending")
})
app.listen(port, () => {
    console.log(`git auto pull running on port ${port}`);
});