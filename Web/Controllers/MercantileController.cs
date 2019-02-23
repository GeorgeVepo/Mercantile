using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;
using Backend.Serviços;
using Web.Models;

namespace Web.Controllers
{
    public class MercantileController : ApiController
    {
        private OfertaServico OfertaServico = new OfertaServico();
        private ProdutoServico ProdutoServico = new ProdutoServico();
        private SiteServico SiteServico = new SiteServico();

        // POST: api/Mercantile/EnviarOfertasPesquisadas
        [ResponseType(typeof(HttpStatusCode))]
        [ActionName("EnviarOfertas")]
        public IHttpActionResult PostInserirOfertasPesquisadas(List<Oferta> listaOfertas)
        {
             OfertaServico.InserirOfertas(listaOfertas);           
            
             OfertaServico.AnalisarOfertas(listaOfertas);                    

            return StatusCode(HttpStatusCode.OK);
        }

        // GET: api/Mercantile/ObterProdutosParaPesquisa
        [ResponseType(typeof(List<ProdutoReq>))]
        [ActionName("ObterProdutosParaPesquisa")]
        public IHttpActionResult GetObterProdutosParaPesquisa()
        {
            List<Produto> ListaProdutos = ProdutoServico.ObterTodosComFiltros();
            List<ProdutoReq> ListaProdutosAux = ProdutoReq.ConverterProdutosComFiltro(ListaProdutos);            
            return Ok(ListaProdutosAux);
        }

        // GET: api/Mercantile/ObterSitesAtivos
        [ResponseType(typeof(List<Site>))]
        [ActionName("ObterSitesAtivos")]
        public IHttpActionResult GetObterSitesAtivos()
        {
            List<Site> ListaSite = SiteServico.ObterAtivos();
            return Ok(ListaSite);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                OfertaServico.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}