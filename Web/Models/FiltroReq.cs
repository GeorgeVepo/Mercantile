using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Backend.Models;

namespace Web.Models
{
    public class FiltroReq
    {        
        [Key]
        public int id_filtro { get; set; }

        [Required]
        [StringLength(250)]
        public string nm_filtro { get; set; }

        [StringLength(250)]
        public string ds_valor { get; set; }
       
        public List<ProdutoReq> Produtos { get; set; }

        public static explicit operator FiltroReq(Backend.Models.Filtro filtro)
        {
            FiltroReq filtrooAux = new FiltroReq();
            filtrooAux.ds_valor = filtro.ds_valor;
            filtrooAux.id_filtro = filtro.id_filtro;
            filtrooAux.nm_filtro = filtro.nm_filtro;
            filtrooAux.Produtos = new List<ProdutoReq>();

            return filtrooAux;
        }

        public static List<FiltroReq> ConverterListaFiltro(ICollection<Backend.Models.Filtro> ListaFiltro)
        {
            List<FiltroReq> ListaFiltroAux = new List<FiltroReq>();
            FiltroReq filtroAux = new FiltroReq();
            foreach (Backend.Models.Filtro filtro in ListaFiltro)
            {
                filtroAux = new FiltroReq();
                filtroAux = (FiltroReq)filtro;
                ListaFiltroAux.Add(filtroAux);
            }

            return ListaFiltroAux;
        }

 
    }
}