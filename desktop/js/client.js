class TempestClient {
    constructor(host, token) {
        this.urlBase = `https://${host}/`;
        this.token = token;
    }
}

function createTempestClient(loginData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://${loginData['ip-addr']}/login`,
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
                
                // TODO: determine if invalid ip address or authentication key
                reject('Failed to connect to server');
            }
        })
    });
}