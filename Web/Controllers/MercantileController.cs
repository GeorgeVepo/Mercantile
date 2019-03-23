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
        private SiteProdutoFiltroServico SiteProdutoFiltroServico = new SiteProdutoFiltroServico();

        // POST: api/Mercantile/EnviarOfertasPesquisadas
        [ResponseType(typeof(HttpStatusCode))]
        [ActionName("EnviarOfertas")]
        public IHttpActionResult PostInserirOfertasPesquisadas(List<Oferta> listaOfertas)
        {
            List<Oferta> listaOfertasSalvas = OfertaServico.InserirOfertas(listaOfertas);           
            
            OfertaServico.AnalisarOfertas(listaOfertasSalvas);                    

            return StatusCode(HttpStatusCode.OK);
        }

        // GET: api/Mercantile/ObterProdutosParaPesquisa
        [ResponseType(typeof(List<Produto>))]
        [ActionName("ObterProdutosParaPesquisa")]
        public IHttpActionResult GetObterProdutosParaPesquisa(int id_site)
        {
            List<Produto> ListaProdutos = ProdutoServico.ObterTodos();
            List<Produto> ListaProdutosAux = new List<Produto>();
            Produto produtoAux = new Produto();
            Filtro filtroAux = new Filtro();
            foreach (Produto prod in ListaProdutos)
            {
                produtoAux = new Produto();
                produtoAux.id_produto = prod.id_produto;
                produtoAux.nm_produto = prod.nm_produto;
                produtoAux.nu_porcentagemMinimaDeLucro = prod.nu_porcentagemMinimaDeLucro;
                produtoAux.Oferta = null;
                produtoAux.Site_Produto_Filtro = null;
                produtoAux.ListaFiltros = new List<Filtro>();
                List<Site_Produto_Filtro> listaSite_Produto_Filtro = SiteProdutoFiltroServico.ObterProdutosEFiltros(id_site, prod.id_produto);

                foreach (Site_Produto_Filtro site_Produto_Filtro in listaSite_Produto_Filtro)
                {
                    filtroAux = new Filtro();
                    filtroAux.ds_valor = site_Produto_Filtro.Filtro.ds_valor;
                    filtroAux.id_filtro = site_Produto_Filtro.Filtro.id_filtro;
                    filtroAux.nm_filtro = site_Produto_Filtro.Filtro.nm_filtro;
                    filtroAux.Site_Produto_Filtro = null;
                    produtoAux.ListaFiltros.Add(filtroAux);
                }
                
                ListaProdutosAux.Add(produtoAux);
            }

            return Ok(ListaProdutosAux);
        }

        // GET: api/Mercantile/ObterSitesAtivos
        [ResponseType(typeof(List<Site>))]
        [ActionName("ObterSitesAtivos")]
        public IHttpActionResult GetObterSitesAtivos()
        {
            List<Site> ListaSite = SiteServico.ObterAtivos();
            List<Site> ListaSiteAux = new List<Site>();
            Site siteAux = new Site();
            foreach (Site site in ListaSite)
            {
                siteAux = new Site();
                siteAux.id_site = site.id_site;
                siteAux.nm_site = site.nm_site;
                siteAux.ds_url = site.ds_url;
                siteAux.ds_login = site.ds_login;
                siteAux.ds_senha = site.ds_senha;
                siteAux.Site_Produto_Filtro = new List<Site_Produto_Filtro>();
                ListaSiteAux.Add(siteAux);
            }
            return Ok(ListaSiteAux);
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