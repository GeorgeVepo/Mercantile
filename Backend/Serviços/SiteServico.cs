using Backend.Models;
using Backend.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public class SiteServico : IServico<Site>
    {
        SiteRepositorio SiteRespositorio = new SiteRepositorio();

        public Site Editar(Site entity)
        {
            return SiteRespositorio.Editar(entity);
        }

        public bool Excluir(Site entity)
        {
            return SiteRespositorio.Excluir(entity);
        }

        public Site Obter(int id)
        {
            return SiteRespositorio.Obter(id);
        }

        public List<Site> ObterTodos()
        {
            return SiteRespositorio.ObterTodos();
        }

        public List<Site> ObterTodos(Func<Site, bool> expressao)
        {
            return SiteRespositorio.ObterTodos(expressao);
        }

        public Site SalvarTodos(Site entity)
        {
            return SiteRespositorio.SalvarTodos(entity);
        }

        public void Dispose()
        {
            SiteRespositorio.Dispose();
        }

        public List<Site> ObterAtivos()
        {
            return SiteRespositorio.ObterAtivos();
        }
    }
}
