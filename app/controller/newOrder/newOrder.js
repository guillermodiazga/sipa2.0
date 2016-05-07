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
		        	$(".deletedItem:visible").click();
					$("#ppto").html("").val("");
					controller.newOrder.showCurrentDate();
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
			       $("#itemList").html("");
			       $("#txtToSearch").on("keyup change", function(){controller.newOrder.searchItem()}).focusin();
			       $.each(data, function(i, item){
			       	var vlrConIva = Math.floor(parseInt(item.valor)*((parseInt(item.iva)/100)+1));
			       	$("#itemListTemplate")
						.clone().show()
						.attr("data-id", item.id)
						.attr("data-value", vlrConIva)
						.removeAttr("id")
						.find(".img").attr("src", "img/items/" + item.id).end()
						.find(".nameItem").text(item.id + "-" + item.nombre).end()
						.find(".description").text(item.descripcion).end()
						.find(".vlrSinIva").text("$"+formatMoney(item.valor)).end()
						.find(".valor").text("$"+formatMoney(vlrConIva)).end()
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
	$("#items").html("");
    
    //clone and fill template 
	$("#templateItemAdded")
		.clone()
		.find(".nameItem").text($parent.parent().find(".nameItem").text()).end()
		.find(".description").text($parent.parent().find(".description").text()).end()
		.find("img").attr("src",$parent.parent().find("img").attr("src")).end()
		.find(".individualValue").attr("data-value",$parent.parent().attr("data-value"))
		.text("$"+formatMoney($parent.parent().attr("data-value"))).end()
		.attr("id",$parent.parent().attr("data-id"))
		.appendTo("#items");
	
	$("#items").find(".itemTemplate").addClass("item").removeClass("itemTemplate").end()
	$("#items .row").show()

	$(".quantity:visible").focus();

	//close modal
	$('#products').modal('hide');
		
	//add events
	$(".quantity").off().on("keyup change", function(e){
		var element = e.target;
		var quantity = parseInt(element.value) || 0;
		var aditionalValue  = parseInt($(element).parent().parent().find(".aditionalValue").val()) || 0;
		var individualValue = parseInt($(element).parent().parent().parent().parent().find(".individualValue").attr("data-value"));
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney((quantity*individualValue)+aditionalValue));

	});

	$(".aditionalValue").off().on("keyup change", function(e){
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

	zoomImg();
};

controller.newOrder.save = function(jsonData, swSaveDirect){
	
	var _this = this;
	if(!swSaveDirect){
		var deliveryDate = moment(jsonData[0]["deliveryDate"], "YYYY-MM-DD"),
		    deliveryTime = moment(jsonData[0]["deliveryTime"], "hh:mm"),
		    msg = "El pedido se entregara el día: <b>" +
				   deliveryDate.format("LL") +
				   "</b> a las <b>"+ deliveryTime.format("hh:mm A") +
				   ".<br><br> ¿Desea Continuar?</b>";

		$("#textConfirm").html(msg)
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
	$("#ppto").html("").val("");
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
		
		var jsonData = controller.newOrder.getFormData(this),
			isDataValid = controller.newOrder.validateForm(jsonData);
		if( isDataValid === true) {
			controller.newOrder.save(jsonData);
		}else{
			alert(isDataValid);
		}
	});

	$("#addItems").click(function(){

	});

};

//validar envio
controller.newOrder.validateForm = function(jsonData) {
	var fecha = jsonData[0]["deliveryDate"],
		hora = jsonData[0]["deliveryTime"],
		cantidad = jsonData[0]["quantity"],
		idItem = jsonData[0]["idItem"],
		direccion = jsonData[0]["address"],
		comentario = jsonData[0]["comment"],
		telfjorecibe = jsonData[0]["telephone"],
		evento = jsonData[0]["nameEvent"],
		movilrecibe = jsonData[0]["celphone"],
		personarecibe = jsonData[0]["nameReceive"],
		msg = true;

	if((validateText(personarecibe))==false){
		return msg = "Persona que recibe invalido";
	}

	if((validateText(movilrecibe))==false){
		return msg = "Celular persona que recibe invalido";
	}

	if((validateText(evento))==false){
		return msg = "Nombre evento invalido";
	}

	if( (validateNum(cantidad)) == false ){
		return msg = "Cantidad invalida";
	}

	if( comentario.length>250 ) {
		return msg = ('Comentario demasiado extenso');
	}

	if( direccion.length>150 ) {
		return msg = ('Direccion muy larga');
	}

	if( direccion == null || direccion.length < 5 || /^\s+$/.test(direccion ) ) {
		return msg = ('Direccion Obligatorio');
	}


	if(hora=='00') {
		return msg = ('Hora No valida');
	}

	/*Validate if exist products added*/

	if( !idItem ) {
		return msg = ('Debe seleccionar el producto');
	}

	if( !validateNum(cantidad) || cantidad < 1 ) {
		return msg = ('Ingresa la cantidad');
	}

	/*Validar Fecha de Entrega*/
	if( !controller.newOrder.validateDeliveryDate(fecha, hora) ) {
		return msg = ('El pedido se debe hacer con mínimo 24 horas de anticipación');
	}

	return msg;

}

controller.newOrder.validateDeliveryDate = function (date, hour){
	var deliveryDate = moment(date+" "+hour, "YYYY-MM-DD H:m"),
	    today = moment(),
	    diferencia = deliveryDate.diff(today,"hours"),
	    numberDayDelivery = deliveryDate.format("d"),
	    numberDayToday = today.format("d"),
	    minHoursToRelease = 24;

	//pedido el sabdo para dia lunes
	if(numberDayToday == 6 && numberDayDelivery == 1)
		minHoursToRelease = 48+8;

	//pedido el sabdo para dia lunes
	if(numberDayToday == 7 && numberDayDelivery == 1)
		minHoursToRelease = 24+8;

	//Si es hecho el viernes paar entregar el lunes
	if(numberDayToday == 5 && numberDayDelivery == 1)
		minHoursToRelease = 72+8;

	//Pedido con menos de 24 horas de anticipacion
	if(diferencia < minHoursToRelease)
		return false;

	return true;
	
};

controller.newOrder.searchItem = function(){
	var items = $("#itemList").find(".nameItem"),
	    texto = $("#txtToSearch").val().toLowerCase();

	items.parent().parent().parent().parent().show();
	for(var i=0; i< items.size(); i++){
		var contenido = items.eq(i).text().toLowerCase();
		var index     = contenido.indexOf(texto);
		if(index == -1){
			items.eq(i).parent().parent().parent().parent().hide();
		}		
	}
}

//---------------------------------------Constructor
controller.newOrder.loadDataToOrder();

//add Events
controller.newOrder.initEvents();