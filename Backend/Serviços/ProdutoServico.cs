using Backend.IRepositorio;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public class ProdutoServico : IServico<Produto>
    {
        ProdutoRepositorio ProdutoRespositorio = new ProdutoRepositorio();
                
        public Produto Editar(Produto entity)
        {
            return ProdutoRespositorio.Editar(entity);
        }

        public bool Excluir(Produto entity)
        {
            return ProdutoRespositorio.Excluir(entity);
        }

        public Produto Obter(int id)
        {
            return ProdutoRespositorio.Obter(id);
        }

        public List<Produto> ObterTodos()
        {
            return ProdutoRespositorio.ObterTodos();
        }

        public List<Produto> ObterTodos(Func<Produto, bool> expressao)
        {
            return ProdutoRespositorio.ObterTodos(expressao);
        }

        public Produto SalvarTodos(Produto entity)
        {
            return ProdutoRespositorio.SalvarTodos(entity);
        }

        public void Dispose()
        {
            ProdutoRespositorio.Dispose();
        }

    }
}
