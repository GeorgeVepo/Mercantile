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

namespace Web.Controllers
{
    public class MercantileController : ApiController
    {
        private OfertaServico OfertaServico = new OfertaServico();
        private ProdutoServico ProdutoServico = new ProdutoServico();
        private SiteServico SiteServico = new SiteServico();

        // POST: api/Mercantile
        [ResponseType(typeof(HttpStatusCode))]
        public IHttpActionResult PostInserirOfertasPesquisadas(List<Oferta> listaOferta)
        {
            OfertaServico.AnalisarOfertas(listaOferta);
            return StatusCode(HttpStatusCode.OK);
        }

        // GET: api/Mercantile
        [ResponseType(typeof(List<Produto>))]
        public IHttpActionResult GetObterProdutosParaPesquisa()
        {
            List<Produto> ListaProdutos = ProdutoServico.ObterTodosComFiltros();
            return Ok(ListaProdutos);
        }

        // GET: api/Mercantile
        [ResponseType(typeof(List<Site>))]
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