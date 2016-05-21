var model =  model || {};

// Constructor
model.reports = {};


model.reports.report1 = function(dateIni, dateEnd) {
	var idUser = (localStorage.idrol == 1) ? localStorage.id : "";
	
  return $.ajax('services/main.php',
      {
         type: "GET", async: true,
         data:{f:'report1', dateIni: dateIni, dateEnd: dateEnd, idUser: idUser} ,
         contentType: "application/json"
      })
      .done(function (data) {
          return data;
      });
};

model.reports.report2 = function(dateIni, dateEnd) {
  var idUser = (localStorage.idrol == 1) ? localStorage.id : "";
  
  return $.ajax('services/main.php',
      {
         type: "GET", async: true,
         data:{f:'report2', dateIni: dateIni, dateEnd: dateEnd, idUser: idUser} ,
         contentType: "application/json"
      })
      .done(function (data) {
          return data;
      });
};

model.reports.report3 = function(dateIni, dateEnd) {
  var idSec = (localStorage.idrol == 1) ? localStorage.idsecretaria : "";
  
  return $.ajax('services/main.php',
      {
         type: "GET", async: true,
         data:{f:'report3', dateIni: dateIni, dateEnd: dateEnd, idSec: idSec} ,
         contentType: "application/json"
      })
      .done(function (data) {
          return data;
      });
};

model.reports.report4 = function() {
  var idSec = (localStorage.idrol == 1) ? localStorage.idsecretaria : "";
  
  return $.ajax('services/main.php',
      {
         type: "GET", async: true,
         data:{f:'report4', idSec: idSec} ,
         contentType: "application/json"
      })
      .done(function (data) {
          return data;
      });
};