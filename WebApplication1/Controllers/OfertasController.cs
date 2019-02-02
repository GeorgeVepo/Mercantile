using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;
using Backend.Serviços;

namespace WebApplication1.Controllers
{
    public class OfertasController : ApiController
    {
        private OfertaServico ofertaServico = new OfertaServico();

        //// GET: api/Ofertas
        //public IQueryable<Oferta> GetOferta()
        //{
          
        //}

        //// GET: api/Ofertas/5
        //[ResponseType(typeof(Oferta))]
        //public IHttpActionResult GetOferta(int id)
        //{
         
        //}

        //// PUT: api/Ofertas/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutOferta(int id, Oferta oferta)
        //{
        
        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/Ofertas
        [ResponseType(typeof(HttpStatusCode))]
        public IHttpActionResult PostOferta(List<Oferta> listaOferta)
        {
            ofertaServico.AnalisarOfertas(listaOferta);
            return StatusCode(HttpStatusCode.OK);
        }

        //// DELETE: api/Ofertas/5
        //[ResponseType(typeof(Oferta))]
        //public IHttpActionResult DeleteOferta(int id)
        //{
          
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                ofertaServico.Dispose();
            }
            base.Dispose(disposing);
        }

     
}