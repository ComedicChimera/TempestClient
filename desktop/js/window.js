function loadWindow(winName) {
    let path = 'pages/' + winName + '.html';

    if (fs.existsSync(path)) {
        $('body').html(String(fs.readFileSync(path)));
    }

    attachHandlers();
}