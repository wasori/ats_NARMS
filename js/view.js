// 날짜 정보 가져오기
var date = new Date();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth();
var currentDate = date.getDate();
var currentHours = date.getHours();
var currentMinutes = date.getMinutes();
var currentSeconds = date.getSeconds();

var today1 = currentYear + '-' + (currentMonth < 10 ? '0' : '') + currentMonth + '-' + (currentDate < 10 ? '0' : '') + currentDate;
var today2 = currentHours + ':' + currentMinutes + ':' + currentSeconds;
var today = today1 + ' ' + today2;
// console.log(today);

const alert_list = document.getElementById("alarm-list");

const clientnum = Math.floor(Math.random() * 101);

// 알람 불러오기
const get_alert = (msg) => {
    const json = JSON.parse(msg);
    console.log(json)

    alert_list.innerHTML = "";
    if (json == "")
        return false;

    for (let idx in json) {
        if (json[idx]["content"] == "water") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 물 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "fire") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 화재 감지 </span>';
            html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: 9px; color:red;">' + json[idx]["value"] + ' mg/m<sup>3</sup></span></span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "dust") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 먼지 감지 </span>';
            html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: 9px; color:red;">' + json[idx]["value"] + ' mg/m<sup>3</sup></span></span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "down") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 낙상 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "distance") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 멈춤 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "pose") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 욕창 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
    }
}

const get_vision = (msg) => {
    const json = JSON.parse(msg);
    console.log(json)

    alert_list.innerHTML;
    if (json == "")
        return false;

    for (let idx in json) {
        if (json[idx]["water_discovery"] == "1") {
            let html_view = "";

            html_view += '<li class = "blink">';
            html_view += '<span class="txt">' + json[idx]["robot_id"] + '로봇 물 감지</span>';
            html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (parseFloat(json[idx]["find_dust"]).toFixed(2) >= 0.3) {
            let html_view = "";

            html_view += '<li class = "blink">';
            html_view += '<span class="txt">' + json[idx]["robot_id"] + '로봇 먼지 감지 </span>';
            html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: 9px; color:red;">' + json[idx]["find_dust"] + ' mg/m<sup>3</sup></span></span>';
            html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (parseFloat(json[idx]["fire_detection"]) >= 300) {
            let html_view = "";

            html_view += '<li class = "blink">';
            html_view += '<span class="txt">' + json[idx]["robot_id"] + '로봇 화재 감지 </span>';
            html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: 9px; color:red;">' + json[idx]["fire_detection"] + ' mg/m<sup>3</sup></span></span>';
            html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["distance"] == "1") {
            let html_view = "";

            html_view += '<li class = "blink">';
            html_view += '<span class="txt">' + json[idx]["robot_id"] + '로봇 멈춤 감지</span>';
            html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
    }
}

const get_sensor = (msg) => {
    const json = JSON.parse(msg);
    console.log(json)

    alert_list.innerHTML;
    if (json == "")
        return false;
    for (let idx in json) {
        if (json[idx]["pose"] == "1") {
            let html_view = "";

            html_view += '<li class = "blink">';
            html_view += '<span class="txt">' + json[idx]["robot_id"] + '로봇 욕창 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["down"] == "1") {
            let html_view = "";

            html_view += '<li class = "blink">';
            html_view += '<span class="txt">' + json[idx]["robot_id"] + '로봇 낙상 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span></span></li>';
            html_view += '</li>';

            alert_list.innerHTML += html_view;
        }
    }
}

// 구독
let client = "";

const onConnect = () => {
    client.subscribe("/response/main/alarm/view");
    client.subscribe("/response/alarm/vision");
    client.subscribe("/response/alarm/sensor");
    setTimeout(publish("/request/main/alarm/all", "0"), 2000);
}

const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
    }
}

// 메세지 수신
const onMessageArrived = (message) => {
    let topic = message.destinationName;
    let msg = message.payloadString;

    switch (topic) {
        case "/response/main/alarm/view":
            get_alert(msg);
            // console.log(msg);
            break;
        case "/response/alarm/vision":
            get_vision(msg);
            // console.log(msg);
            break;
        case "/response/alarm/sensor":
            // get_sensor(msg);
            console.log(msg);
            break;
        default:
            break;
    }
}

// 데이터 보내기

const publish = (topic, message) => {
    let msg = new Paho.Message(message);
    msg.destinationName = topic;
    console.log(topic);
    console.log(msg);
    client.send(msg);
}

// 연결
const connect = () => {
    client = new Paho.Client('112.221.113.29', 9001, "Medical" + String(clientnum));

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect
    });
    console.log("연결성공");
}


// 연결 해제
const disconnecter = () => {
    if (client != "") {
        client.disconnect();
        client = "";
    }
}

// 웹페이지 열리고 실행
window.onload = () => {
    connect();
}