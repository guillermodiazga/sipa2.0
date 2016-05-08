var model =  model || {};
// Constructor
model.main = {};

model.main.getOrdersPend = function() {
    return $.ajax('services/main.php',
        {
           type: "GET", async: false,
           data:{f:'getRecibidos'} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.main.updateStatusOrder = function(id, status) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: false,
           data:{f:'updateStatusOrder', idOrder: id, newStatus: status} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

