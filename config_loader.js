module.exports = function(fs, JSON) {
    return {
        loadConfig: function() {
            var configPath = process.argv[2] || './config.json';
            return JSON.parse(fs.readFileSync(configPath).toString());
        }
    }
}