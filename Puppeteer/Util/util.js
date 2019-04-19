module.exports = {
    format: function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a) {
            return args[+(a.substr(1, a.length - 2)) || 0];
        });
    },
    sleep: async function (milliseconds) {
        await new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
