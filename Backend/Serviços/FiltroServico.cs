using Backend.IRepositorio;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public class FiltroServico : IServico<Filtro>
    {
        FiltroRepositorio FiltroRespositorio = new FiltroRepositorio();

        public Filtro Editar(Filtro entity)
        {
            return FiltroRespositorio.Editar(entity);
        }

        public bool Excluir(Filtro entity)
        {
            return FiltroRespositorio.Excluir(entity);
        }

        public Filtro Obter(int id)
        {
            return FiltroRespositorio.Obter(id);
        }

        public List<Filtro> ObterTodos()
        {
            return FiltroRespositorio.ObterTodos();
        }

        public List<Filtro> ObterTodos(Func<Filtro, bool> expressao)
        {
            return FiltroRespositorio.ObterTodos(expressao);
        }

        public Filtro SalvarTodos(Filtro entity)
        {
            return FiltroRespositorio.SalvarTodos(entity);
        }
    }
}

