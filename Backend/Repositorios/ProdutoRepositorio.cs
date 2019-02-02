using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.IRepositorio
{
    public class ProdutoRepositorio : IRepositorio<Produto>
    {
        public Produto Editar(Produto entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Entry(entity).State = EntityState.Modified;
                contexto.SaveChanges();
            }
            return entity;
        }

        public bool Excluir(Produto entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Produto.Remove(entity);
                return contexto.SaveChanges() == 1;
            }
        }

        public Produto Obter(int id)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Produto.Where(p => p.id_produto == id).FirstOrDefault();
            }
        }

        public List<Produto> ObterTodos()
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Produto.ToList();
            }
        }

        public List<Produto> ObterTodos(Func<Produto, bool> expressao)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Produto.Where(expressao).ToList();
            }
        }

        public Produto SalvarTodos(Produto entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Produto.Add(entity);
                contexto.SaveChanges();
            }
            return entity;
        }

        public void SalvarTodos(List<Produto> entityList)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Produto.AddRange(entityList);
                contexto.SaveChanges();
            }
        }
    }
}
