var model =  model || {};

// Constructor
model.user = {};

model.user.getListDependences = function() {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getListDependences'},
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.user.getDataUser = function(idUser) {
    return $.ajax('services/main.php',
        {
           type: "GET", async: true,
           data:{f:'getDataUser', idUser: idUser},
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};

model.user.saveDataUser = function(jsonData) {
    return $.ajax('services/main.php',
        {
           type: "POST", async: true,
           data:{f:'saveDataUser', jsonData: jsonData},
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        })
        .fail(function(e){
          return e;
        });
};