var model =  model || {};
// Constructor
model.main = {};

model.main.getOrdersPend = function() {
  var count = true;
  if(localStorage.page === 'main'){
    count = false;
  }
    return $.ajax('services/main.php',
        {
           type: "GET", async: false,
           data:{f:'getRecibidos', idUser: localStorage.id, idRol: localStorage.idrol, count: count} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
  
};

model.main.updateStatusOrder = function(id, status, msgStatus) {
    return $.ajax('services/main.php',
        {
           type: "POST", async: false,
           data:{f:'updateStatusOrder', idOrder: id, newStatus: status, msg: msgStatus, user: localStorage.id} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.main.getHistoryOrder = function(id) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: false,
           data:{f:'getHistoryOrder', idOrder: id} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.main.getOrdersToDashboard = function() {
  var idUser = (localStorage.idrol == 1) ? localStorage.id : "";
  return $.ajax('services/main.php',
      {
         type: "GET", async: false,
         data:{f:'getOrdersToDashboard', idRol: localStorage.idrol, idUser: idUser},
         contentType: "application/json"
      })
      .then(function (data) {
          return data;
      });
};


