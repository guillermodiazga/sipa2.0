var controller =  controller || {};

controller.reports = {};



//add all events
controller.reports.initEvents = function(){
	$("#tabMain").click(function(){
		$(".tabBody").hide();
		$("#tabBodyMain").show();
		$(".tab").removeClass("open-tab");
		$(this).addClass("open-tab");
	});

	$(".squareList li").click(function(){
		var $this = $(this),
		nameReport = $this.find(".nameReport").text(),
		html = $this.attr("data-html");

		
		if( $("#tab"+html).size() <= 0){//if is a new tab to open

			//clone tab
			$("#tabMain")
				.clone()
				.hide()
				.find(".name").text(nameReport+" ").end()
				.attr("id", "tab"+html)
				.appendTo("#"+$("#tabMain").parent().attr("id"))
				.slideDown()
				.find(".close").show();


			//load report template
			$(".tabBody").hide();

			$("#tabBodyTemplate")
				.clone()
				.show()
				.attr("id", "tabBody"+html)
				.appendTo("#tabSet");

			var callBack = false;

			switch(html){
				case "report-item":
					callBack = function(){
						controller.reports.reportItem.addEvents();
					}
					break;

			}

			controller.navigation.loadView(html, "tabBody"+html, callBack);

			$("#tab"+html).click(function(){
				$(".tabBody").hide();
				$("#tabBody"+html).show();
				$(".tab").removeClass("open-tab");
				$("#tab"+html).addClass("open-tab");

				$(this).find(".close").click(function(){
					$("#tab"+html).remove();
					$("#tabBody"+html).remove();
					$(".tabBody:first").show();

					if($(".tab").size() == 1){
						$(".tab").hide();
					}
				});
			});
		}else{//if the tab already exists
			$(".tabBody").hide();
			$("#tabBody"+html).show();
		}

		$("#tabMain").show().find(".close").hide();
		$(".tab").removeClass("open-tab");
		$("#tab"+html).addClass("open-tab");
	});
};

controller.reports.reportItem = {
	addEvents: function(){
		$("#report-item-form").submit(function(e){
			e.preventDefault();
			general.stopUser.show();

			model.reports.reportItem($("#report-item-ini").val(), $("#report-item-end").val() )
				.done(function(data){
					general.stopUser.hide();
					if(data.length){
						$("#report-item-table tbody").html(general.jsonToTableHtml(data));
						formatTable();
					}else{
						general.noDataToShowInTable($("#report-item-table"));
					}					
				})
				.fail(function(e){
					general.stopUser.hide();
					alert("Error: " + e.responseText);
				});
		});
	}
}
//---------------------------------------Constructor
//add Events
controller.reports.initEvents();




function formatTable (){
	var beforeValue = false,
		counter = 0,
		$element = null,
		firstSub = false,
		sumCant = 0,
		sumValue = 0;

	$.each($("#report-item-table tbody tr"), function(i, e){
		var $td = $(e).find("td:first"),
		    value = $td.text();

		if(value != beforeValue){
			if($element){
				$element.attr("rowspan", counter);
				if(firstSub){
					$element.parent().before("<tr class='success'><td colspan=2>Subtotal:</td><td></td><td></td></tr>")
				}
				firstSub = true;
			}
			$element = $td;
			counter = 0;
		}else{
			$td.remove();
		}

		counter++;
		beforeValue = value;

		if(i+1 == $("#report-item-table tbody tr").size()){
			$element.attr("rowspan", counter);
		}
	})
}