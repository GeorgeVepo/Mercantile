namespace Backend.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Contexto : DbContext
    {
        public Contexto()
            : base("name=Principal")
        {
        }

        public virtual DbSet<Filtro> Filtro { get; set; }
        public virtual DbSet<Oferta> Oferta { get; set; }
        public virtual DbSet<Produto> Produto { get; set; }
        public virtual DbSet<Site> Site { get; set; }
        public virtual DbSet<Site_Produto_Filtro> Site_Produto_Filtro { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Filtro>()
                .Property(e => e.nm_filtro)
                .IsUnicode(false);

            modelBuilder.Entity<Filtro>()
                .Property(e => e.ds_valor)
                .IsUnicode(false);

            modelBuilder.Entity<Filtro>()
                .HasMany(e => e.Site_Produto_Filtro)
                .WithRequired(e => e.Filtro)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Oferta>()
                .Property(e => e.nu_preco)
                .HasPrecision(10, 4);

            modelBuilder.Entity<Oferta>()
                .Property(e => e.ds_url)
                .IsUnicode(false);

            modelBuilder.Entity<Produto>()
                .Property(e => e.nm_produto)
                .IsUnicode(false);

            modelBuilder.Entity<Produto>()
                .Property(e => e.nu_porcentagemMinimaDeLucro)
                .HasPrecision(6, 3);

            modelBuilder.Entity<Produto>()
                .HasMany(e => e.Site_Produto_Filtro)
                .WithRequired(e => e.Produto)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Site>()
                .Property(e => e.nm_site)
                .IsUnicode(false);

            modelBuilder.Entity<Site>()
                .Property(e => e.ds_url)
                .IsUnicode(false);

            modelBuilder.Entity<Site>()
                .Property(e => e.ds_login)
                .IsUnicode(false);

            modelBuilder.Entity<Site>()
                .Property(e => e.ds_senha)
                .IsUnicode(false);

            modelBuilder.Entity<Site>()
                .HasMany(e => e.Site_Produto_Filtro)
                .WithRequired(e => e.Site)
                .WillCascadeOnDelete(false);
        }
    }
}
