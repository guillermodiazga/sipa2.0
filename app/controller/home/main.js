var controller =  controller || {};

// Constructor
controller.main = {};

controller.main.getOrdersPend = function () {
	model.main.getOrdersPend().then(function(data){
		controller.main.showDataInTable(data);
	});
};

controller.main.showDataInTable = function (data) {
	var result = "",
		approveOrders = "";

	if(localStorage.idrol == 1){
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

    controller.main.addEvents();
};

controller.main.addEvents = function (){
	$(".okOrder").click(function(e){
		var idOrder = $(e.target).parent().data("id");
		generic.confirm("Desea Aprobar el Pedido "+idOrder+"?", function(){alert("ok")})
	});
};

//---------------------------------------Constructor
controller.main.getOrdersPend();

setInterval(function(){
	controller.main.getOrdersPend();
}, 30000)
