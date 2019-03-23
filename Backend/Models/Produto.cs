namespace Backend.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Produto")]
    public partial class Produto
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Produto()
        {
            Oferta = new HashSet<Oferta>();
            Site_Produto_Filtro = new HashSet<Site_Produto_Filtro>();
        }

        [Key]
        public int id_produto { get; set; }

        [Required]
        [StringLength(500)]
        public string nm_produto { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? nu_porcentagemMinimaDeLucro { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Oferta> Oferta { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Site_Produto_Filtro> Site_Produto_Filtro { get; set; }

        [NotMapped]
        public List<Filtro> ListaFiltros;
    }
}
