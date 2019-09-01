function loadHomeData() {
    client.requestJSON("/config/get")
        .then((data) => {
            let html = `<label for="#name">Name</label>
                <span id="name">${data.name}</span>
                <label for="#auth-key">Auth Key</label>
                <span id="#auth-key">${data['auth-key']}</span>
                <label for="#uptime">Uptime</label>
                <span id="#uptime">${data.uptime}</span>
                <label for="#os">OS</label>
                <span id="#os">${data.os}</span>
                <label for="#version">Version</label>
                <span id="#version">${data.version}</span>
                <div class="ban-list"><table><tr><th>Banned IP</th></tr>`;

            
            if (data['ban-list'] != null) {
                for (var item of data['ban-list']) 
                    html += `<tr><td id="#${item.id}">${item.ipAddr}</td></tr>`;
            }

            html += "</table></div>";

            $('.home-options').html(html);
        })
        .catch((e) => {
            showError(e);
        });
}
