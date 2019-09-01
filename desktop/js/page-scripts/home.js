function loadHomeData() {
    client.requestJSON("/config/get")
        .then((data) => {
            
        })
        .catch((e) => {
            showError(e);
        });
}
