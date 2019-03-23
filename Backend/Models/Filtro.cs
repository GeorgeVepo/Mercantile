namespace Backend.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Filtro")]
    public partial class Filtro
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Filtro()
        {
            Site_Produto_Filtro = new HashSet<Site_Produto_Filtro>();
        }

        [Key]
        public int id_filtro { get; set; }

        [Required]
        [StringLength(250)]
        public string nm_filtro { get; set; }

        [Required]
        [StringLength(250)]
        public string ds_valor { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Site_Produto_Filtro> Site_Produto_Filtro { get; set; }
    }
}
