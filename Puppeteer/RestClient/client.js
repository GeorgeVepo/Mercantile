var Client = require('node-rest-client').Client; 
var client = new Client();
 

module.exports = {
    ObterURLBase : function(){
           return "http://localhost:62593/api/Mercantile";
    },    
    ObterURLMercadoLivre : function(){
            return "https://lista.mercadolivre.com.br/{0}_OrderId_{1}_ItemTypeID_{2}_PriceRange_{3}_BestSellers_{4}";
    },   
    ObterProdutos  : async function(URLBase, callback) {
        // direct way
        client.get(URLBase + "/ObterProdutosParaPesquisa", function (produtos, response) {
            callback(produtos);
        });    
    
    },
    ObterSites  : async function(URLBase, callback) {
        // direct way
        client.get(URLBase + "/ObterSitesAtivos", function (sites, response) {
           return callback(sites);
    });    
},
    EnviarOfertas : async function(URLBase, ofertas) {
        // direct way
        
        var args = {
            data: ofertas,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(URLBase + "/EnviarOfertas", args, function (response) {
           
    });    
    
    }
}
