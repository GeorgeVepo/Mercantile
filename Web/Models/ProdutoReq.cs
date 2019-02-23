using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Backend.Models;

namespace Web.Models
{
    public class ProdutoReq
    {
        [Key]
        public int id_produto { get; set; }

        [Required]
        [StringLength(500)]
        public string nm_produto { get; set; }
        public decimal nu_porcentagemMinimaDeLucro { get; set; }
        public List<OfertaReq> Ofertas { get; set; }
        public List<FiltroReq> Filtros { get; set; }

        public static explicit operator ProdutoReq(Backend.Models.Produto produto)
        {
            ProdutoReq produtoAux = new ProdutoReq();
            produtoAux.Ofertas = new List<OfertaReq>();
            produtoAux.id_produto = produto.id_produto;
            produtoAux.nm_produto = produto.nm_produto;
            produtoAux.nu_porcentagemMinimaDeLucro = produto.nu_porcentagemMinimaDeLucro;

            return produtoAux;
        }

        public static List<ProdutoReq> ConverterProdutos(ICollection<Backend.Models.Produto> ListaProdutos)
        {
            List<ProdutoReq> listaProdutoAux = new List<ProdutoReq>();
            ProdutoReq produtoAux = new ProdutoReq();

            foreach (Backend.Models.Produto produto in ListaProdutos)
            {
                produtoAux = new ProdutoReq();
                produtoAux = (ProdutoReq)produto;               
            }

            return listaProdutoAux;
        }

        public static List<ProdutoReq> ConverterProdutosComFiltro(ICollection<Backend.Models.Produto> ListaProdutos)
        {
            List<ProdutoReq> listaProdutoAux = new List<ProdutoReq>();
            ProdutoReq produtoAux = new ProdutoReq();
            foreach (Backend.Models.Produto produto in ListaProdutos)
            {
                produtoAux = new ProdutoReq();
                produtoAux = (ProdutoReq)produto;
                produtoAux.Filtros = FiltroReq.ConverterListaFiltro(produto.Filtros);
                listaProdutoAux.Add(produtoAux);
            }

            return listaProdutoAux;
        }
    }
}