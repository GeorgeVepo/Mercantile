using Backend.IRepositorio;
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
        OfertaRepositorio ofertaRepositorio = new OfertaRepositorio();
        ProdutoRepositorio produtoRepositorio = new ProdutoRepositorio();

        public Oferta Editar(Oferta entity)
        {
            return ofertaRepositorio.Editar(entity);
        }

        public bool Excluir(Oferta entity)
        {
            return ofertaRepositorio.Excluir(entity);
        }

        public Oferta Obter(int id)
        {
            return ofertaRepositorio.Obter(id);
        }

        public List<Oferta> ObterTodos()
        {
            return ofertaRepositorio.ObterTodos();
        }

        public List<Oferta> ObterTodos(Func<Oferta, bool> expressao)
        {
            return ofertaRepositorio.ObterTodos(expressao);
        }

        public Oferta SalvarTodos(Oferta entity)
        {
            return ofertaRepositorio.SalvarTodos(entity);
        }

        public void AnalisarOfertas(List<Oferta> listaOferta)
        {
            decimal melhorOferta = listaOferta.Min(o => o.nu_valor);
            int idProduto = listaOferta[0].id_produto.Value;
            Boolean EMelhor = ofertaRepositorio.CompararComDemaisOfertas(melhorOferta, idProduto);
            if (EMelhor)
            {
                double percentualDiferenca = produtoRepositorio.Obter(idProduto).nu_porcentagemMinimaDeLucro;
                double aux = percentualDiferenca;
                int totalNotas = ofertaRepositorio.ObterQuantidadeDeNotasDoPeriodo(idProduto);

                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalNotas, 0.1, ref percentualDiferenca);
                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalNotas, 0.01, ref percentualDiferenca);
                decimal valorMinimoDeGrupo = ObterPercentualDeDiferencaOtimisado(
                                                      melhorOferta, idProduto, totalNotas, 0.001, ref percentualDiferenca);
                if(percentualDiferenca <= aux)
                {
                    ofertaRepositorio.SalvarTodos(listaOferta);
                    return;
                }
                else
                {
                    enviarEmailComOfertaEncontrada();
                }

            } else
            {
                ofertaRepositorio.SalvarTodos(listaOferta);
            }

        }

        public decimal ObterPercentualDeDiferencaOtimisado(decimal melhorOferta, int idProduto, int TotalNotas, double percentualDeDecida,  ref double percentualDiferenca)
        {
            int notasInclusasNoGrupo = 0;
            decimal auxiliar = 0;
            double percentualDeComparacao = 100;
            decimal valorMinimoDeGrupo = 0;

            while (percentualDeComparacao > 90)
            {
                auxiliar = 0;
                valorMinimoDeGrupo = 0;
                notasInclusasNoGrupo = 0;
                auxiliar = (melhorOferta * decimal.Parse(percentualDiferenca.ToString()));
                auxiliar = auxiliar / 100;
                valorMinimoDeGrupo = melhorOferta + auxiliar;
                notasInclusasNoGrupo = ofertaRepositorio.ObterQuantidadeDeNotasComValorInferior(valorMinimoDeGrupo, idProduto);
                auxiliar = 0;
                auxiliar = notasInclusasNoGrupo / 100;
                auxiliar = auxiliar * TotalNotas;
                auxiliar -= 100;
                percentualDeComparacao = double.Parse(auxiliar.ToString());
                percentualDeComparacao = percentualDeComparacao + percentualDeDecida;
            }

            percentualDeComparacao -= percentualDeDecida;
            return valorMinimoDeGrupo;
        }
    }
}
