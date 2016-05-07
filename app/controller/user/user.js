var controller =  controller || {};

controller.user = {};

controller.user.loadDataUser = function() {
	model.user.getListDependences()
		.then(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.id+" - "+item.secretaria+"</option>";
		       });
		       $("#dependence").append(items);
		      
		    }else{
	        	alert("No se pudieron cargar las dependencias");
	        }
	        $("#stopUser").hide();
	        controller.user.getDataUser();
		 }).fail(function(e){
	        $("#stopUser").hide();
		 	alert("Error: " + e.responseText);
		});
};

controller.user.getDataUser = function() {
	model.user.getDataUser(localStorage.id)
		.then(function (data) {
		    if( data.length > 0){
		        //load data in view
		        if(localStorage.idrol == 1){
		        	$("#dependence").removeAttr("disabled")
		        }

		        var $form = $("#formUser");
				$.each(data, function(i, resp){
					$form.find("#id").val(resp.id).attr("disabled","disabled");
					$form.find("#name").val(resp.nombre);
					$form.find("#mail").val(resp.mail);
					$form.find("#office").val(resp.oficina);
					$form.find("#telephone").val(resp.telefono);
					$form.find("#celphone").val(resp.movil);
					$form.find("#password").val("password");
					$form.find("#password2").val("password");
					$form.find("#dependence").val(resp.idsecretaria);
				});
		    }else{
	        	alert("No se pudieron cargar las dependencias");
	        }

	        $("#stopUser").hide();
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
	        $("#stopUser").hide();
		});
};

controller.user.getFormData = function(form){
	var $form = $( form ),
		jsonData = [],
		data = {};

	data.id = $form.find("#id").val();
	data.name = $form.find("#name").val();
	data.mail = $form.find("#mail").val();
	data.office = $form.find("#office").val();
	data.telephone = $form.find("#telephone").val();
	data.celphone = $form.find("#celphone").val();
	data.password = $form.find("#password").val();
	data.dependence = $form.find("#dependence").val();

	jsonData.push(data);

	return jsonData;
};

controller.user.save = function(jsonData){
	$("#stopUser").show();
	model.user.saveDataUser(jsonData)
	.then(function (data) {
		$("#stopUser").hide();
	    if( data.success){
	        //load data in view
	       alert(data.message);
	    }else{
        	alert("No se pudo guardar " + textStatus + " " + data.message)
        }

        $("#formUser").find("button[type='submit']").attr("disabled","disabled");
	 })
	.fail(function(jqXHR, textStatus){
		$("#stopUser").hide();
	 	alert("Error: " + jqXHR.responseText + ", " + textStatus);
	});
};

//add all events
controller.user.initEvents = function(){
	$("#password").click(function(){
		$("#password").val("");
		$("#password2").val("");
	});

	$("#formUser")
		.submit(function(e){
			e.preventDefault();
			if($("#password").val() == $("#password2").val()){
				var jsonData = controller.user.getFormData(this);
				controller.user.save(jsonData);
			}else{
				alert("La contraseña no coincide");
			}
		})
		.change(function(){enableSave()})
		.keyup(function(){enableSave()});

	var enableSave = function (){
		$("#formUser").find("button[type='submit']").removeAttr("disabled");
	};

};

//---------------------------------------Constructor
controller.user.loadDataUser();

//add Events
controller.user.initEvents();