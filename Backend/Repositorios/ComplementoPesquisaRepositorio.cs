using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.IRepositorio
{
    class ComplementoPesquisaRepositorio : IRepositorio<ComplementoPesquisa>
    {
        public ComplementoPesquisa Editar(ComplementoPesquisa entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Entry(entity).State = EntityState.Modified;
                contexto.SaveChanges();
            }
            return entity;
        }

        public bool Excluir(ComplementoPesquisa entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.ComplementoPesquisa.Remove(entity);
                return contexto.SaveChanges() == 1;
            }
        }

        public ComplementoPesquisa Obter(int id)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.ComplementoPesquisa.Where(f => f.id_complementoPesquisa == id).FirstOrDefault();
            }
        }

        public List<ComplementoPesquisa> ObterTodos()
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.ComplementoPesquisa.ToList();
            }
        }

        public List<ComplementoPesquisa> ObterTodos(Func<ComplementoPesquisa, bool> expressao)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.ComplementoPesquisa.Where(expressao).ToList();
            }
        }

        public ComplementoPesquisa SalvarTodos(ComplementoPesquisa entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.ComplementoPesquisa.Add(entity);
                contexto.SaveChanges();
            }
            return entity;
        }

        public void SalvarTodos(List<ComplementoPesquisa> entityList)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.ComplementoPesquisa.AddRange(entityList);
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
