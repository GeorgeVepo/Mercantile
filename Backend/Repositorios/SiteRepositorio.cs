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
    public class SiteRepositorio : IRepositorio<Site>
    {
        public Site Editar(Models.Site entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Entry(entity).State = EntityState.Modified;
                contexto.SaveChanges();
            }
            return entity;
        }

        public bool Excluir(Site entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Site.Remove(entity);
                return contexto.SaveChanges() == 1;
            }
        }

        public Site Obter(int id)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Site.Where(p => p.id_site == id).FirstOrDefault();
            }
        }

        public List<Site> ObterTodos()
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Site.ToList();
            }
        }

        public List<Site> ObterTodos(Func<Site, bool> expressao)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Site.Where(expressao).ToList();
            }
        }

        public Site SalvarTodos(Site entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Site.Add(entity);
                contexto.SaveChanges();
            }
            return entity;
        }

        public void SalvarTodos(List<Site> entityList)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Site.AddRange(entityList);
                contexto.SaveChanges();
            }
        }
    }
}
