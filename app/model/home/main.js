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

