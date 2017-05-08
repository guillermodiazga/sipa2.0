var model =  model || {};

// Constructor
model.login = {};

model.login.in = function(user, pass ) {
    return $.ajax('services/main.php',
        {
           type: "POST", async: false,
           data:{f:'login', user: user, pass: pass} ,
           contentType: "application/json"
        })
        .then(function (data) {
            return data;
        });
};


