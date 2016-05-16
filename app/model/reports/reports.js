var model =  model || {};

// Constructor
model.reports = {};


model.reports.reportItem = function(dateIni, dateEnd) {
	var idUser = (localStorage.idrol == 1) ? localStorage.id : "";
	
  return $.ajax('services/main.php',
      {
         type: "GET", async: true,
         data:{f:'reportItem', dateIni: dateIni, dateEnd: dateEnd, idUser: idUser} ,
         contentType: "application/json"
      })
      .done(function (data) {
          return data;
      });
};