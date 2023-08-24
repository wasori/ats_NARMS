const signin = document.getElementById("signin-bn");
const id= document.getElementById("user-id");
const pw = document.getElementById("user-pw");
const clientnum = Math.floor(Math.random() * 101);

let client = "";

const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
    }
}

const onConnect = () => {
    client.subscribe("/response/signin");
}

const onMessageArrived = (message) => {
    let topic = message.destinationName;
    let msg = message.payloadString;

    switch (Number(msg)) {
        case 0:
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            break;

        case 1:
            location.href="./main.html";
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

signin.addEventListener("click",()=>{
    if(id.value == ""){
        alert("아이디를 입력하세요.");
        id.focus();
        return false;
    }

    if(pw.value == ""){
        alert("비밀번호를 입력하세요.");
        pw.focus();
        return false;
    }
    
    let topic = "/request/signin";
    let message = '{"id":"'+id.value+'","pw":"'+pw.value+'"}';
    publish(topic,message);

});

connect();