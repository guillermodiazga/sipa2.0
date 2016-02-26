var controller =  controller || {};

controller.search = {};

controller.search.getFormData = function(form){
	var $form = $( form ),
		jsonData = [],
		data = {};

	data.numberOrderFrom = $form.find("#numberOrderFrom").val();
	data.numberOrderTo = $form.find("#numberOrderTo").val();
	data.typeOrder = $form.find("#typeOrder").val();
	data.creationDateFrom = $form.find("#creationDateFrom").val();
	data.creationDateFrom = $form.find("#creationDateFrom").val();
	data.creationDateTo = $form.find("#creationDateTo").val();
	data.deliveryDateFrom = $form.find("#deliveryDateFrom").val();
	data.deliveryDateTo = $form.find("#deliveryDateTo").val();
	data.dependence = $form.find("#dependence").val();
	data.budget = $form.find("#budget").val();
	data.statusOrder = $form.find("#statusOrder").val();

	data.orderBy = $("#resultsTable th[data-order-this = true]").attr("data-order-by") || "";
	data.orderAsc = $("#resultsTable th[data-order-this = true]").attr("data-order-asc") || "";

	jsonData.push(data);

	return jsonData;
};

controller.search.getQuery = function(jsonData) {
	model.search.getQuery(jsonData)
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       $("#container-xl").show();
		       var result = "";
		       $.each(data, function(i, resp){
		       		result += '<tr>'+
		       					'<td><i class="btn fa fa-eye" title="Ver historico de estados del Pedido"></i>'+
		       					'<i class="btn fa fa-print" title="Imprimir Pedido"></i></td>'+
		       					'<td>'+resp.estado+'</td>'+
		       					'<td>'+resp.id+'</td>'+
		       					'<td>'+resp.idsecretaria+'-'+resp.secretaria+'</td>'+
		       					'<td>'+resp.usnam+'</td>'+
		       					'<td>'+resp.talimento+'</td>'+
		       					'<td><img class="thumbnail zoomImg" width="50" src="img/items/'+resp.idalimento+'.png"></td><td>'+resp.idalimento+'-'+resp.alimento+'</td>'+
		       					'<td>'+resp.cantidad+'</td>'+
		       					'<td> $'+formatMoney(resp.valorpedido)+'</td>'+
		       					'<td>'+formatDate(resp.fchentrega)+'</td>'+
		       					'<td>'+resp.hora+'</td>'+
		       					'<td>'+resp.direccion+'</td>'+
		       					'<td>'+resp.idppto+'</td>'+
		       					'<td>'+resp.fchreg+'</td>'+
		       					'<td>'+resp.comentario+'</td>'+
		       					'</tr>';
		       });

		       if( $("#resultsTable").size() == 0){
			       	$("#resultsTemplate")
				       .clone()
				       .attr("id", "resultsTable")
				       .show()
				       .appendTo("#container-xl");
			   }else{
			   		$("#resultsTable tbody tr").remove();
			   }
	       

			   $("#resultsTable").find("tbody")
			       .append(result);

			   //add pagination
		      /* 
		      $("#paginationTemplate")
			       .clone()
			       .show()
			       .appendTo("#container-xl");
*/

			   //add events to zoom images
		       zoomImg();

		       //Add events to order results
		       $("#resultsTable th").click(function () {
		       		$this = $(this);
		       		$this.siblings().attr("data-order-this", "false");

		       		$this.attr("data-order-this", "true");

			   		$("#formSearch").submit();
			   		
		       		if($this.attr("data-order-asc") == true)
		       			$this.attr("data-order-asc", "false");
		       		else
		       			$this.attr("data-order-asc", "true");

		       });
		      
		    }else{
	        	$("#container-xl").show().text("No hay resultados para esta busqueda");
	        }

	        $("#stopUser").hide();
		 }).fail(function(e){

		 	alert("Error: " + e.responseText);
		});
};

controller.search.loadDataInList = function() {
	$("#creationDateFrom").val(currentDate());
	$("#creationDateTo").val(currentDate());
	controller.search.loadOrderTypes();
	controller.search.loadPptoUserToSearch();
	controller.search.orderStatusList();
	controller.search.loadDependencesList();
};

controller.search.orderStatusList = function () {
	model.search.getStatusOrders()
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       items += "<option value='*' selected>Todos</option>";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.name+"</option>";
		       });
		       $("#statusOrder").append(items);
		      
		    }else{
	        	alert("No se pudieron cargar los estados de pedido");
	        }

	        $("#stopUser").hide();
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
		});
};

controller.search.loadDependencesList = function (){

	model.search.getListDependences()
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       items += "<option value='*' selected>Todos</option>";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.secretaria+"</option>";
		       });
		       $("#dependence").append(items);
		      
		    }else{
	        	alert("No se pudieron cargar los tipos de pedido");
	        }

	        $("#stopUser").hide();
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
		});
};

controller.search.loadOrderTypes = function (){

	model.search.getTypesOrders()
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       items += "<option value='*' selected>Todos</option>";
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

controller.search.loadPptoUserToSearch = function (){
	var typeOrder = ( $("#typeOrder").val() == "null") ? "": $("#typeOrder").val(),
		items = "";
	model.search.getPptoUser( typeOrder, sessionStorage.id)
		.done(function (data) {
		    $("#budget").html("");
		    if( data.length > 0){
		        //load data in view
		       items += "<option value='*' selected>Todos</option>";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.id+"-"+item.nombre+"- Saldo: $"+formatMoney(item.valorini-item.valorpedido)+"</option>";
		       });
		       $("#budget").append(items);
		     }else{
	        	alert("No hay presupuesto para este tipo de pedido");
	        }
		 }).fail(function(e){
		 	$("#budget").append(items);
		 	alert("Error: " + e.responseText);
		});
};

//add all events
controller.search.initEvents = function(){
	$("#typeOrder").change(function(){
		controller.search.loadPptoUserToSearch();
	});
	$("#formSearch")
		.submit(function(e){
			e.preventDefault();
			var jsonData = controller.search.getFormData(this);
			console.log(jsonData)
			controller.search.getQuery(jsonData);
		});

};


//---------------------------------------Constructor
controller.search.loadDataInList();

//add Events
controller.search.initEvents();