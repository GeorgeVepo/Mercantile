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
            ComplementoPesquisa = new HashSet<ComplementoPesquisa>();
            Oferta = new HashSet<Oferta>();
            Filtro = new HashSet<Filtro>();
        }

        [Key]
        public int id_produto { get; set; }

        [Required]
        [StringLength(500)]
        public string nm_produto { get; set; }

        public int? id_complementoPesquisa { get; set; }

        public double nu_porcentagemMinimaDeLucro { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ComplementoPesquisa> ComplementoPesquisa { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Oferta> Oferta { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Filtro> Filtro { get; set; }
    }
}
