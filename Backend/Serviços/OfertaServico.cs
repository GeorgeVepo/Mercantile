using Backend.Models;
using Backend.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public class OfertaServico : IServico<Oferta>
    {
        OfertaRepositorio OfertaRespositorio = new OfertaRepositorio();

        public Oferta Editar(Oferta entity)
        {
            return OfertaRespositorio.Editar(entity);
        }

        public bool Excluir(Oferta entity)
        {
            return OfertaRespositorio.Excluir(entity);
        }

        public Oferta Obter(int id)
        {
            return OfertaRespositorio.Obter(id);
        }

        public List<Oferta> ObterTodos()
        {
            return OfertaRespositorio.ObterTodos();
        }

        public List<Oferta> ObterTodos(Func<Oferta, bool> expressao)
        {
            return OfertaRespositorio.ObterTodos(expressao);
        }

        public Oferta SalvarTodos(Oferta entity)
        {
            return OfertaRespositorio.SalvarTodos(entity);
        }
    }
}
