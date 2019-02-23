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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_oferta { get; set; }

        [Required]
        [Column(TypeName = "smallmoney")]
        public decimal nu_preco { get; set; }

        [Required]
        public DateTime dt_oferta { get; set; }

        [Required]
        [StringLength(2000)]
        public string ds_url { get; set; }

        [Required]
        public int? id_produto { get; set; }

        public virtual Produto Produtos { get; set; }
    }
}
