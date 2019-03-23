namespace Backend.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Site")]
    public partial class Site
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Site()
        {
            Site_Produto_Filtro = new HashSet<Site_Produto_Filtro>();
        }

        [Key]
        public int id_site { get; set; }

        [Required]
        [StringLength(500)]
        public string nm_site { get; set; }

        [Required]
        [StringLength(1000)]
        public string ds_url { get; set; }

        [StringLength(255)]
        public string ds_login { get; set; }

        [StringLength(255)]
        public string ds_senha { get; set; }

        public bool fl_ativo { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Site_Produto_Filtro> Site_Produto_Filtro { get; set; }
    }
}
