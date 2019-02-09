using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.IRepositorio
{
    class FiltroRepositorio : IRepositorio<Filtro>
    {
        public Filtro Editar(Filtro entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Entry(entity).State = EntityState.Modified;
                contexto.SaveChanges();
            }
            return entity;
        }

        public bool Excluir(Filtro entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Filtro.Remove(entity);
                return contexto.SaveChanges() == 1;
            }
        }

        public Filtro Obter(int id)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Filtro.Where(f => f.id_filtro == id).FirstOrDefault();
            }
        }

        public List<Filtro> ObterTodos()
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Filtro.ToList();
            }
        }

        public List<Filtro> ObterTodos(Func<Filtro, bool> expressao)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Filtro.Where(expressao).ToList();
            }
        }

        public Filtro SalvarTodos(Filtro entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Filtro.Add(entity);
                contexto.SaveChanges();
            }
            return entity;
        }

        public void SalvarTodos(List<Filtro> entityList)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Filtro.AddRange(entityList);
                contexto.SaveChanges();
            }
        }

        public void Dispose()
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Dispose();
            }
        }
    }
}
