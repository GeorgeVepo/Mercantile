using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class OfertaReq
    {

        [Key]
        public int id_oferta { get; set; }

        [Required]
        public decimal nu_preco { get; set; }

        [Required]
        public DateTime dt_oferta { get; set; }

        [Required]
        [StringLength(2000)]
        public string ds_url { get; set; }

        [Required]
        public int? id_produto { get; set; }

        public List<ProdutoReq> Produtos { get; set; }
    }
    

}