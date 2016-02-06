var model =  model || {};

// Constructor
model.newOrder = {};

model.newOrder.getTypesOrders = function() {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getTypesOrders'} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.newOrder.getItemsToNewOrder = function(typeOrder ) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getItemsToNewOrder', type: typeOrder} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.newOrder.getPptoUserToNewOrder = function(typeOrder, userId ) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getPptoUserToNewOrder', type: typeOrder, user: userId} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.newOrder.saveNewOrder = function(jsonData) {
    return $.ajax('services/main.php',
        {
           type: "POST", async: true,
           data:{f:'saveOrder', jsonData: jsonData},
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        })
        .fail(function(e){
          return e;
        });
};