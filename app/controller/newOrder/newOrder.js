var controller =  controller || {};

// Constructor
controller.newOrder = {};

controller.newOrder.loadDataToOrder = function() {
	controller.newOrder.loadOrderTypes();
	controller.newOrder.showCurrentDate();
};

controller.newOrder.loadOrderTypes = function (){

	model.newOrder.getTypesOrders()
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.talimento+"</option>";
		       });
		       $("#typeOrder").append(items);
		      
		    }else{
	        	alert("No se pudieron cargar los tipos de pedido");
	        }

	        $("#stopUser").hide();
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
		});
};

controller.newOrder.loadPptoUserToNewOrder = function (){
	var typeOrder = $("#typeOrder").val();
	statusBar.show("Cargando presupuesto...");
	if(typeOrder){
		model.newOrder.getPptoUserToNewOrder($("#typeOrder").val(), localStorage.id)
			.done(function (data) {
			    $("#ppto").html("");
			    if( data.length > 0){
			        //load data in view
			       var items = "";
			       $.each(data, function(i, item){
			       		items += "<option value='"+item.id+"'>"+item.id+"-"+item.nombre+"- Saldo: $"+formatMoney(item.valorini-item.valorpedido)+"</option>";
			       });
			       $("#ppto").append(items);
			       controller.newOrder.loadItemsToNewOrder();

			     }else{
		        	alert("No hay presupuesto para este tipo de pedido");
		        	$("#addItems").attr("disabled","disabled");
		        }
		        statusBar.hide();
			 }).fail(function(e){
			 	$("#ppto").append(items);
			 	alert("Error: " + e.responseText);
			 	$("#addItems").attr("disabled","disabled");
			 	statusBar.hide();
			});
	}
};

controller.newOrder.showCurrentDate = function (){
	$("#currentDate").val(currentDate());
	$("#deliveryDate").val(currentDate());
	$("#deliveryTime").val(currentTime());
}

controller.newOrder.loadItemsToNewOrder = function (){
	var typeOrder = $("#typeOrder").val();
	statusBar.show("Cargando Productos...");
	if(typeOrder){
		model.newOrder.getItemsToNewOrder(typeOrder)
			.done(function (data) {
			    if( data.length > 0){
			        //load data in view
			       $("#itemList").html("")

			       $.each(data, function(i, item){
			       	$("#itemListTemplate")
						.clone().show()
						.attr("data-id", item.id)
						.attr("data-value", item.valor)
						.removeAttr("id")
						.find(".img").attr("src", "img/items/" + item.id).end()
						.find(".nameItem").text(item.id + "-" + item.nombre).end()
						.find(".description").text(item.descripcion).end()
						.find(".vlrSinIva").text("$"+formatMoney(item.valor)).end()
						.find(".valor").text("$"+formatMoney(Math.floor(parseInt(item.valor)*((parseInt(item.iva)/100)+1)))).end()
						.find(".selectItem").attr("id", item.id).end()
						.find(".collapse").attr("id", "dtlle"+i).end()
						.find(".dtlle").attr("data-target", "#dtlle"+i).end()
						.appendTo("#itemList");
				    });
			       zoomImg();
			       
			       $(".selectItem").click(function(){
						//change items list
						$(".deletedItem:visible").click();//delete other product selected
						controller.newOrder.selectedItem(this);
					});

			     }else{
		        	alert("No se pudieron cargar los items")
		        }
		        statusBar.hide();
			 }).fail(function(e){
			 	alert("Error: " + e.responseText);
			 	statusBar.hide();
			});
	}
	
}

controller.newOrder.selectedItem = function(element){

	var $parent = $(element).parent().parent().parent();

	//close modal
	$('#products').modal('hide');

	//clone template
	$("#templateItemAdded")
		.clone().show()
		.find(".nameItem").text($parent.find(".nameItem").text()).end()
		.find(".description").text($parent.find(".description").text()).end()
		.find("img").attr("src",$parent.parent().find("img").attr("src")).end()
		.find(".individualValue").attr("data-value",$parent.parent().attr("data-value"))
		.text("$"+formatMoney($parent.parent().attr("data-value"))).end()
		.attr("id",$parent.parent().attr("data-id"))
		.appendTo("#items");

		$(".quantity:visible").focus();

		
	//add events
	$(".quantity").off().change(function(e){
		//debugger
		var element = e.target;
		var quantity = parseInt(element.value) || 0;
		var aditionalValue  = parseInt($(element).parent().parent().find(".aditionalValue").val()) || 0;
		var individualValue = parseInt($(element).parent().parent().parent().parent().find(".individualValue").attr("data-value"));
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney((quantity*individualValue)+aditionalValue));

	});

	$(".aditionalValue").off().change(function(e){
		var element = e.target;
		var aditionalValue = parseInt(element.value) || 0;
		var quantity  = parseInt($(element).parent().parent().find(".quantity").val()) || 0;
		var individualValue = parseInt($(element).parent().parent().parent().parent().find(".individualValue").attr("data-value"));
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney((quantity*individualValue)+aditionalValue));

	});

	$(".deletedItem").off().click(function(e){
		var $element = $(e.target);
		$element.parent().parent().parent().remove();
	});
};

controller.newOrder.save = function(jsonData, swSaveDirect){
	
	var _this = this;

	if(!swSaveDirect){

		var msg = "El pedido se entragara el día: " +
				  formatDate(jsonData[0]["deliveryDate"]) +" a las "+jsonData[0]["deliveryTime"] +"\n<b> ¿Desea Continuar?</b>";

		$("#textConfirm").text(msg)
	    $("#okConfirm").off().click(function(){
	        _this.save(jsonData, true);
	    });
	    $('#modalConfirm').modal('show');
	    return;
	}

	$("#stopUser").show();
	model.newOrder.saveNewOrder(jsonData)
		.done(function (data, textStatus, jqXHR) {
			$("#stopUser").hide();
		    if( data.success ){
		        //load data in view
		       alert(data.message);
		       controller.newOrder.resetForm();
		    }else{
	        	alert("No se pudo guardar " + textStatus + " " + data.message)
	        }
		 })
		.fail(function(jqXHR, textStatus){
			$("#stopUser").hide();
		 	alert("Error: " + jqXHR.responseText + ", " + textStatus);
		});
};

controller.newOrder.resetForm = function(){
	$('#formNewOrder')[0].reset();
	$(".deletedItem:visible").click();
	controller.newOrder.showCurrentDate();
	$("#addItems").attr("disabled","disabled");
};

controller.newOrder.getFormData = function(form){
	var $form = $( form ),
		jsonData = [],
		data = {};
		
	data.typeOrder= $form.find("#typeOrder").val();
	data.deliveryDate= $form.find("#deliveryDate").val();
	data.deliveryTime= $form.find("#deliveryTime").val();
	data.nameEvent= $form.find("#nameEvent").val();
	data.address= $form.find("#address").val();
	data.comment= $form.find("#comment").val();
	data.nameReceive= $form.find("#nameReceive").val();
	data.telephone= $form.find("#telephone").val();
	data.celphone= $form.find("#celphone").val();
	data.idItem= $form.find("#items").find(".item").attr("id");
	data.quantity= $form.find("#items").find(".item").find(".quantity").val();
	data.aditionalValue= $form.find("#items").find(".item").find(".aditionalValue").val() || 0;
	data.ppto= $form.find("#ppto").val();

	data.idUser = localStorage.id;

	jsonData.push(data);

	return jsonData;

};

//add all events
controller.newOrder.initEvents = function(){
	$("#typeOrder").change(function(){
		statusBar.show("Cargando...");
		//change items list
		controller.newOrder.loadItemsToNewOrder();
		controller.newOrder.loadPptoUserToNewOrder();
		//Clear items selected
		$("#items").html("");
		$("#addItems").removeAttr("disabled");
	});

	$("#formNewOrder").submit(function(e){
		e.preventDefault();
		
		var jsonData = controller.newOrder.getFormData(this);
		if( controller.newOrder.validateForm(jsonData))
			controller.newOrder.save(jsonData);
	});

};

//---------------------------------------Constructor
controller.newOrder.loadDataToOrder();

//add Events
controller.newOrder.initEvents();

//validar envio
controller.newOrder.validateForm = function(jsonData) {
	var fecha = jsonData[0]["deliveryDate"],
		cantidad = jsonData[0]["quantity"],
		idItem = jsonData[0]["idItem"],
		direccion = jsonData[0]["address"],
		comentario = jsonData[0]["comment"],
		hora = jsonData[0]["deliveryTime"],
		telfjorecibe = jsonData[0]["telephone"],
		evento = jsonData[0]["nameEvent"],
		movilrecibe = jsonData[0]["celphone"],
		personarecibe = jsonData[0]["nameReceive"],
		msg = "",
		isValid = true;

debugger
	if((validateText(telfjorecibe))==false){
		msg = "Telefono invalido";
		isValid = false;
	}

	if((validateText(personarecibe))==false){
		msg = "Persona que recibe invalido";
		isValid = false;
	}

	if((validateText(movilrecibe))==false){
		msg = "Celular persona que recibe invalido";
		isValid = false;
	}

	if((validateText(evento))==false){
		msg = "Nombre evento invalido";
		isValid = false;
	}

	if((validateText(cantidad))==false){
		msg = "Cantidad invalido";
		isValid = false;
	}

	if( comentario.length>250 ) {
		msg = ('Comentario demasiado extenso');
		isValid = false;
	}

	if( direccion.length>150 ) {
		msg = ('Direccion muy larga');
		isValid = false;
	}

	if( direccion == null || direccion.length < 5 || /^\s+$/.test(direccion ) ) {
		msg = ('Direccion Obligatorio');
		isValid = false;
	}


	if(hora=='00') {
		msg = ('Hora No valida');
		isValid = false;
	}

	/*Validate if exist products added*/

	if( !validateNum(cantidad) || cantidad < 1 ) {
		msg = ('Cantidad invalida');
		isValid = false;
	}

	if( cantidad && cantidad.length > 4 ) {
		msg = ('Cantidad no disponible');
		isValid = false;
	}
	if( !idItem ) {
		msg = ('Debe seleccionar el producto');
		isValid = false;
	}


	/*Validar Fecha de Entrega*/
	var deliveryDate = moment(fecha);
	var diference = moment().format("Y-MM-D");
	deliveryDate.from(diference);	

	if(msg != "")
		alert(msg);

	return isValid;

}

