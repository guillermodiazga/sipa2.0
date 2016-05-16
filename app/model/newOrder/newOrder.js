var model =  model || {};

// Constructor
model.newOrder = {};

model.newOrder.getTypesOrders = function(idTypeOrder) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getTypesOrders', idTypeOrder: idTypeOrder},
           contentType: "application/json"
        })
        .done(function (data) {
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
        .done(function (data) {
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
        .done(function (data) {
            return data;
        });
};

model.newOrder.saveNewOrder = function(jsonData) {
  var f = (!jsonData[0].idOrder)? 'saveOrder' : 'updateOrder';
  return $.ajax('services/main.php',
      {
         type: "POST", async: true,
         data:{f: f, jsonData: jsonData},
         contentType: "application/json"
      });
};

model.newOrder.loadDataOrder = function(idOrder) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'loadDataOrder', idOrder: idOrder, idUser: localStorage.id},
           contentType: "application/json"
        })
};

model.newOrder.deleteOrder = function(idOrder, ppto, vlrtotalanterior) {
  return $.ajax('services/main.php',
      {
         type: "POST", async: true,
         data:{f: "deleteOrder", idOrder: idOrder, ppto: ppto, vlrtotalanterior: vlrtotalanterior, idUser: localStorage.id},
         contentType: "application/json"
      });
};