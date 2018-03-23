class TableModel {
    constructor(){
		this.users = [];
	}




    init(){
        this.users = JSON.parse(localStorage.getItem('data'));
        if(this.users == null){
            this.downloadData();
        }
        else{
            this.renderTable();
            this.usersHendler();
            this.userFormHendler();
        }
    }

    // сохранение данных в localStorage
    setData(){
        localStorage.setItem('data', JSON.stringify(this.users));
    }

    // загрузка данных с сервера, вывод данных, инициализация обработчиков
    downloadData(){
        fetch('https://gist.githubusercontent.com/duchevich/cd0f4e99029751663cc8d34cdd74ace9/raw/2f2a0452c9994f3a64c81e0202cd1b22d9a7a094/data.json')
            .then(response => response.json())
            .then(json => {
                this.users = json;
                this.renderTable();
                this.usersHendler();
                this.userFormHendler();
                localStorage.setItem('data', JSON.stringify(json))}
            );
    }

// удаление данных пользователя
removeUser(id){
    this.users.forEach((item, i) => {
        if(item.id == id){
            this.users.splice(i, 1);
            return;
        }
    });
    this.renderTable();
    this.setData();
}

 // удаление данных о всех пользователях
removeAllUsers(){
    this.users = [];
    this.renderTable();
    this.setData();
}

 // удаление данных нескольких пользователей
removeUsersArray(){
    let checkBoxes = document.querySelectorAll('.checkboxes');
    checkBoxes.forEach((item, i, checkBoxes) => {
        if (item.checked == true){
            this.removeUser(item.value)
        }
    });	
    this.renderTable();
    this.setData();
}


}