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
        ProdutoRepositorio produtoRespositorio = new ProdutoRepositorio(); 

        public Produto Editar(Produto entity)
        {
            return produtoRespositorio.Editar(entity);
        }

        public bool Excluir(Produto entity)
        {
            return produtoRespositorio.Excluir(entity);
        }

        public Produto Obter(int id)
        {
            return produtoRespositorio.Obter(id);
        }

        public List<Produto> ObterTodos()
        {
            return produtoRespositorio.ObterTodos();
        }

        public List<Produto> ObterTodos(Func<Produto, bool> expressao)
        {
            return produtoRespositorio.ObterTodos(expressao);
        }

        public Produto SalvarTodos(Produto entity)
        {
            return produtoRespositorio.SalvarTodos(entity);
        }
    }
}
