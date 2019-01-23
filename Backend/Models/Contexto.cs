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

        public virtual DbSet<ComplementoPesquisa> ComplementoPesquisa { get; set; }
        public virtual DbSet<Filtro> Filtro { get; set; }
        public virtual DbSet<Oferta> Oferta { get; set; }
        public virtual DbSet<Produto> Produto { get; set; }
        public virtual DbSet<Site> Site { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ComplementoPesquisa>()
                .Property(e => e.ds_complemento)
                .IsUnicode(false);

            modelBuilder.Entity<Filtro>()
                .Property(e => e.nm_filtro)
                .IsUnicode(false);

            modelBuilder.Entity<Filtro>()
                .Property(e => e.nu_valor)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Filtro>()
                .HasMany(e => e.Produto)
                .WithMany(e => e.Filtro)
                .Map(m => m.ToTable("Produto_Filtro").MapLeftKey("id_filtro").MapRightKey("id_produto"));

            modelBuilder.Entity<Oferta>()
                .Property(e => e.nu_valor)
                .HasPrecision(10, 4);

            modelBuilder.Entity<Produto>()
                .Property(e => e.nm_produto)
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
        }
    }
}
