let client;

(function() {
    let loginData = loadFromCache('login');

    if (loginData !== null) {        
        createTempestClient(loginData)
        .then((c) => {
            client = c;

            loadWindow("home");
        })
        .catch((_) => {
            loadWindow("login");
        });
    }
    else
        loadWindow("login"); 
})();

// jquery defined above (in render.js)
// executed after body loads/when new "page"
// is loaded in the app
function attachHandlers() {
    try {
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
        
                    loadWindow("home");
                })
                .catch((msg) => {
                    showError(msg);
                });
        });
    
        $('#refresh').mousedown(loadHomeData);
    }
    catch (e) {
        console.log(e);
    }
}

$('body').ready(attachHandlers);


