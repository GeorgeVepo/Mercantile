namespace Backend.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Oferta")]
    public partial class Oferta
    {
        [Key]
        public int id_oferta { get; set; }

        [Column(TypeName = "smallmoney")]
        public decimal nu_preco { get; set; }

        public DateTime dt_oferta { get; set; }

        [Required]
        [StringLength(2000)]
        public string ds_url { get; set; }

        public int? id_produto { get; set; }

        public virtual Produto Produto { get; set; }
    }
}
