class TempestClient {
    constructor(host, token) {
        this.urlBase = `http://${host}/`;
        this.token = token;
    }

    requestJSON(endpoint) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.urlBase + endpoint,
                method: 'get',
                headers: {"Authorization": this.token},
                success: (data, status, jqXHR) => {
                    if (data.hasOwnProperty('status') && !data.status)
                        reject(data.message);

                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject(textStatus);
                }
            });
        });
    }
}

function createTempestClient(loginData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://${loginData['ip-addr']}/user/login`,
            method: 'post',
            data: loginData['auth-key'],
            success: (data, status, jqXHR) => {
                if (!data.status)
                    reject(data.message);

                resolve(new TempestClient(loginData['ip-addr'], data.message));
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(textStatus); 
                
                reject('Failed to connect to server');
            }
        });
    });
}