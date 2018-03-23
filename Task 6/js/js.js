(function(){

	function toggleMemu(className){
		let menu = document.querySelector(className).parentNode;	
		menu.addEventListener('click', (e) =>{
			e.preventDefault();
			let menuItems = document.querySelectorAll(className);
			menuItems.forEach((item) => {
				item.classList.remove('active');
			});
			e.target.closest('li').classList.add('active');
		});
	}
	
	toggleMemu('.language-menu li');
	toggleMemu('.header-menu li');	
	toggleMemu('.footer-menu li');

	let navButton = document.querySelector('.nav-burger');
	
	navButton.addEventListener('click', (e) => {
		let nav = document.querySelector('.header-menu');
		nav.classList.toggle('open');
	})
	
	
	
	
	
	
	
}())