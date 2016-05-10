var model =  model || {};
// Constructor
model.main = {};

model.main.getOrdersPend = function() {
    return $.ajax('services/main.php',
        {
           type: "GET", async: false,
           data:{f:'getRecibidos', idUser: localStorage.id, idRol: localStorage.idrol} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.main.updateStatusOrder = function(id, status, msgStatus) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: false,
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

