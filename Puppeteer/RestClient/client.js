var Client = require('node-rest-client').Client;
 
var client = new Client();
 

module.exports = {
    ObterProdutos  : async function() {
        // direct way
        client.get("http://localhost:62593/api/Mercantile/ObterProdutosParaPesquisa", function (data, response) {
            // parsed response body as js object
            console.log(data);
            // raw response
            console.log(response);

            return data;
        });    
    
    }
}
