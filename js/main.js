const robot_tbody = document.getElementById("robot-tbody");
const robot_tr = robot_tbody.getElementsByTagName("tr");

const schedule_tbody = document.getElementById("schedule-tbody");
const schedule_table = document.getElementById("schedule-table");
const alarm_list = document.getElementById("alarm-list");

const schedule_search=document.getElementById("schedule-search");
const schedule_input=document.getElementById("schedule-input");
const schedule_bn=document.getElementById("schedule-bn");

const clientnum = Math.floor(Math.random() * 101);

let client = "";

// 로봇 데이터 표시
const robot_view = (data) => {
    const json = JSON.parse(data);

    if(json=="")
        return false;

    for(let idx in json){
        let td = robot_tr[idx].getElementsByTagName("td");

        td[0].innerText = json[idx]["rid"];
        td[1].innerText = json[idx]["room"]+"호실 "+json[idx]["sickbed"] + "병상";
        switch (json[idx]["ractive"]) {
            case "patrol":
                td[2].innerText = "패트롤";
                break;
        
            default:
                td[2].innerText = "없";
                break;
        }

        td[3].innerText = json[idx]["uptime"];
    }    
}

// 스케줄 데이터 표시
const schedule_view = (data) =>{
    const json = JSON.parse(data);

    if(json=="")
        return false;

    schedule_tbody.innerHTML="";

    for(let idx in json){
        let html_view = "";

        html_view +="<tr>";

        if(Number(json[idx]["sid"]) < 10){
            html_view += "<td>";
            html_view += "kc0";
            html_view += json[idx]["sid"];
            html_view += "</td>";
        }
        else{
            html_view += "<td>";
            html_view += "kc";
            html_view += json[idx]["sid"];
            html_view += "</td>";
        }

        html_view += "<td>";
        html_view += json[idx]["rid"];
        html_view += "</td>";

        html_view += "<td>"+json[idx]["room"]+"</td>";
        html_view += "<td>"+json[idx]["sickbed"]+"</td>";

        html_view += "<td>";

        switch (json[idx]["content"]) {
            case "patrol":
                html_view += "패트롤";
                break;
            case "return":
                html_view += "패트롤";
                break;
        
            default:
                html_view += "없";
                break;
        }

        html_view += "</td>";
        html_view += "<td>";

        switch (Number(json[idx]["state"])) {
            case 0:
                html_view += "진행중";
                break;
            case 1:
                html_view += "완료";
                break;
            default:
                break;
        }

        html_view += "</td>";
        html_view += "<td>";
        html_view += json[idx]["uptime"];
        html_view += "</td>";
        html_view += "</tr>";

        schedule_tbody.innerHTML+=html_view;
    }
}

// 알람 데이터 표시
const alarm_view = (data) =>{
    const json = JSON.parse(data);
    
    alarm_list.innerHTML = "";

    if(json=="")
        return false;

    for(let idx in json){
        let html_view = "";
        html_view += "<li><span class='txt'>";
        html_view += json[idx]["rid"];
        html_view += " 로봇";

        switch (json[idx]["content"]) {
            case "water":
                html_view += " 물 감지";
                break;
        
            default:
                break;
        }

        html_view += " 경고</span><span class='group'>";
        html_view += "<span class='time'>"+json[idx]["uptime"]+"</span>";
        html_view += "<button type='button'>확인</button></span></li>";
        alarm_list.innerHTML += html_view;
    }

}

const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
    }
}

// 구독
const onConnect = () => {
    client.subscribe("/response/main/robot/view");
    client.subscribe("/response/main/schedule/view");
    client.subscribe("/response/main/alarm/view");
    setTimeout(publish("/request/main/robot/all","0"),2000);
    setTimeout(publish("/request/main/schedule/all","0"),2000);
    setTimeout(publish("/request/main/alarm/all","0"),2000);
}

// 메세지 수신
const onMessageArrived = (message) => {
    let topic = message.destinationName;
    let msg = message.payloadString;

    switch (topic) {
        case "/response/main/robot/view":
            robot_view(msg);
            break;
        case "/response/main/schedule/view":
            schedule_view(msg);
            break;
        case "/response/main/alarm/view":
            alarm_view(msg);
            break;
    
        default:
            break;
    }
}

// 데이터 보내기

const publish = (topic,message) => {
    let msg = new Paho.Message(message);
    msg.destinationName = topic;
    client.send(msg);
}

// 연결
const connect = () => {

    client = new Paho.Client('112.221.113.29', 9001, "Medical"+String(clientnum));

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect
    });
}

// 연결 해제
const disconnecter = () => {
    if (client != "") {
        client.disconnect();
        client = "";
    }
}

schedule_bn.addEventListener("click",()=>{
    if(schedule_input.value == ""){
        alert("검색어를 입력해주세요.");
        return false;
    }

    let type = schedule_search.value;
    let val = schedule_input.value;

    switch (type) {
        case "number":
            let stg = val.substr(2,2);
            val = Number(stg);
            break;
        case "schedule":
            switch (val) {
                case "패트롤":
                    val = "patrol";
                    break;
                case "복귀":
                    val = "return";
                    break;
                default:
                    break;
            }
            break;
        case "progress":
            switch (val){
                case "진행중":
                    val = 0;
                    break;
                case "완료":
                    val = 1;
                    break;
                default:
                    break;
            }
            break;

        default:
            break;
    }

    let topic = "/request/main/schedule/search";
    let msg = '{"type":"'+type+'","value":"'+val+'"}';
    
    publish(topic,msg);

});

// 웹페이지 열리고 실행
window.onload = () => {
    connect();
}


