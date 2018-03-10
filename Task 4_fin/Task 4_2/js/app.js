class App {
    changeBG(){
        let random = Math.round(Math.random() * (10 - 1) + 1);
        let bg = "bg" + random
        document.body.className = '';
        document.body.classList.add(bg);
    }

    init(){
        this.changeBG();
        setInterval(() =>this.changeBG(), 30000);
    }
}

let app = new App();
app.init();

let clock = new Clock();
clock.init();

let timer = new Timer();

let	alarmsButton = document.getElementById('alarmsButton');
let	addAlarmButton = document.getElementById('addAlarmButton');
let	clockButton = document.getElementById('clockButton');
let	timerButton = document.getElementById('timerButton');
let	addTimerButton = document.getElementById('addTimerButton');
let alarm = new Alarm();
alarm.init();

alarmsButton.addEventListener('click', function(e){
    e.preventDefault();
    alarm.printAlarmTable();
	alarm.printNewAlarmStr();
    alarm.editAlarmEvent(alarm.editAlarm.bind(alarm));
    alarm.deleteAlarmEvent(alarm.removeAlarm.bind(alarm));
})

addAlarmButton.addEventListener('click', function(e){
	e.preventDefault();
	alarm.initAlarm();
})

clockButton.addEventListener('click', function(e){
	e.preventDefault();
	clock.init();
})

addTimerButton.addEventListener('click', function(e){
    e.preventDefault();
    timer.stop();
    timer.init();
})

timerButton.addEventListener('click', function(e){
	e.preventDefault();
    timer.printTimerWindow();
    //timer.stop();
})