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
    // console.log(msg);
    const json = JSON.parse(msg);
    // console.log(json)

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
    console.log(msg);
    const json = JSON.parse(msg);
    console.log(json);

    if (json == "")
        return false;
    if (json["pose"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["room"] + '호 ' + json["sickbed"] + '병상 욕창 감지</span>';
        html_view += '<span class="group"><span class="time">' + json["uptime"] + '</span></span></li>';

        addNewAlert(html_view);
    }
    if (json["down"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["room"] + '호 ' + json["sickbed"] + '병상 낙상 감지</span>';
        html_view += '<span class="group"><span class="time">' + json["uptime"] + '</span></span></li>';

        addNewAlert(html_view);
    }

}

const get_sensor = (msg) => {
    const json = JSON.parse(msg);
    console.log(json)

    if (json == "")
        return false;

    if (json["water discovery"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 물 감지</span>';
        html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';

        addNewAlert(html_view);
    }
    if (parseFloat(json["find dust"]).toFixed(2) >= 0.3) {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 먼지 감지 </span>';
        html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: 9px; color:red;">' + json["find dust"] + ' mg/m<sup>3</sup></span></span>';
        html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';

        addNewAlert(html_view);
    }
    if (parseFloat(json["fire detection"]) > 300) {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 화재 감지 </span>';
        html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: 9px; color:red;">' + json["fire detection"] + ' mg/m<sup>3</sup></span></span>';
        html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';

        addNewAlert(html_view);
    }
    if (json["distance"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 멈춤 감지</span>';
        html_view += '<span class="group"><span class="time">' + today + '</span></span></li>';

        addNewAlert(html_view);
    }
}

// 신규 알림 추가 함수
const addNewAlert = (html) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = html;

    // alert_list의 첫 번째 자식으로 새로운 항목을 추가합니다.
    if (alert_list.firstChild) {
        alert_list.insertBefore(newLi, alert_list.firstChild);
    } else {
        alert_list.appendChild(newLi);
    }

    // 새로 추가된 li에 깜빡임 효과 추가
    newLi.classList.add("blink");

    // 스크롤을 맨 위로 조절합니다.
    alert_list.scrollTop = 0;
};

// 구독
let client = "";

const onConnect = () => {
    client.subscribe("/response/main/alarm/view");
    client.subscribe("/response/alarm/vision");
    client.subscribe("sensor");
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
            // console.log(msg);
            get_vision(msg);
            break;
        case "sensor":
            get_sensor(msg);
            // console.log(msg);
            break;
        default:
            break;
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     const test_bn = document.getElementById("test-bn");

//     test_bn.addEventListener("click", () => {
//         let topic = "aos_pose_detect_result";
//         let msg = '{"robot_id":"MR01","pose":"left","falldown":"true","patient_no":"201-03"}';
//         publish(topic, msg);
//     });
// });

// 데이터 보내기

const publish = (topic, message) => {
    let msg = new Paho.Message(message);
    msg.destinationName = topic;
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