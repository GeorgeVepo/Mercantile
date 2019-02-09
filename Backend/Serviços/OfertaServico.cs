using Backend.IRepositorio;
using Backend.Models;
using Backend.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public class OfertaServico : IServico<Oferta>
    {
        OfertaRepositorio OfertaRepositorio = new OfertaRepositorio();
        ProdutoRepositorio produtoRepositorio = new ProdutoRepositorio();

        public Oferta Editar(Oferta entity)
        {
            return OfertaRepositorio.Editar(entity);
        }

        public bool Excluir(Oferta entity)
        {
            return OfertaRepositorio.Excluir(entity);
        }

        public Oferta Obter(int id)
        {
            return OfertaRepositorio.Obter(id);
        }

        public List<Oferta> ObterTodos()
        {
            return OfertaRepositorio.ObterTodos();
        }

        public List<Oferta> ObterTodos(Func<Oferta, bool> expressao)
        {
            return OfertaRepositorio.ObterTodos(expressao);
        }

        public Oferta SalvarTodos(Oferta entity)
        {
            return OfertaRepositorio.SalvarTodos(entity);
        }

        public void Dispose()
        {
            OfertaRepositorio.Dispose();
        }

        public void AnalisarOfertas(List<Oferta> listaOferta)
        {
            decimal melhorOferta = listaOferta.Min(o => o.nu_valor);
            int idProduto = listaOferta[0].id_produto.Value;
            Boolean EMelhor = OfertaRepositorio.CompararComDemaisOfertas(melhorOferta, idProduto);
            Produto produto = produtoRepositorio.Obter(idProduto);

            if (EMelhor)
            {
                double porcentualDeLucro = produto.nu_porcentagemMinimaDeLucro;
                double aux = porcentualDeLucro;
                int totalNotas = OfertaRepositorio.ObterQuantidadeDeNotasDoPeriodo(idProduto);
                decimal valorSugeridoParaRevenda = 0;
                double porcentualDeRevenda = 0;

                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalNotas, 0.1, ref porcentualDeLucro, ref valorSugeridoParaRevenda, ref porcentualDeRevenda);
                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalNotas, 0.01, ref porcentualDeLucro, ref valorSugeridoParaRevenda, ref porcentualDeRevenda);
                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalNotas, 0.001, ref porcentualDeLucro, ref valorSugeridoParaRevenda, ref porcentualDeRevenda);

                if (porcentualDeLucro <= aux)
                {
                    OfertaRepositorio.SalvarTodos(listaOferta);
                    return;
                }
                else
                {
                    MailMessage mail = new MailMessage("george.vepo@hotmail.com", "george.vepog@gmail.com");
                    SmtpClient client = new SmtpClient();
                    client.Port = 25;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.UseDefaultCredentials = false;
                    client.Host = "smtp.gmail.com";
                    mail.Subject = "Oferta Encontrada!";
                    Oferta oferta = listaOferta.Where(l => l.nu_valor == melhorOferta).FirstOrDefault();
                    mail.Body += "URL: " + oferta.ds_url + Environment.NewLine;
                    mail.Body += "Produto: " + produto.nm_produto + Environment.NewLine;
                    mail.Body += "Valor: " + oferta.nu_valor + Environment.NewLine;
                    mail.Body += "Porcentagem de revenda: " + porcentualDeRevenda + Environment.NewLine;
                    mail.Body += "Porcentagem de lucro: " + porcentualDeLucro + Environment.NewLine;
                    mail.Body += "Valor sugerido de revenda: " + valorSugeridoParaRevenda + Environment.NewLine;
                    client.Send(mail);
                }

            } else
            {
                OfertaRepositorio.SalvarTodos(listaOferta);
            }

        }

        public double ObterPercentualDeDiferencaOtimisado(decimal melhorOferta, int idProduto, int TotalNotas, double percentualDeDescida,  ref double percentualDiferenca, ref decimal valorSugeridoParaRevenda, ref double percentualDeRevenda)
        {
            int notasInclusasNoGrupo = 0;
            decimal auxiliar = 0;
            double percentualDeRevendaAux = 100;
            decimal valorMinimoDeGrupo = 0;

            while (percentualDeRevendaAux > 90)
            {
                percentualDeRevenda = percentualDeRevendaAux;
                valorSugeridoParaRevenda = valorMinimoDeGrupo;
                percentualDiferenca = percentualDiferenca + percentualDeDescida;
                auxiliar = 0;
                valorMinimoDeGrupo = 0;
                notasInclusasNoGrupo = 0;
                auxiliar = (melhorOferta * decimal.Parse(percentualDiferenca.ToString()));
                auxiliar = auxiliar / 100;
                valorMinimoDeGrupo = melhorOferta + auxiliar;
                notasInclusasNoGrupo = OfertaRepositorio.ObterQuantidadeDeNotasComValorInferior(valorMinimoDeGrupo, idProduto);
                auxiliar = 0;
                auxiliar = decimal.Parse((notasInclusasNoGrupo / 100).ToString());
                auxiliar = auxiliar * TotalNotas;
                auxiliar = 100 - auxiliar;
                percentualDeRevendaAux = double.Parse(auxiliar.ToString());
            }

            percentualDiferenca -= percentualDeDescida;
            return percentualDiferenca;
        }

    }

   
}
