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
        [Key]
        public int id_site { get; set; }

        [Required]
        [StringLength(500)]
        public string ds_url { get; set; }

        [StringLength(255)]
        public string ds_login { get; set; }

        [StringLength(255)]
        public string ds_senha { get; set; }
    }
}
