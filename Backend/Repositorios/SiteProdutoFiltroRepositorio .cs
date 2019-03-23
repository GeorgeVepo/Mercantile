using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.IRepositorio
{
    public class SiteProdutoFiltroRepositorio : IRepositorio<Site_Produto_Filtro>
    {
        public void Dispose()
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Dispose();
            }
        }

        public Site_Produto_Filtro Editar(Site_Produto_Filtro entity)
        {
            throw new NotImplementedException();
        }

        public bool Excluir(Site_Produto_Filtro entity)
        {
            throw new NotImplementedException();
        }

        public Site_Produto_Filtro Obter(int id)
        {
            throw new NotImplementedException();
        }

        public List<Site_Produto_Filtro> ObterTodos()
        {
            throw new NotImplementedException();
        }

        public List<Site_Produto_Filtro> ObterTodos(Func<Site_Produto_Filtro, bool> expressao)
        {
            throw new NotImplementedException();
        }

        public Site_Produto_Filtro SalvarTodos(Site_Produto_Filtro entity)
        {
            throw new NotImplementedException();
        }

        public void SalvarTodos(List<Site_Produto_Filtro> entityList)
        {
            throw new NotImplementedException();
        }

        public List<Site_Produto_Filtro> ObterProdutosEFiltros(int id_site, int id_produto)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Site_Produto_Filtro.Include(s => s.Filtro).Where(s => s.id_site == id_site && s.id_produto == id_produto).ToList();
            }
        }
    }
}
