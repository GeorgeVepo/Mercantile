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
                Oferta oferta = contexto.Oferta.Where(o => o.id_produto == idProduto &&
                                     o.nu_valor < OfertaAtual &&
                                     o.dt_oferta > DateTime.Now.AddMonths(-3)).FirstOrDefault();
                return oferta == null;
            }
        }

        public int ObterQuantidadeDeNotasDoPeriodo(int idProduto)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(o => o.id_produto == idProduto && o.dt_oferta > DateTime.Now.AddMonths(-3)).Count(); ;
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
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(o => o.id_produto == idProduto && 
                                                    o.dt_oferta > DateTime.Now.AddMonths(-3) 
                                                    && o.nu_valor < valorMinimoDeGrupo).Count();
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
