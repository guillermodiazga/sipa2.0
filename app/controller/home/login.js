var controller =  controller || {};

// Constructor
controller.login = {};

controller.login.loginEvent = function() {
    $("#formLogin").submit(function(e){
    	e.preventDefault();
    	general.stopUser.show();
    	var user = this.user.value,
    		pass = this.pass.value;

	    model.login.in(user, pass)
		    .then(function (data) {
		        if( data.length > 0 && data[0].bitactivo == 1){
		        	$("#formLogin").fadeOut();
		        	$("#container").fadeIn();
		        	general.stopUser.hide();
		        	//save data in memory
		        	controller.login.setDataUser(data, localStorage);
		        	//Load dashboard
		        	controller.navigation.loadView('main');
		        	$("li[class=active]").removeClass("active");
				    $("a[href='#"+localStorage.page+"'").parent().addClass("active");
    				localStorage.page='main';
		        	controller.navigation.showMainMenu();
		        	$(".userName").text(data[0].nombre);

		        	if(localStorage.remenberMe == "true"){
						//save session from localStorage
						controller.login.setDataUser(data, localStorage);
					}else{
						controller.session.checkSession();
					}
		        }else{
		        	general.stopUser.hide();
		        	alert("Usuario o contraseña incorrecto!")
		        }
		    }).fail(function(e){
		    	general.stopUser.hide();
		    	alert("Error: " + e.responseText).warning();
		    });
    });
};

controller.login.setDataUser = function(data, storage) {
	storage.id = data[0].id;
	storage.name = data[0].nombre;
	storage.idsecretaria = data[0].idsecretaria;
	storage.mail = data[0].mail;
	storage.office = data[0].oficina;
	storage.phone = data[0].telefono;
	storage.celphone = data[0].movil;
	storage.idrol = data[0].idrol;
};

controller.login.initEvents = function (){
	
	if(localStorage.remenberMe == "true" && localStorage.id){
		//load session from localStorage to localStorage
		localStorage.id = localStorage.id;
		localStorage.idsecretaria = localStorage.idsecretaria;
		localStorage.mail = localStorage.mail;
		localStorage.name = localStorage.name;
		localStorage.office = localStorage.office;
		localStorage.phone = localStorage.phone;
		localStorage.celphone = localStorage.celphone;
		localStorage.idrol = localStorage.idrol;

		controller.navigation.loadView('main');
		controller.navigation.showMainMenu();
	}else{
		controller.login.loginEvent();

		$("#rememberMe").click(function(){
			if($("#rememberMe:checked").size()){
				localStorage.remenberMe = "true";
			}else{
				localStorage.remenberMe = "false";
			}
		});		
	}

	general.stopUser.hide();

};

//---------------------------------------Constructor
//add Events
controller.login.initEvents();