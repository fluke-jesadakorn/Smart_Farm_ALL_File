const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 5006
const LINE_SECRETE_TOKEN = require('../config').LINE_SECRETE_TOKEN

require('dotenv').config()
async function line(){
    console.log(`LineServerStartAtPort ${port}`)
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.post('/webhook', (req, res) => {
        let reply_token = req.body.events[0].replyToken
        let msg = req.body.events[0].message.text
        reply(reply_token, msg)
        res.sendStatus(200)
    })

    app.listen(port)

    async function reply(reply_token, msg) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': LINE_SECRETE_TOKEN
        }

        let resMessage = async (msg) => {
            // switch(msg){
            //     case 'สวัสดี': return 'สวัสดีมีอะไรให้เราช่วย'
            //     break;
            //     case 'ดูคำสั่ง': return  `1. ดูอุณหภูมิ \n2. ดูความชื้น \n3. ดูรูป`
            //     break;
            //     case 'ดูอุณหภูมิ' : return await getData()
            //     break;
            //     default : return 'โปรดพิมพ์ว่า "ดูคำสั่ง" เพื่อดูคำสั่งทั้งหมด'
            // }
            if(await msg == 'เปิดแจ้งเตือน' || await msg == "1") return await onBot(true)
            else if(await msg == 'ปิดแจ้งเตือน' || await msg == "2") return await offBot(false)
            else if(await msg == 'สวัสดี') return await 'สวัสดีมีอะไรให้เราช่วย'
            else if (await msg == 'ดูอุณหภูมิ' || await msg == "3") return await getLastData()
            else if (await msg == 'ดูคำสั่ง'|| await msg == 'help') return await `1. ดูอุณหภูมิ \n2. ดูความชื้น \n3. ดูรูป`
            else return await 'โปรดพิมพ์ว่า "ดูคำสั่ง" เพื่อดูคำสั่งทั้งหมด'
        }

        onBot = async(command) => {
            await console.log(command)
        }

        offBot = async(command) => {
            await console.log(command)
        }

        getLastData = async() => {
            const get = await axios.get('http://localhost:5004/api/getData')
            console.log(await get.data[0].data)
            return await get.data[0].data
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
            url: 'https://api.line.me/v2/bot/message/reply'
        })
    }
}
module.exports = {line}