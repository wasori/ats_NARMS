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

const robotPositions = {
    "MR01": [],
    "MR02": [],
    "MR03": [],
    "MR04": [],
    "MR05": []
};

// 로봇 좌표찍기
const get_robot_position = (msg) => {
    const json = JSON.parse(msg);
    const robotId = json["robot_id"];

    if (robotPositions.hasOwnProperty(robotId)) {
        const robo_x = parseFloat(json["x"]) / 1.314535345512311;
        const robo_y = parseFloat(json["y"]) / 1.112183353437877;

        robotPositions[robotId] = [robo_x, robo_y];

        console.log(robotPositions[robotId]);
    }
}

const draw_robot_positions = () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext("2d");
    // 기존 그림 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const [robotId, coordinates] of Object.entries(robotPositions)) {
        // 좌표와 색상
        const [x, y] = coordinates;
        let color = '';

        if (robotId === 'MR01') {
            color = 'red';
        } else if (robotId === 'MR02') {
            color = 'blue';
        } else if (robotId === 'MR03') {
            color = 'green';
        } else if (robotId === 'MR04'){
            color = 'yellow';
        } else if (robotId === 'MR05'){
            color = 'orange';
        }

        // 원 그리기 시작 설정
        ctx.beginPath();

        // 원 모양 설정
        ctx.arc(x, y, 7, 0, 2 * Math.PI);

        // 그리기
        ctx.stroke();

        // 원 내부 색 채우기
        ctx.fillStyle = color;
        ctx.fill();
    }
};

setInterval(draw_robot_positions, 500);

// 구독
let client = "";

const onConnect = () => {
    client.subscribe("/response/main/alarm/view");
    client.subscribe("/response/alarm/vision");
    client.subscribe("sensor");
    client.subscribe("robot_position");
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
        case "robot_position":
            get_robot_position(msg);
            // console.log(mssg);
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