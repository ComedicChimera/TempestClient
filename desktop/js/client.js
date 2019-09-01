class TempestClient {
    constructor(host, token) {
        this.urlBase = `https://${host}/`;
        this.token = token;
    }

    requestJSON(endpoint) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.urlBase + endpoint,
                method: 'get',
                headers: {"Authorization": this.token},
                success: (data, status, jqXHR) => {
                    let jData = JSON.parse(data);

                    if (jData.hasOwnProperty('status') && !jData.status)
                        reject(jData.message);

                    resolve(jData);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject(errorThrown);
                }
            });
        });
    }
}

function createTempestClient(loginData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://${loginData['ip-addr']}/user/login`,
            method: 'post',
            data: loginData['auth-key'],
            success: (data, status, jqXHR) => {
                // data is status and token string
                let jData = JSON.parse(data);

                if (!jData.status)
                    reject(jData.message);

                resolve(new TempestClient(loginData['ip-addr'], jData.message));
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(errorThrown);
                
                reject('Failed to connect to server');
            }
        })
    });
}