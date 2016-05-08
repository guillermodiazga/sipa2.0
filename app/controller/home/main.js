var controller =  controller || {};

// Constructor
controller.main = {};

controller.main.getOrdersPend = function () {
	model.main.getOrdersPend().then(function(data){
		general.notification(data.length);
		
		if(localStorage.page == "main"){
			controller.main.showDataInTable(data);
		}
	});
};

controller.main.showDataInTable = function (data) {
	var result = "",
		approveOrders = "";

	if(localStorage.idrol == 2){
		approveOrders = "<i class='okOrder btn btn-default fa fa-check ' title='Aprobar'></i>"+
		      "<i class='rejectOrder btn btn-default fa fa-times ' title='Rechazar Pedido'></i><br>";
	}

	$.each(data, function(i, resp){
		result += 
			"<tr>"+
	            "<td data-id='"+resp.id+"''>"+
		       		approveOrders+
	            	"<i class='historyOrder btn fa fa-eye btn-default' title='Ver historico de estados del Pedido'></i>"+
		       		"<i class='editOrder btn fa fa-pencil btn-default' title='Modificar Pedido'></i>"+
		       	"</td>"+
	            "<td>"+resp.idsecretaria+" "+resp.secretaria+"</td>"+
	            "<td>"+resp.id+"</td>"+
	            "<td>"+resp.talimento+"</td>"+
	            "<td>"+resp.alimento+"</td>"+
	            "<td>"+resp.cantidad+"</td>"+
	            "<td>$"+formatMoney(resp.valorpedido)+"</td>"+
	            "<td>"+formatDate(resp.fchentrega)+"</td>"+
	            "<td>"+resp.hora+"</td>"+
	            "<td>"+resp.direccion+"</td>"+
	            "<td>"+resp.idppto+"</td>"+
	            "<td>"+resp.personarecibe+"</td>"+
	            "<td>"+resp.comentario+"</td>"+
	        "</tr>";
    });

    $('#mainTable tbody').html("").append(result);

    controller.main.addEventsTable();
};

controller.main.addEvents = function (){
	$("#refreshResults").click(function(){
		$("#stopUser").show();
		statusBar.show("Cargando...").hide(1000);
		controller.main.getOrdersPend();
	});
};

controller.main.addEventsTable = function (){
	$(".okOrder").click(function(e){
		var $row = $(e.target).parent().parent(),
			idOrder = $(e.target).parent().data("id");

		general.confirm("¿Desea Aprobar el Pedido "+idOrder+"?", function(){
			$("#stopUser").show();
			model.main.updateStatusOrder(idOrder, 3)
				.done(function(resp){
					$row.fadeOut(1000);
			        $("#stopUser").hide();
					statusBar.show("Pedido "+idOrder+" Aprobado.").hide(2000);
					general.notification(parseInt($("#notification").text())-1);
				})
				.fail(function(e){
			        $("#stopUser").hide();
				 	alert("Error: " + e.responseText);
				});
		})
	});

	$(".rejectOrder").click(function(e){
		var $row = $(e.target).parent().parent(),
			idOrder = $(e.target).parent().data("id");

		general.confirm("¿Desea Rechazar el Pedido "+idOrder+"?", function(){
			$("#stopUser").show();
			model.main.updateStatusOrder(idOrder, 4)
				.done(function(resp){
					$row.fadeOut(1000);
			        $("#stopUser").hide();
					statusBar.show("Pedido "+idOrder+" Rechazado.").hide(2000);
					general.notification(parseInt($("#notification").text())-1);
				})
				.fail(function(e){
			        $("#stopUser").hide();
				 	alert("Error: " + e.responseText);
				});
		})
	});
};

//---------------------------------------Constructor
controller.main.getOrdersPend();
controller.main.addEvents()


