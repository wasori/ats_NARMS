const id = document.getElementById("id");
const room = document.getElementById("room");
const sickbed = document.getElementById("sickbed");

const start = document.getElementById("start");
const patrol = document.getElementById("patrol");
const turn = document.getElementById("return");
const stop = document.getElementById("stop");
const pop = document.getElementById("popup");

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

const alert_list = document.getElementById("alarm-list");

const clientnum = Math.floor(Math.random() * 101);

let xaxis = "";
let yaxis = "";
let locationdata = [];

let client = "";

const popup = (me) => {
    pop.style.display = "flex";

    let topic = "/request/data/alarm/one";
    let message = me.value;

    publish(topic,message);
}

const popclose = () => {
    pop.style.display = "none";
}

const upalarm = (num) =>{

    let activeId = "MR10";
    let activedate = "location";

    let comment = document.getElementById(num.value);

    let topic = "/request/update/alarm/one";
    let message = '{"num":"' + num.value + '","comment":"' + comment.value+ '"}';

    publish(topic,message);

    popclose();
}

const pop_view = (msg) =>{
    const json = JSON.parse(msg);

    if (json == "")
        return false;

    let pophtml = "";

    if(json[0]["conmment"]=="" || json[0]["conmment"]== null)
        json[0]["conmment"] = "";

    switch (json[0]["content"]) {
        case "water":
            pophtml +='<div class="tit">'+json[0]["rid"]+' 로봇 물 감지</div>';
            pophtml +='<div class="comment"><p>조치 행동</p>';
            pophtml +='<input type="text" id="'+json[0]["num"]+'" value="'+json[0]["comment"]+'"></div>';
            pophtml += '<div class="bn"><button type="button" value="'+json[0]["num"]+'" onclick="upalarm(this)">확인</button>';
            pophtml += '<button type="button" onclick="popclose();">취소</button></div>';
            break;
        case "fire":
            pophtml +='<div class="tit">'+json[0]["rid"]+' 로봇 화염 감지</div>';
            pophtml += '<span>'+json[0]["value"]+'mg/m<sup>3</sup></span>';
            pophtml +='<div class="comment"><p>조치 행동</p>';
            pophtml +='<input type="text" id="comment" value="'+json[0]["comment"]+'"></div>';
            pophtml += '<div class="bn"><button type="button" value="'+json[0]["num"]+'" onclick="upalarm(this)">확인</button>';
            pophtml += '<button type="button" onclick="popclose();">취소</button></div>';
            break;
        case "dust":
            pophtml +='<div class="tit">'+json[0]["rid"]+' 로봇 미세먼지 감지</div>';
            pophtml +='<div class="comment"><p>조치 행동</p>';
            pophtml +='<input type="text" id="comment" value="'+json[0]["comment"]+'"></div>';
            pophtml += '<div class="bn"><button type="button" value="'+json[0]["num"]+'" onclick="upalarm(this)">확인</button>';
            pophtml += '<button type="button" onclick="popclose();">취소</button></div>';
            break;
        case "distance":
            pophtml +='<div class="tit">'+json[0]["rid"]+' 로봇 멈춤 감지</div>';
            pophtml +='<div class="comment"><p>조치 행동</p>';
            pophtml +='<input type="text" id="comment" value="'+json[0]["comment"]+'"></div>';
            pophtml += '<div class="bn"><button type="button" value="'+json[0]["num"]+'" onclick="upalarm(this)">확인</button>';
            pophtml += '<button type="button" onclick="popclose();">취소</button></div>';
            break;
        case "down":
            pophtml +='<div class="tit">'+json[0]["room"]+'호실 '+json[0]["sickbed"]+'병상 낙상 감지</div>';
            pophtml +='<div class="comment"><p>조치 행동</p>';
            pophtml +='<input type="text" id="comment" value="'+json[0]["comment"]+'"></div>';
            pophtml += '<div class="bn"><button type="button" value="'+json[0]["num"]+'" onclick="upalarm(this)">확인</button>';
            pophtml += '<button type="button" onclick="popclose();">취소</button></div>';
            break;
        case "pose":
            pophtml +='<div class="tit">'+json[0]["room"]+'호실 '+json[0]["sickbed"]+'병상 낙상 감지</div>';
            pophtml +='<div class="comment"><p>조치 행동</p>';
            pophtml +='<input type="text" id="comment" value="'+json[0]["comment"]+'"></div>';
            pophtml += '<div class="bn"><button type="button" value="'+json[0]["num"]+'" onclick="upalarm(this)">확인</button>';
            pophtml += '<button type="button" onclick="popclose();">취소</button></div>';
            break;
    
        default:
            break;
    }

    pop.innerHTML = pophtml;
    
}

const get_alert = (msg) => {

    const json = JSON.parse(msg);

    alert_list.innerHTML = "";
    if (json == "")
        return false;

    for (let idx in json) {
        if (json[idx]["content"] == "water") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 물 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span>';
            html_view += '<button type="button" onclick="popup(this)" value="'+json[idx]["num"]+'">확인</button></span></li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "fire") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 화재 감지 </span>';
            html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: -15px; color:red;">' + json[idx]["value"] + ' mg/m<sup>3</sup></span></span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span>';
            html_view += '<button type="button" onclick="popup(this)" value="'+json[idx]["num"]+'">확인</button></span></li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "dust") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 먼지 감지 </span>';
            html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: -15px; color:red;">' + json[idx]["value"] + ' mg/m<sup>3</sup></span></span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span>';
            html_view += '<button type="button" onclick="popup(this)" value="'+json[idx]["num"]+'">확인</button></span></li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "down") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 낙상 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span>';
            html_view += '<button type="button" onclick="popup(this)" value="'+json[idx]["num"]+'">확인</button></span></li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "distance") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 멈춤 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span>';
            html_view += '<button type="button" onclick="popup(this)" value="'+json[idx]["num"]+'">확인</button></span></li>';

            alert_list.innerHTML += html_view;
        }
        if (json[idx]["content"] == "pose") {
            let html_view = "";

            html_view += '<li>';
            html_view += '<span class="txt">' + json[idx]["rid"] + '로봇 욕창 감지</span>';
            html_view += '<span class="group"><span class="time">' + json[idx]["uptime"] + '</span>';
            html_view += '<button type="button" onclick="popup(this)" value="'+json[idx]["num"]+'">확인</button></span></li>';

            alert_list.innerHTML += html_view;
        }
    }
}


const get_vision = (msg) => {
    const json = JSON.parse(msg);


    if (json == "")
        return false;
    if (json["pose"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["room"] + '호 ' + json["sickbed"] + '병상 욕창 감지</span>';
        html_view += '<span class="group"><span class="time">' + json["uptime"] + '</span>';
        html_view += '<button type="button">확인</button></span></li>';

        addNewAlert(html_view);
    }
    if (json["down"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["room"] + '호 ' + json["sickbed"] + '병상 낙상 감지</span>';
        html_view += '<span class="group"><span class="time">' + json["uptime"] + '</span>';
        html_view += '<button type="button">확인</button></span></li>';

        addNewAlert(html_view);
    }

}

const get_sensor = (msg) => {
    const json = JSON.parse(msg);

    if (json == "")
        return false;

    if (json["water discovery"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 물 감지</span>';
        html_view += '<span class="group"><span class="time">' + today + '</span>';
        html_view += '<button type="button">확인</button></span></li>';

        addNewAlert(html_view);
    }
    if (parseFloat(json["fine dust"]).toFixed(2) >= 0.3) {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 먼지 감지 </span>';
        html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: -15px; color:red;">' + json["fine dust"] + ' mg/m<sup>3</sup></span></span>';
        html_view += '<span class="group"><span class="time">' + today + '</span>';
        html_view += '<button type="button">확인</button></span></li>';

        addNewAlert(html_view);
    }
    if (parseFloat(json["fire detection"]) > 300) {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 화재 감지 </span>';
        html_view += '<span class="txt"><span style ="font-size : 15px; margin-left: -15px; color:red;">' + json["fire detection"] + ' mg/m<sup>3</sup></span></span>';
        html_view += '<span class="group"><span class="time">' + today + '</span>';
        html_view += '<button type="button">확인</button></span></li>';

        addNewAlert(html_view);
    }
    if (json["distance"] == "1") {
        let html_view = "";

        html_view += '<span class="txt">' + json["robot_id"] + '로봇 멈춤 감지</span>';
        html_view += '<span class="group"><span class="time">' + today + '</span>';
        html_view += '<button type="button">확인</button></span></li>';

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

const location_table = (data) =>{
    const json = JSON.parse(data);

    for(let idx in json){
        locationdata.push(json[idx]);
    }
}

const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
    }
}


const onConnect = () => {
    client.subscribe("/response/data/location/info");
    client.subscribe("/response/main/alarm/view");
    client.subscribe("/response/alarm/vision");
    client.subscribe("sensor");
    client.subscribe("/response/data/alarm/one");
    setTimeout(publish("/request/data/location/info","0"),2000);
    setTimeout(publish("/request/main/alarm/all", "0"), 2000);
}

const onMessageArrived = (message) => {
    let topic = message.destinationName;
    let msg = message.payloadString;

    switch (topic) {
        case "/response/data/location/info":
            location_table(msg);
            break;
        case "/response/main/alarm/view":
            get_alert(msg);
            break;
        case "/response/alarm/vision":
            get_vision(msg);
            break;
        case "sensor":
            get_sensor(msg);
            break;
        case "/response/data/alarm/one":
            pop_view(msg);
            break;
        default:
            break;
    }
}

const publish = (topic,message) => {
    let msg = new Paho.Message(message);
    msg.destinationName = topic;
    client.send(msg);
}


const connect = () => {

    client = new Paho.Client('112.221.113.29', 9001, "Medical"+String(clientnum));

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect
    });
}

const disconnecter = () => {
    if (client != "") {
        client.disconnect();
        client = "";
    }
}

start.addEventListener("click",()=>{
    if(id.value == 0){
        alert("로봇을 선택해주세요.")
        return false;
    }

    if(room.value == 0){
        alert("호실을 선택해주세요.")
        return false;
    }

    if(sickbed.value == 0){
        alert("병상을 선택해주세요.")
        return false;
    }

    let topic = "web_cmd/goto_position";

    for(let idx in locationdata){
        if(locationdata[idx]["room"] == room.value && locationdata[idx]["sickbed"] == sickbed.value){
            xaxis = locationdata[idx]["xaxis"];
            yaxis = locationdata[idx]["yaxis"];

            break;
        }
    }

    let message = '{"robot_id":"'+id.value+'","x":'+xaxis+',"y":'+yaxis+'}';

    publish(topic,message);
    xaxis = "";
    yaxis = "";

});

patrol.addEventListener("click",()=>{
    if(id.value == 0){
        alert("로봇을 선택해주세요.")
        return false;
    }

    let topic = "web_cmd/do_patrol";
    let message = '{"robot_id":"'+id.value+'"}';

    publish(topic,message);
});

turn.addEventListener("click",()=>{
    if(id.value == 0){
        alert("로봇을 선택해주세요.")
        return false;
    }

    let topic = "web_cmd/return_base";
    let message = '{"robot_id":"'+id.value+'"}';

    publish(topic,message);
});

stop.addEventListener("click",()=>{
    if(id.value == 0){
        alert("로봇을 선택해주세요.")
        return false;
    }

    let topic = "web_cmd/force_stop";
    let message = '{"robot_id":"'+id.value+'"}';

    publish(topic,message);
});

window.onload = () => {
    connect();
}

