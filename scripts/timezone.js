// Timezone Function
setInterval(Timezone, 1000);

function Timezone() {
    const time = new Date().toLocaleTimeString();
    var offset = new Date().getTimezoneOffset() / -60;

    if (offset >= 1) {
        document.getElementById("timeclock").innerText = "GMT+" + offset + "\n" + time;
    }
    else {
        document.getElementById("timeclock").innerText = "GMT" + offset + "\n" + time;
    }
}
