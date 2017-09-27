let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

const CHANNEL_ACCESS_TOKEN = 'OvI4YotQg3BBfTDa9fz5I9vcM6VbbgxgPLN/MaqH0uY0L2o6fY9Z5ily+uxjAbBq09cHi9ttLWHkVJD01TcsnHyEfmKPbomITsK34XCDCziywLPhH+xtcBMa5vO0UDbT2clDbJM7Rx2tgDTV0tEFXwdB04t89/1O/w1cDnyilFU='
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
// return should send response, if not ,line will not send because line think you not finish  
app.post('/', function (req, res) {
    let body  = req.body
    let text  = body.events[0].message.text
    let replyToken = body.events[0].replyToken
    if (text =="你叫什麼名字"){
        text="曾威明" 
    }else if(text =="你的信箱"){
        text="ttsang529@gmail.com"
    }
    
    sendMessage(replyToken, text)
    console.log(JSON.stringify(body,null,2))
    res.send('')
})

// generic function sending messages
function sendMessage(replyToken, text) {
    let body = {
        replyToken,
        messages: [{
            type: 'text',
            text,
        }],
    };

    let options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
        body,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}
