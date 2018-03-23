class Table{

    constructor(){
		this.users = [];
		this.editUserFlag = false;
		this.checkAllFlag = false;
		this.checkFlag = false;
		this.tableTitle = document.getElementById('table-title');
		this.userList = document.getElementById('user-list');
		this.inputId = document.getElementById('inputId');
		this.inputName = document.getElementById('inputName');
		this.inputLogin = document.getElementById('inputLogin');
		this.inputEmail = document.getElementById('inputEmail');
		this.inputGender = document.getElementById('inputGender');
		this.inputCountry = document.getElementById('inputCountry');
		this.inputAvatar = document.getElementById('inputAvatar');
		this.detailsView = document.getElementById('details-view');
		this.mainView = document.getElementById('main-view');
		this.backButton = document.getElementById('back-btn');
		this.deleteButton = document.getElementById('deleteButton');
        this.checkall = document.getElementById('select-all');
        this.inputSubmit = document.getElementById('submit-input');
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

    // переключение видимости таблицы / формы
    toggleTable(){
        this.tableTitle.classList.toggle('hide');
        this.mainView.classList.toggle('hide');
        this.detailsView.classList.toggle('hide');
    }

    // отрисовка таблицы пользователей
    renderTable(){
        let tableStr = '';
        this.users.forEach((item, i) =>{
            tableStr += `<tr data-id="${item.id}">
                        <td><input class="checkboxes" type="checkbox" name="check" value="${item.id}"></td>
                        <td>${i + 1}</td>
                        <td><img src="${item.avatar}"></td>
                        <td>${item.name}</td>
                        <td>${item.login}</td>
                        <td>${item.email}</td>
                        <td>${item.gender}</td>
                        <td>${item.country}</td>
                        <td>
                            <span class="editRow icon-pencil"></span>
                        </td>
                        <td>
                            <span class="delRow icon-cross"></span>
                        </td>
                        </tr>
                `;
        })
        this.userList.innerHTML = tableStr;
    }   

    // обработчик событий экрана таблицы пользователей
    usersHendler(){
        this.mainView.addEventListener('click', (e) => {
            if (e.target.classList.contains('editRow')){
                let id = e.target.closest('tr').dataset.id;
                this.editUser(id);
            }
            if (e.target.classList.contains('delRow')){
                let id = e.target.closest('tr').dataset.id;
                this.removeUser(id);
            }
            if (e.target.classList.contains('checkboxes')){
                this.testCheckboxes();
                this.toggleDeleteButton();
            }
             if (e.target.classList.contains('select-all')){
             	 this.checkAllBoxes();
                this.testCheckboxes();
                this.toggleDeleteButton();
            }
            if (e.target.id == 'addButton'){
             	 this.toggleTable();
            }
            if (e.target.id == 'deleteButton'){
                if(this.checkAllFlag == true){
                    this.removeAllUsers();
                    this.checkall.checked = false;
                    this.checkAllFlag = false;
                }
                if(this.checkFlag == true){
                    this.removeUsersArray();
                    this.checkFlag = false;
                    this.toggleDeleteButton();
                }
            }
        });
    }

    // обработчик событий экрана формы ввода данных пользователя
    userFormHendler(){
        this.inputSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveUser();
            this.toggleTable();
        })
        this.backButton.addEventListener('click', (e) => {
            this.toggleTable();
            document.getElementById('userForm').reset();
            this.editUserFlag = false;
        })
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

    // заполнение формы для редактирование данных пользователя
    editUser(id){
        this.toggleTable();
        this.users.forEach((item, i) => {
            if(item.id == id){
                this.inputId.value = item.id;
                this.inputName.value = item.name;
                this.inputLogin.value = item.login;
                this.inputEmail.value = item.email;
                this.inputGender.value = item.gender;
                this.inputCountry.value = item.country;
                this.inputAvatar.value = item.avatar;
                return;
            }
        });
        this.editUserFlag = true;
    }

    // сохранение данных пользователя
    saveUser(){
        if(this.editUserFlag == true){
             this.users.forEach((item, i) => {
                if(item.id == this.inputId.value){
                    item.name = this.inputName.value.trim();
                    item.login = this.inputLogin.value.trim();
                    item.email = this.inputEmail.value.trim();
                    item.gender = this.inputGender.value;
                    item.country = this.inputCountry.value.trim();
                    item.avatar = this.inputAvatar.value.trim();
                    return;
                }
            });
            this.renderTable();
            this.setData();
            this.editUserFlag = false;    
        }
        else{
            this.users.push({
                'id' : Date.now(),
                'name' : this.inputName.value.trim(),
                'login' : this.inputLogin.value.trim(),
                'email' : this.inputEmail.value.trim(),
                'gender' : this.inputGender.value,
                'country' : this.inputCountry.value.trim(),
                'avatar' : this.inputAvatar.value.trim()
            });
            this.renderTable();
            this.setData();
        }
        document.getElementById('userForm').reset();
    }

    // выделение всех чекбоксов
    checkAllBoxes(){
        let checkBoxes = document.querySelectorAll('.checkboxes');
        if (this.checkall.checked) {
            checkBoxes.forEach((item, i, checkBoxes) => {
                item.checked = true;
            });
            this.checkAllFlag = true;
        }
        else {
            checkBoxes.forEach((item, i, checkBoxes) => {
                item.checked = false;
            });
            this.checkAllFlag = false;
        }
    }

    // проверка массива чекбоксов на наличие выбраных чекбоксов для дальнейшего переключения состояния кнопки "Удалить"
    testCheckboxes(){
        let checkBoxes = document.querySelectorAll('.checkboxes');
        this.checkFlag = false;
        checkBoxes.forEach((item, i, checkBoxes) => {
            if (item.checked == true){
                this.checkFlag = true;
            }
        });
    }

    // переключение состояния кнопки "Удалить"
    toggleDeleteButton(){
        this.checkFlag == true || this.checkAllFlag == true ? this.deleteButton.disabled = false : this.deleteButton.disabled = true;
    }
}

