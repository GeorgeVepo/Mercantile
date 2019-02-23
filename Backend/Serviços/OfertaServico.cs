using Backend.IRepositorio;
using Backend.Models;
using Backend.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public void InserirOfertas(List<Oferta> listaOferta)
        {
            List<Oferta> ListaAux = new List<Oferta>();
            foreach (Oferta oferta in listaOferta)
            {
                oferta.dt_oferta = DateTime.Now;
                ListaAux.Add(oferta);
            }
          OfertaRepositorio.SalvarTodos(ListaAux);
        }

        public void AnalisarOfertas(List<Oferta> listaOferta)
        {
            decimal melhorOferta = listaOferta.Min(o => o.nu_preco);
            int idProduto = listaOferta[0].id_produto.Value;
            Boolean EMelhor = OfertaRepositorio.CompararComDemaisOfertas(melhorOferta, idProduto);
            int totalOfertas = OfertaRepositorio.ObterQuantidadeDeNotasDoPeriodo(idProduto);
            Produto produto = produtoRepositorio.Obter(idProduto);

            if (EMelhor)
            {
                double porcentualDeLucro = double.Parse(produto.nu_porcentagemMinimaDeLucro.ToString());
                double aux = porcentualDeLucro;
                decimal valorSugeridoParaRevenda = 0;
                double porcentualDeRevenda = 0;

                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalOfertas, 0.1, ref porcentualDeLucro, ref valorSugeridoParaRevenda, ref porcentualDeRevenda);
                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalOfertas, 0.01, ref porcentualDeLucro, ref valorSugeridoParaRevenda, ref porcentualDeRevenda);
                ObterPercentualDeDiferencaOtimisado(melhorOferta, idProduto, totalOfertas, 0.001, ref porcentualDeLucro, ref valorSugeridoParaRevenda, ref porcentualDeRevenda);

                if (porcentualDeLucro <= aux)
                {                    
                    return;
                }
                else
                {

                    //adsgarthgryjht424
                    MailMessage mail = new MailMessage("mercantilevepo@gmail.com", "george.vepog@gmail.com, thati.oliveira14@gmail.com, richardvepogg@gmail.com");
                    SmtpClient client = new SmtpClient();
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("mercantilevepo@gmail.com", "mercantile123!");
                    client.Port = 25;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.Host = "smtp.gmail.com";
                    client.EnableSsl = true;
                    mail.Subject = "Oferta Encontrada!";
                    Oferta oferta = listaOferta.Where(l => l.nu_preco == melhorOferta).FirstOrDefault();
                    mail.Body += "URL: " + oferta.ds_url + Environment.NewLine;
                    mail.Body += "Produto: " + produto.nm_produto + Environment.NewLine;
                    mail.Body += "Valor: " + string.Format("{0:N}", (oferta.nu_preco * 1000)) + Environment.NewLine;
                    mail.Body += "Porcentagem de revenda: " + porcentualDeRevenda + Environment.NewLine;
                    mail.Body += "Porcentagem de lucro: " + porcentualDeLucro  + Environment.NewLine;
                    mail.Body += "Valor sugerido de revenda: " + string.Format("{0:N}", (valorSugeridoParaRevenda * 1000)) + Environment.NewLine;
                    client.Send(mail);
                }

            }
        }

        public double ObterPercentualDeDiferencaOtimisado(decimal melhorOferta, int idProduto, int TotalNotas, double percentualDeDescida,  ref double percentualDiferenca, ref decimal valorSugeridoParaRevenda, ref double percentualDeRevenda)
        {
            double notasInclusasNoGrupo = 0;
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
                auxiliar = (auxiliar * 10) * TotalNotas;
                auxiliar = 100 - auxiliar;
                percentualDeRevendaAux = double.Parse(auxiliar.ToString());
            }

            percentualDiferenca -= percentualDeDescida;
            return percentualDiferenca;
        }

    }

   
}
