$(document).ready(function () {
    calendarInit();
});
/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
*/

function calendarInit() {

    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체

    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth() + 1; // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // input 초기값
    var todayDate = currentYear + '-' + (currentMonth < 10 ? '0' : '') + currentMonth + '-' + (currentDate < 10 ? '0' : '') + currentDate;
    var myInput = document.getElementById("search-input");
    console.log(todayDate);
    myInput.value = todayDate;

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // console.log(prevDate, prevDay, nextDate, nextDay);

        // 현재 월 표기
        $('.year-month').text(currentYear + '.' + (currentMonth + 1));

        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';

        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            // currentMonthDate[todayDate - 1].classList.add('today'); // 오늘 날짜 색깔 고정
            currentMonthDate[todayDate - 1].classList.add('selected');
        }

        // 선택한 날짜 불러오기
        var currentMonthDates = document.querySelectorAll('.dates .day');
        currentMonthDates.forEach(function (dateElement) {
            dateElement.addEventListener('click', dateClickHandler);
        });
    }

    function dateClickHandler() {
        if (!this.classList.contains('disable')) {
            // 기존 클릭된 날짜의 클래스를 제거
            var selectedDate = document.querySelector('.day.selected');
            if (selectedDate) {
                selectedDate.classList.remove('selected');
            }

            // 클릭한 날짜에 선택된 클래스 추가
            this.classList.add('selected');

            var clickedDay = parseInt(this.textContent);
            var clickedMonth = currentMonth + 1;
            var clickedYear = currentYear;
            var formattedDate = clickedYear + '-' + (clickedMonth < 10 ? '0' : '') + clickedMonth + '-' + (clickedDay < 10 ? '0' : '') + clickedDay;

            // input에 날짜 추가
            var inputElement = document.querySelector('.search-cal input');
            inputElement.value = formattedDate;
            selectedDate = formattedDate;
        } else if (this.classList.contains('prev')) {
            goPrevMonth();

            // 기존 클릭된 날짜의 클래스를 제거
            var selectedDate = document.querySelector('.day.selected');
            if (selectedDate) {
                selectedDate.classList.remove('selected');
            }

            // 클릭한 날짜에 선택된 클래스 추가
            this.classList.add('selected');

            var clickedDay = parseInt(this.textContent);
            var clickedMonth = currentMonth + 1;
            var clickedYear = currentYear;
            var formattedDate = clickedYear + '-' + (clickedMonth < 10 ? '0' : '') + clickedMonth + '-' + (clickedDay < 10 ? '0' : '') + clickedDay;
            selec = clickedDay;

            // input에 날짜 추가
            var inputElement = document.querySelector('.search-cal input');
            inputElement.value = formattedDate;
            selectedDate = formattedDate;
        } else if (this.classList.contains('next')) {
            goNextMonth();

            // 기존 클릭된 날짜의 클래스를 제거
            var selectedDate = document.querySelector('.day.selected');
            if (selectedDate) {
                selectedDate.classList.remove('selected');
            }

            // 클릭한 날짜에 선택된 클래스 추가
            this.classList.add('selected');

            var clickedDay = parseInt(this.textContent);
            var clickedMonth = currentMonth + 1;
            var clickedYear = currentYear;
            var formattedDate = clickedYear + '-' + (clickedMonth < 10 ? '0' : '') + clickedMonth + '-' + (clickedDay < 10 ? '0' : '') + clickedDay;

            // input에 날짜 추가
            var inputElement = document.querySelector('.search-cal input');
            inputElement.value = formattedDate;
            selectedDate = formattedDate;
        }
    }

    // 이전달로 이동
    $('.go-prev').on('click', function () {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    function goPrevMonth() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    }

    // 다음달로 이동
    $('.go-next').on('click', function () {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth);
    });

    function goNextMonth() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth);
    }
}


// 버튼별 클릭이벤트

var toggleButtons = document.querySelectorAll(".toggle-button");
var activeButton;

var tableContainers = document.querySelectorAll(".result-lookup-table");
var table2Containers = document.querySelectorAll(".result-lookup-right-1");
var table3Containers = document.querySelectorAll(".result-lookup-right-2");

toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // 버튼 색상 변경
        toggleButtons.forEach(function (btn) {
            btn.classList.remove("active"); // 모든 버튼의 활성화 클래스 제거
        });
        button.classList.add("active");
        activeButton = document.querySelector(".toggle-button.active");
        // console.log(activeButton);
    });
});

function getDate() {
    // var date = document.getElementById('search-input').value;

    var targetId = activeButton.getAttribute("data-target");
    tableContainers.forEach(function (container) {
        if (container.id === targetId) {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    });
    table2Containers.forEach(function (container) {
        if (container.id === targetId) {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    });
    table3Containers.forEach(function (container) {
        if (container.id === targetId) {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    });
}

// ----------- mqtt관련 -------------- //

const location_tbody = document.getElementById("location-tbody");
const location_tr = location_tbody.getElementsByTagName("tr");

const vis_tbody = document.getElementById("vis-tbody");
const vis_tr = vis_tbody.getElementsByTagName("tr");

const iot_tbody = document.getElementById("iot-tbody");
const iot_tr = vis_tbody.getElementsByTagName("tr");

const data_bn = document.getElementById("data-button");

const clientnum = Math.floor(Math.random() * 101);

// location 데이터 표시
const location_view = (data) => {
    const json = JSON.parse(data);

    location_tbody.innerHTML = "";
    if (json == "")
        return false;

    for (let idx in json) {
        let html_view = "";

        html_view += '<tr height="50">';
        html_view += "<td>" + json[idx]["rid"] + "</td>";
        html_view += "<td>" + json[idx]["room"] + "호실 " + json[idx]["sickbed"] + "병상" + "</td>";
        html_view += "<td>" + json[idx]["uptime"] + "</td>";
        html_view += "</tr>";

        location_tbody.innerHTML += html_view;
    }
}

// vision 데이터 표시
const vision_view = (data) => {
    const json = JSON.parse(data);

    if (json == "") {
        vis_tbody.innerHTML = "";
        return false;
    }

    vis_tbody.innerHTML = "";
    for (let idx in json) {
        let html_view = "";

        if (json[idx]["pose"] != null && json[idx]["down"] == '1') {
            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["room"] + "</td>";
            html_view += "<td>" + json[idx]["sickbed"] + "</td>";
            html_view += "<td>욕창발생</td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";

            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["room"] + "</td>";
            html_view += "<td>" + json[idx]["sickbed"] + "</td>";
            html_view += "<td>낙상발생</td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";
        } else if (json[idx]["down"] == '1' && json[idx]["pose"] == null) {
            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["room"] + "</td>";
            html_view += "<td>" + json[idx]["sickbed"] + "</td>";
            html_view += "<td>낙상발생</td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";
        } else if (json[idx]["pose"] != null && json[idx]["down"] == '0') {
            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["room"] + "</td>";
            html_view += "<td>" + json[idx]["sickbed"] + "</td>";
            html_view += "<td>욕창발생</td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";
        }

        vis_tbody.innerHTML += html_view;
    }
}

const iot_view = (data) => {
    console.log(data);

    const json = JSON.parse(data);

    if (json == "") {
        iot_tbody.innerHTML = "";
        return false;
    }

    iot_tbody.innerHTML = "";
    for (let idx in json) {
        let html_view = "";

        // 먼지 감지
        if (parseFloat(json[idx]["dust"]).toFixed(2) >= 0.3) {
            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["rid"] + "</td>";
            html_view += "<td>" + json[idx]["room"] + "호실 " + json[idx]["sickbed"] + "병상" + "</td>";
            html_view += "<td>먼지 감지</td>";
            html_view += "<td>" + parseFloat(parseFloat(json[idx]["dust"]).toFixed(2)) + " mg/m<sup>3</sup></td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";
        }
        // 물 감지
        if (json[idx]["water"] == '1') {
            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["rid"] + "</td>";
            html_view += "<td>" + json[idx]["room"] + "호실 " + json[idx]["sickbed"] + "병상" + "</td>";
            html_view += "<td>물 감지</td>";
            html_view += "<td>-</td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";
        }
        // 화재 감지
        if (parseFloat(json[idx]["file"]) >= 300) {
            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["rid"] + "</td>";
            html_view += "<td>" + json[idx]["room"] + "호실 " + json[idx]["sickbed"] + "병상" + "</td>";
            html_view += "<td>화재 감지</td>";
            html_view += "<td>" + parseFloat(json[idx]["file"]) + " mg/m<sup>3</sup></td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";
        }
        // 물 감지
        if (json[idx]["distance"] == '1') {
            html_view += '<tr height="50">';
            html_view += "<td>" + json[idx]["rid"] + "</td>";
            html_view += "<td>" + json[idx]["room"] + "호실 " + json[idx]["sickbed"] + "병상" + "</td>";
            html_view += "<td>로봇 멈춤 감지</td>";
            html_view += "<td>-</td>";
            html_view += "<td>" + json[idx]["uptime"] + "</td>";
            html_view += "</tr>";
        }

        iot_tbody.innerHTML += html_view;
    }
}

// 구독
let client = "";

const onConnect = () => {
    client.subscribe("/response/data/location");
    client.subscribe("/response/data/vision");
    client.subscribe("/response/data/iot");
}

// 메세지 수신
const onMessageArrived = (message) => {
    let topic = message.destinationName;
    let msg = message.payloadString;

    switch (topic) {
        case "/response/data/location":
            location_view(msg);
            break;
        case "/response/data/vision":
            vision_view(msg);
            break;
        case "/response/data/iot":
            iot_view(msg);
            break;
        default:
            break;
    }
}

// 데이터 보내기

const publish = (topic, message) => {
    // console.log(topic);
    // console.log(message);
    let msg = new Paho.Message(message);
    msg.destinationName = topic;
    client.send(msg);
}

const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
    }
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

// 검색버튼

data_bn.addEventListener("click", () => {
    let activeBn = document.querySelector(".active");
    let activeId = activeBn.id;
    let activedate = document.getElementById("search-input");

    let topic = "/request/data";
    let msg = '{"type":"' + activeId + '","date":"' + activedate.value + '"}';

    console.log(msg);
    publish(topic, msg);
})

// 웹페이지 열리고 실행
window.onload = () => {
    connect();
}