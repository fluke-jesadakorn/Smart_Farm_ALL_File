require('dotenv').config()
const serverType = 'Line';
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5006
const LineToken = process.env.LINE_TOKEN;
const serverWithSSL = require('./globalHttpsConf')
const NBServ = require('./NBServ')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/webhook', async (req, res) => {
    let reply_token = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text;
    reply(reply_token, msg);
    res.sendStatus(200);
})

serverWithSSL(PORT, app, serverType);

async function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${LineToken}}`,
        'responseType': 'json',
    }

    let resMessage = async (msg) => {
        if (await msg === 'เปิดแจ้งเตือน' || await msg == "1") {
            // return await onBot(true)
            return 'ได้ครับ';
        }
        else if (await msg === 'ปิดแจ้งเตือน' || await msg == "2") {
            return await offBot(false)
        }
        else if (await msg === 'ดูอุณหภูมิ' || await msg == "3") {
            return await NBServ.getLastData();
        }
        else if (await msg === 'ดูความชื้น' || await msg == "4") {
            return await NBServ.getLastData();
        }
        else if (await msg === 'ปิดน้ำ' || await msg == "6") {
            await NBServ.waterOnOff(0);
            return await "ปิดน้ำแล้ว";
        }
        else if (await msg === 'เปิดน้ำ' || await msg == "7") {
            await NBServ.waterOnOff(1);
            return await "เปิดน้ำแล้ว";
        }
        else if (await msg === 'ตั้งค่า' || await msg == "8") {
            return await "ตั้งค่า ดังนี้";
        }
        else if (await msg == 'ดูคำสั่ง' || await msg == 'help' || await msg == '?') {
            return await `1. ปิดการแจ้งเตือน \n2. เปิดการแ้งเตือน \n3. ดูอุณหภูมิ \n4. ดูความชื้น \n5. ดูรูป \n6. ปิดน้ำ \n7. เปิดน้ำ`
        }
        else {
            return await 'โปรดพิมพ์ว่า "?" หรือ "ดูคำสั่ง" เพื่อดูคำสั่งทั้งหมด'
        }
    }

    const getLastData = async () => {
        const result = await axios.get('http://localhost:5000/api/getLastData')
        return JSON.stringify(result);
    }

    onBot = async (command) => {
        await console.log(command)
    }

    offBot = async (command) => {
        await console.log(command)
    }

    let body = await JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: await resMessage(msg)
        }]
    })

    axios({
        method: 'POST',
        headers: headers,
        data: body,
        url: 'https://api.line.me/v2/bot/message/reply',
    })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
}