var controller =  controller || {};

// Constructor
controller.login = {};

controller.login.in = function() {
    $("#formLogin").submit(function(e){
    	e.preventDefault();
    	
    	var user = this.user.value,
    		pass = this.pass.value;

	    model.login.in(user, pass)
		    .then(function (data) {
		        if( data.length > 0 && data[0].bitactivo == 1){
		        	//load data in memory
		        	controller.login.setDataUser(data);
		        	//Load dashboard
		        	controller.navigation.loadView('main');
		        	$("#menuPpal").show();
		        }else{
		        	alert("Usuario o contraseña incorrecto!")
		        }
		    }).fail(function(e){
		    	alert("Error: " + e.responseText);
		    });
    });
};

controller.login.setDataUser = function(data) {
	sessionStorage.id = data[0].id;
	sessionStorage.name = data[0].nombre;
	sessionStorage.secretaria = data[0].idsecretaria;
	sessionStorage.mail = data[0].mail;
	sessionStorage.office = data[0].oficina;
	sessionStorage.phone = data[0].telefono;
	sessionStorage.celphone = data[0].movil;
};

$(document).ready(function(){
	(function initEvents (){
		controller.login.in();
	})();
});