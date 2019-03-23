using Backend.IRepositorio;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public class SiteProdutoFiltroServico : IServico<Site_Produto_Filtro>
    {
        SiteProdutoFiltroRepositorio SiteProdutoFiltroRepositorio = new SiteProdutoFiltroRepositorio();

        public void Dispose()
        {
            SiteProdutoFiltroRepositorio.Dispose();
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

        public List<Site_Produto_Filtro> ObterProdutosEFiltros(int id_site, int id_produto)
        { 
            return this.SiteProdutoFiltroRepositorio.ObterProdutosEFiltros(id_site, id_produto);
        }
    }
}
