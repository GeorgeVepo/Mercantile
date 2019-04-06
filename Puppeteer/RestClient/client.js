var Client = require('node-rest-client').Client;
var client = new Client();


module.exports = {
    ObterURLBase: function () {
        return "http://localhost:62593/api/Mercantile";
    },
    ObterProdutos: async function (id_site, URLBase, callback) {
        // direct way
        client.get(URLBase + "/ObterProdutosParaPesquisa?id_site=" + id_site, function (produtos, response) {
            callback(produtos);
        });

    },
    ObterSites: async function (URLBase, callback) {
        // direct way
        client.get(URLBase + "/ObterSitesAtivos", function (sites, response) {
            return callback(sites);
        });
    },
    EnviarOfertas: async function (URLBase, ofertas) {
        // direct way

        var args = {
            data: ofertas,
            headers: {
                "Content-Type": "application/json"
            }
        };

        client.post(URLBase + "/EnviarOfertas", args, function (response) {

        });

    }
}
