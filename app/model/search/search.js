var model =  model || {};

// Constructor
model.search = {};

model.search.getStatusOrders = function() {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getStatusOrders'} ,
           contentType: "application/json"
        })
        .done(function (data) {
            return data;
        });
};

model.search.getTypesOrders = function() {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getTypesOrders'} ,
           contentType: "application/json"
        })
        .done(function (data) {
            return data;
        });
};

model.search.getPptoUser = function(typeOrder, userId ) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getPptoUserSearch', type: typeOrder, user: userId} ,
           contentType: "application/json"
        })
        .done(function (data) {
            return data;
        });
};

model.search.getQuery = function(jsonData) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getGeneralSearch', jsonData: jsonData} ,
           contentType: "application/json"
        })
        .done(function (data) {
            return data;
        });
};