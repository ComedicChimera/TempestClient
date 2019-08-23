const fs = require('fs');

function loadFromCache(name) {
    primeCache();

    let cache = JSON.parse(fs.readFileSync("cache.json"));

    if (name in cache)
        return cache[name];
    
    return null;
}

function saveToCache(name, data) {
    primeCache();

    let cache = JSON.parse(fs.readFileSync("cache.json"));
    cache[name] = data;

    fs.writeFileSync("cache.json", JSON.stringify(cache));
}

function primeCache() {
    if (!fs.existsSync("cache.json"))
        fs.writeFileSync("cache.json", "{}");
}