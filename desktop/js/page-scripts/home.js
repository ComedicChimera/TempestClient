function loadHomeData() {
    client.requestJSON("/config/get-data")
        .then((data) => {
            
        })
        .catch((e) => {
            showError(e);
        });
}