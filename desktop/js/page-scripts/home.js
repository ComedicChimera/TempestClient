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
                <label for="#ban-list">Ban List</label>
                <div id="ban-list"><table><tbody><tr class="header-row">
                <th>IP Address</th></tr>`;

            
            if (data['ban-list'] != null) {
                for (var i in data['ban-list']) {
                    let item = data['ban-list'][i];

                    html += `<tr><td id="#${item.id}" class="banned-ip${i % 2 == 0 ? " ban-grey" : ""}">${item.ipAddr}</td></tr>`;
                }                    
            }
            else
                html += '<tr><td id="blank" class="ban-grey"></td></tr>';

            html += "</tbody></table></div>";

            $('.home-options').html(html);

            if (data.admin) {
                enableAdmin();
            }
        })
        .catch((e) => {
            showError(e);
        });
}

function enableAdmin() {
    $('#name').addClass("editable");
    $('#name').prop("contenteditable", "true");

    $('#auth-key').addClass("editable");
    $('#auth-key').prop("contenteditable", "true");

    $('.banned-ip table tbody').each(() => {
        if (this.attr('id') != "blank")
            this.html(this.html() + `<button id="button-${this.attr('id')}">x</button>`);
    });

    $('.banned-ip tr:last').after('<tr class="add-ban-row"><td><button class="add-ban">Add Ban</button>');
}
