var controller =  controller || {};

controller.reports = {};



//add all events
controller.reports.initEvents = function(){
	$("#tabMain").click(function(){
		$(".tabBody").hide();
		$("#tabBodyMain").show();
	});

	$(".squareList li").click(function(){
		var $this = $(this),
		nameReport = $this.find(".nameReport").text(),
		html = $this.attr("data-html");

		$("#tabMain").show();
		
		if( $("#tab"+html).size() <= 0){

			//clone tab
			$("#tabMain")
				.clone()
				.text(nameReport)
				.attr("id", "tab"+html)
				.appendTo("#"+$("#tabMain").parent().attr("id"));

			//load report template
			$(".tabBody").hide();

			$("#tabBodyTemplate")
				.clone()
				.show()
				.attr("id", "tabBody"+html)
				.appendTo("#tabSet");
			controller.navigation.loadView(html, "tabBody"+html);

			$("#tab"+html).click(function(){
				$(".tabBody").hide();
				$("#tabBody"+html).show();
			});
		}else{
			$(".tabBody").hide();
			$("#tabBody"+html).show();
		}
	});
};

//---------------------------------------Constructor
//add Events
controller.reports.initEvents();