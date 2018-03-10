class Clock extends Time{
    constructor(){
        super();
        this.day,
        this.mounth,
        this.week,
        this.ld,
        this.ldword;
        this.app = document.getElementById('app');
    }

    getSeconds(){
        this.secsDiv.innerText = this.seconds;
    }

    getMinutes(){
        this.minsDiv.innerText = this.mins;
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
        this.setTime();
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

    printClock(){
        let clockStr = `
        <div class="row">
				<div class="col-md-12 today-date">Сегодня&nbsp;
					<span id="weekSpan"></span>,&nbsp; 
					<span id="daySpan"></span>&nbsp; 
					<span id="mounthSpan"></span>.
				</div>	
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="clock">
						<div>Текущее время:&nbsp;</div>
						<div class="hours">
							<div id="hoursDiv" class="number">00</div>
						</div>
						<div class="tick">:</div>
						<div class="minutes">
							<div id="minsDiv" class="number">00</div>
						</div>
						<div class="tick">:</div>
						<div class="seconds">
							<div id="secsDiv" class="number">00</div>
						</div>
					  </div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 today-date">До 2019 года осталось&nbsp;
					<span id="leftDaysSpan"></span>&nbsp;
					<span id="leftDaysWordSpan"></span>.
				</div>	
			</div>
        `;
        this.app.innerHTML = clockStr;
        this.weekSpan = document.getElementById('weekSpan');
        this.daySpan = document.getElementById('daySpan');
        this.mounthSpan = document.getElementById('mounthSpan');
        this.hoursDiv = document.getElementById('hoursDiv');
        this.minsDiv = document.getElementById('minsDiv');
        this.secsDiv = document.getElementById('secsDiv');
        this.leftDaysSpan = document.getElementById('leftDaysSpan');
        this.leftDaysWordSpan = document.getElementById('leftDaysWordSpan');
    }
    
    init(){
        this.printClock();
        this.setClock();
        this.getClock();
        setInterval(() =>this.goClock(), 1000);
    }
}
