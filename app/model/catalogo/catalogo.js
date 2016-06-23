var model =  model || {};

// Constructor
model.catalogo = {};

model.catalogo.getItems = function(typeOrder ) {
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