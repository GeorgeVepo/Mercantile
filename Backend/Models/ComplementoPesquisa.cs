namespace Backend.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ComplementoPesquisa")]
    public partial class ComplementoPesquisa
    {
        [Key]
        public int id_complementoPesquisa { get; set; }

        [Required]
        [StringLength(255)]
        public string ds_complemento { get; set; }

        public int? id_produto { get; set; }

        public virtual Produto Produto { get; set; }
    }
}
