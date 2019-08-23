let client;

(function() {
    let loginData = loadFromCache('login');

    if (loginData !== null) {        
        createTempestClient(loginData)
        .then((c) => {
            client = c;

            loadHomeWindow();
        })
        .catch((_) => {
            // fail silently for now
        });
    } 
})();

// jquery defined above (in render.js)
// executed after body loads
$('#login-button').mousedown(() => {
    let loginData = {
        "ip-addr": $('#ip-addr').val(),
        "auth-key": $('#auth-key').val()
    };

    if (loginData["ip-addr"] == null) {
        showError("You must specify an IP address");
        return;
    }
    else if (loginData["auth-key"] == null) {
        showError("You must specify an authorization key");
        return;
    }

    createTempestClient(loginData)
        .then((c) => {
            client = c;
        
            saveToCache("login", loginData);

            loadHomeWindow();
        })
        .catch((msg) => {
            showError(msg);
        });
});
