class Time {
    constructor(){
        this.currentTime,
        this.hours,
        this.mins,
        this.seconds
    }

    correctTimerVars(num) {
        return num = num < 10 ? '0' + num : num;
    }

    setSeconds(){
        this.currentTime = new Date();
        this.seconds = this.correctTimerVars(this.currentTime.getSeconds());
    }

    setMinutes(){
        this.mins = this.correctTimerVars(this.currentTime.getMinutes());
    }

    setHours(){
        this.hours = this.correctTimerVars(this.currentTime.getHours());
    }

    setTime(){
        this.setSeconds();
        this.setMinutes();
        this.setHours();
    }
    init(){
        setInterval(() =>this.setTime(), 1000);
    }
}
