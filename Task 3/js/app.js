class Timer{
    constructor(){
        this.currentTime;
        this.ld;
    }

    current() {
        this.currentTime = new Date();
    }

    weekTime() {
        this.week = this.currentTime.getDay();
        weekSpan.innerText = weekArr[this.week];
    }

    dayTime() {
        this.day = this.currentTime.getDate();
        daySpan.innerText = this.day;
    }

    mounthTime() {
        this.mounth = this.currentTime.getMonth();
        mounthSpan.innerText = mounthArr[this.mounth];
    }

    hoursTime() {
        this.hours = this.currentTime.getHours(); 
        this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
        hoursDiv.innerText = this.hours;
    }

    minsTime() {
        this.mins = this.currentTime.getMinutes(); 
        this.mins = this.mins < 10 ? '0' + this.mins : this.mins;
        minsDiv.innerText = this.mins;
    }

    secondsTime() {
        this.seconds = this.currentTime.getSeconds(); 
        this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
        secsDiv.innerText = this.seconds;
    }

    daysLeft() {
        this.startDate = new Date();
        this.finishDate = new Date(2019, 0, 1);
        this.today = this.startDate.getTime();
        this.finish = this.finishDate.getTime();
        this.ld = parseInt((this.finish - this.today)/86400000); // 1000 * 60 * 60 * 24
        leftDaysSpan.innerText = this.ld;
    }

    words() {
        this.ld > 100 ? this.ld %= 100 : this.ld;
		this.rem = this.ld %10;
		if( this.ld > 4 && this.ld < 21){
			leftDaysWordSpan.innerText = daysArr[2];
		}
		else if(this.rem === 1){
			leftDaysWordSpan.innerText = daysArr[0];
		}
		else if(this.rem > 1 && this.rem < 5){
			leftDaysWordSpan.innerText = daysArr[1];
		}
		else{
			leftDaysWordSpan.innerText = daysArr[0];
		}
	}

    nowtime() {
        this.current();
        this.weekTime();
        this.dayTime();
        this.mounthTime();
        this.hoursTime();
        this.minsTime();
        this.secondsTime();  
        this.daysLeft();  
        this.words();   
    }
    
    init(){
        setInterval(() =>this.nowtime(), 1000);
    }
}

let timer = new Timer();
timer.init();
