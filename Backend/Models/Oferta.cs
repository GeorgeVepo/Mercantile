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
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_oferta { get; set; }

        [Required]
        [Column(TypeName = "smallmoney")]
        public decimal nu_valor { get; set; }

        [Required]
        public DateTime dt_oferta { get; set; }

        [Required]
        [StringLength(2000)]
        public string ds_url { get; set; }

        [Required]
        public int? id_produto { get; set; }

        public virtual Produto Produto { get; set; }
    }
}
