using Backend.IRepositorio;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Repositorios
{
    public class OfertaRepositorio : IRepositorio<Oferta>
    {
        public Oferta Editar(Oferta entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Entry(entity).State = EntityState.Modified;
                contexto.SaveChanges();
            }
            return entity;
        }

        public bool Excluir(Oferta entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Oferta.Remove(entity);
                return contexto.SaveChanges() == 1;
            }
        }

        public Oferta Obter(int id)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(p => p.id_oferta == id).FirstOrDefault();
            }
        }

        public List<Oferta> ObterTodos()
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.ToList();
            }
        }

        public void Dispose()
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Dispose();
            }
        }

        public Boolean CompararComDemaisOfertas(decimal OfertaAtual, int idProduto)
        {
            using (Contexto contexto = new Contexto())
            {
                DateTime periodo = DateTime.Now.AddDays(-40);
                Oferta oferta = contexto.Oferta.Where(o => o.id_produto == idProduto &&
                                     o.nu_preco <= OfertaAtual &&
                                     o.dt_oferta > periodo).FirstOrDefault();
                return oferta == null;
            }
        }

        public List<Oferta> ObterOfertasDoDia(int idProduto)
        {
            using (Contexto contexto = new Contexto())
            {
                DateTime hoje = DateTime.Now.Date;
                List<Oferta> ofertasLista = contexto.Oferta.Where(o => o.id_produto == idProduto &&                                     
                                     o.dt_oferta > hoje && o.nu_preco > 0).ToList();
                return ofertasLista;
            }
        }

        public int ObterQuantidadeDeNotasDoPeriodo(int idProduto)
        {
            DateTime periodo = DateTime.Now.AddDays(-40);
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(o => o.id_produto == idProduto && o.dt_oferta > periodo).Count(); ;
            }
        }

        public List<Oferta> ObterTodos(Func<Oferta, bool> expressao)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(expressao).ToList();
            }
        }

        public int ObterQuantidadeDeNotasComValorInferior(decimal valorMinimoDeGrupo, int idProduto)
        {
            DateTime periodo = DateTime.Now.AddDays(-40);
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(o => o.id_produto == idProduto && 
                                                    o.dt_oferta > periodo
                                                    && o.nu_preco < valorMinimoDeGrupo).Count();
            }
        }

        public Oferta SalvarTodos(Oferta entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Oferta.Add(entity);
                contexto.SaveChanges();
            }
            return entity;
        }

        public void SalvarTodos(List<Oferta> entityList)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Oferta.AddRange(entityList);
                contexto.SaveChanges();
            }
        }
    }
}
