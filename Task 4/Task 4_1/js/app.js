var alarmhour;
var alarmmin;

class Clock{
    constructor(){
        this.currentTime,
        this.week,
        this.day,
        this.mounth,
        this.hours,
        this.mins,
        this.seconds,
        this.ld,
        this.ldword;
        this.weekSpan = document.getElementById('weekSpan');
        this.daySpan = document.getElementById('daySpan');
        this.mounthSpan = document.getElementById('mounthSpan');
        this.hoursDiv = document.getElementById('hoursDiv');
        this.minsDiv = document.getElementById('minsDiv');
        this.secsDiv = document.getElementById('secsDiv');
        this.leftDaysSpan = document.getElementById('leftDaysSpan');
        this.leftDaysWordSpan = document.getElementById('leftDaysWordSpan');
    }

    correctTimerVars(num) {
        return num = num < 10 ? '0' + num : num;
    }

    setSeconds(){
        this.currentTime = new Date();
        this.seconds = this.correctTimerVars(this.currentTime.getSeconds());
    }

    getSeconds(){
        this.secsDiv.innerText = this.seconds;
    }

    setMinutes(){
        this.mins = this.correctTimerVars(this.currentTime.getMinutes());
    }

    getMinutes(){
        this.minsDiv.innerText = this.mins;
    }

    setHours(){
        this.hours = this.correctTimerVars(this.currentTime.getHours());
    }

    getHours(){
        this.hoursDiv.innerText = this.hours;
    }

    setDayInfo() {
        this.week = this.currentTime.getDay();
        this.day = this.currentTime.getDate();
        this.mounth = this.currentTime.getMonth();
        this.ld = parseInt((new Date(2019, 0, 1).getTime() - new Date().getTime())/86400000); // 1000 * 60 * 60 * 24
        this.ldTmp = this.ld > 100 ? this.ld % 100 : this.ld;
		this.rem = this.ld % 10;
		if( this.ldTmp > 4 && this.ldTmp < 21){
			this.ldword = daysArr[2];
		}
		else if(this.rem === 1){
			this.ldword = daysArr[0];
		}
		else if(this.rem > 1 && this.rem < 5){
			this.ldword = daysArr[1];
		}
		else{
			this.ldword = daysArr[0];
		}
    }

    getDayInfo(){
        this.weekSpan.innerText = weekArr[this.week];
        this.daySpan.innerText = this.day;
        this.mounthSpan.innerText = mounthArr[this.mounth];
        this.leftDaysSpan.innerText = this.ld;
        this.leftDaysWordSpan.innerText = this.ldword;
    }

    setClock(){
        this.setSeconds();
        this.setMinutes();
        this.setHours();
        this.setDayInfo();
    }

    getClock(){
        this.getSeconds();
        this.getMinutes();
        this.getHours();
        this.getDayInfo();
    }

    goClock(){
        this.setSeconds();
        this.getSeconds();
        if(this.seconds == 0){
            this.setMinutes();
            this.getMinutes();
        }
        if(this.seconds == 0 && this.mins == 0){
            this.setHours();
            this.getHours();
        }
        if(this.seconds == 0 && this.mins == 0  && this.hours == 0){
            this.setDayInfo();
            this.getDayInfo();
        }
        
    }
    init(){
        this.setClock();
        this.getClock();
        setInterval(() =>this.goClock(), 1000);
    }
}

let clock = new Clock();
clock.init();

class Alarm extends Clock{
	constructor(){
		super();
		this.alarms = {};
		this.addAlarm = document.getElementById('addAlarm');
		this.newAlarm = document.getElementById('newAlarm');
		this.hourAlarm = 1;
      this.minAlarm = 0;
		
	}
	getAlarm(){
		console.log(this.hours);
	}
	removeAlarm(){
	
	}
	
	// вывод формы для добавления нового будильника
	printAlarmWindow(){
		let alarmStr =`<form action="" method="get">
						<input type="time" placeholder="Время" id="timeInput" required />
						<input type="date" placeholder="Дата" id="dateInput" />
						<input type="submit" id="alarmSubmit" value="Добавить" />
						</form>`;
		this.newAlarm.innerHTML = alarmStr;
	}
	
	// добавление строки нового будильника в таблицу будильников
	printNewAlarmStr(hour, min){
		let newAlarmStr =`
						<div class="row alarmRow">
						<div class="col-md-2">Будильник</div>	
						<div class="col-md-2">${hour}</div>
						<div class="col-md-2">${min}</div>
						<div class="col-md-6">
						<button class="delRow">Удалить</button>
						</div>
						</div>
		`;
		let alarmList = document.getElementById('alarmList');
		alarmList.innerHTML += newAlarmStr;
	}
	
	// удаление будильника
	deleteAlarmEvent(){
		let delRowArr = document.querySelectorAll('.delRow');
		let len = delRowArr.length;
		for (let i = 0; i < len; i++) {
		  delRowArr[i].addEventListener('click', function(){
		  //console.log('aaa');
		  
		   //console.log(this.parentNode());
		   
		   
		   //this.parentNode().remove();
		  
		  
		  },false);
		}
			
	}
	
	
	
	// событие на кнопке добавления нового будильника
	addNewAlarmTimeEvent(hour, min, printNewAlarmStr, deleteAlarmEvent, ){
		let alarmSubmit = document.getElementById('alarmSubmit');
		alarmSubmit.addEventListener('click', function(e){
			e.preventDefault();
			let timeValue = timeInput.value.trim();
			if(timeValue != ''){
				hour = timeValue.substr(0,2);
				min = timeValue.substr(3,2);
				alarmhour = hour;
				alarmmin = min;
				printNewAlarmStr(hour, min);
				deleteAlarmEvent();
			}
		})
	}
	
	// событие на кнопке добавления нового будильника
	initAlarm(){
		
		// вывод формы
		this.printAlarmWindow();
		
		// событие на кнопке добавления нового будильника
		this.addNewAlarmTimeEvent(this.hourAlarm, this.minAlarm, this.printNewAlarmStr, this.deleteAlarmEvent);
	}
	
	// метод инициализации будильника, сравнение
	initTest(){
        setInterval(() =>this.getAlarm(), 1000);
    }
	
}


let alarmSubmit = document.getElementById('alarmSubmit'),
	addAlarm = document.getElementById('addAlarm');

let alarm = new Alarm();


// инициализация будильника
alarm.initTest();


// событие на кнопке добавления нового будильника
addAlarm.addEventListener('click', function(e){
	e.preventDefault();
	alarm.initAlarm()
})






