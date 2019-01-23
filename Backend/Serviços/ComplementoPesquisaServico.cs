using Backend.IRepositorio;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public class ComplementoPesquisaServico : IServico<ComplementoPesquisa>
    {
        ComplementoPesquisaRepositorio ComplementoPesquisaRespositorio = new ComplementoPesquisaRepositorio();

        public ComplementoPesquisa Editar(ComplementoPesquisa entity)
        {
            return ComplementoPesquisaRespositorio.Editar(entity);
        }

        public bool Excluir(ComplementoPesquisa entity)
        {
            return ComplementoPesquisaRespositorio.Excluir(entity);
        }

        public ComplementoPesquisa Obter(int id)
        {
            return ComplementoPesquisaRespositorio.Obter(id);
        }

        public List<ComplementoPesquisa> ObterTodos()
        {
            return ComplementoPesquisaRespositorio.ObterTodos();
        }

        public List<ComplementoPesquisa> ObterTodos(Func<ComplementoPesquisa, bool> expressao)
        {
            return ComplementoPesquisaRespositorio.ObterTodos(expressao);
        }

        public ComplementoPesquisa SalvarTodos(ComplementoPesquisa entity)
        {
            return ComplementoPesquisaRespositorio.SalvarTodos(entity);
        }
    }
}
