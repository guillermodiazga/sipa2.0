var controller =  controller || {};

controller.search = {};

controller.search.getFormData = function(form){
	var $form = $( form ),
		jsonData = [],
		data = {};

	data.numberOrderFrom = $form.find("#numberOrderFrom").val();
	data.numberOrderTo = $form.find("#numberOrderTo").val();
	data.typeOrder = $form.find("#typeOrder").val()  || "*";
	data.creationDateFrom = $form.find("#creationDateFrom").val();
	data.creationDateFrom = $form.find("#creationDateFrom").val();
	data.creationDateTo = $form.find("#creationDateTo").val();
	data.deliveryDateFrom = $form.find("#deliveryDateFrom").val();
	data.deliveryDateTo = $form.find("#deliveryDateTo").val();
	data.dependence = $form.find("#dependence").val() || "*";
	data.budget = $form.find("#budget").val()  || "*";
	data.orderBy = $("#resultsTable th[data-order-this = true]").attr("data-order-by") || "";
	data.orderAsc = $("#resultsTable th[data-order-this = true]").attr("data-order-asc") || "true";
	data.page = $("#pagination").find("li[class=active]").find("a").attr("data-page") || "0";
	var statusOrder = JSON.stringify($form.find("#statusOrder").val()).replace("[",'').replace("]",'');
	statusOrder = statusOrder.replace(/"/g,"");
	data.statusOrder = (statusOrder.indexOf("*") != -1 )? "*" :  statusOrder;

	jsonData.push(data);

	return jsonData;
};

controller.search.getQuery = function(jsonData) {
	general.stopUser.show();
	model.search.getQuery(jsonData)
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       //$("#results").html("").show();
		       var result = "";
		       $.each(data, function(i, resp){
		       		var valorpedido = ( resp.estado != 1)? resp.valorpedido : 0;
		       		result += '<tr>'+
		       					'<td data-id='+resp.id+'><i class="historyOrder btn btn-default fa fa-history blue" title="Ver historico de estados del Pedido"></i>'+
		       					'<i class="printOrder btn btn-default fa fa-print purple" title="Imprimir Pedido"></i></td>'+
		       					'<td title="'+resp.nomestado+'">'+general.iconStatus.html(resp.estado, resp.nomestado)+'</td>'+
		       					'<td>'+resp.id+'</td>'+
		       					'<td>'+resp.idsecretaria+'-'+resp.secretaria+'</td>'+
		       					'<td>'+resp.usnam+'</td>'+
		       					'<td>'+resp.talimento+'</td>'+
		       					'<td><img class="thumbnail zoomImg" width="50" src="img/items/'+resp.idalimento+'.png"></td><td>'+resp.alimento+'</td>'+
		       					'<td>'+resp.cantidad+'</td>'+
		       					'<td> $'+formatMoney(valorpedido)+'</td>'+
		       					'<td>'+formatDate(resp.fchentrega)+'</td>'+
		       					'<td>'+resp.hora+'</td>'+
		       					'<td>'+resp.direccion+'</td>'+
		       					'<td>'+resp.idppto+'</td>'+
		       					'<td>'+resp.fchreg+'</td>'+
		       					'<td>'+resp.comentario+'</td>'+
		       					'</tr>';
		       });

		       
		       	$("#resultsTable")
			       .find("tbody")
			       .html(result);

			  general.zoomImg();
		      general.iconStatus.addEvents();
		      general.setPagination("#resultsTable", 10, parseInt($(".pagination li.active:first").text()));

		      $(".historyOrder").click(function(e){
		      	var idOrder = $(e.target).parent().data("id");
				general.showHistoryStatusOrder(idOrder);
		      });

		      $(".printOrder").click(function(e){
		      	var idOrder = $(e.target).parent().data("id");
				general.printOrder(idOrder);
		      });
		    }else{
	        	general.noDataToShowInTable($('#resultsTable'), "No hay resultados para esta busqueda");
	        }

	        general.stopUser.hide();
		 }).fail(function(e){
	        general.stopUser.hide();
		 	alert("Error: " + e.responseText);
		});
};

controller.search.loadDataInList = function() {
	//$("#creationDateFrom").val(currentDate());
	//$("#creationDateTo").val(currentDate());
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

		       if(localStorage.idrol == 1){
		       	$("#dependence").val(localStorage.idsecretaria).attr("disabled", "disabled");
		       }
		      
		    }else{
	        	alert("No se pudieron cargar los tipos de pedido");
	        }

	        general.stopUser.hide();
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
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
		});
};

controller.search.loadPptoUserToSearch = function (){
	var typeOrder = ( $("#typeOrder").val() == "null") ? "": $("#typeOrder").val(),
		items = "";
	model.search.getPptoUser( typeOrder, localStorage.id)
		.done(function (data) {
		    $("#budget").html("");
		    if( data.length > 0){
		        //load data in view
		       items += "<option value='*' selected>Todos</option>";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.id+"-"+item.nombre+"- Saldo: $"+formatMoney(item.valorini-item.valorpedido)+"</option>";
		       });
		       $("#budget").append(items);
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

	$("#formSearch").off("submit")
		.submit(function(e){
			e.preventDefault();
			general.stopUser.show();
			var jsonData = controller.search.getFormData(this);
			controller.search.getQuery(jsonData);
		});

	$("#exportExcel").click(function(){
		$('#resultsTable tbody tr').show();
		general.exportToExcel($('#resultsTable'));
		$('.page1').click();
	});

};


//---------------------------------------Constructor
controller.search.loadDataInList();

//add Events
controller.search.initEvents();