using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            decimal melhorOferta = 3096;
            int TotalNotas = 123;
            double percentualDeDescida = 0.1;
            double percentualDiferenca = 1;
            decimal valorSugeridoParaRevenda = 0;

            ObterPercentualDeDiferencaOtimisado(melhorOferta, TotalNotas, percentualDeDescida, ref percentualDiferenca, ref valorSugeridoParaRevenda);

            percentualDeDescida = 0.01;
            ObterPercentualDeDiferencaOtimisado(melhorOferta, TotalNotas, percentualDeDescida, ref percentualDiferenca, ref valorSugeridoParaRevenda);

            percentualDeDescida = 0.001;
            ObterPercentualDeDiferencaOtimisado(melhorOferta, TotalNotas, percentualDeDescida, ref percentualDiferenca, ref valorSugeridoParaRevenda);

        }


        public static double ObterPercentualDeDiferencaOtimisado(decimal melhorOferta, int TotalNotas, double percentualDeDescida, ref double percentualDiferenca, ref decimal valorSugeridoParaRevenda)
        {
            double notasInclusasNoGrupo = 0;
            decimal auxiliar = 0;
            double percentualDeComparacao = 100;
            decimal valorMinimoDeGrupo = 0;

            while (percentualDeComparacao > 90)
            {
                valorSugeridoParaRevenda = valorMinimoDeGrupo;
                percentualDiferenca = percentualDiferenca + percentualDeDescida;
                auxiliar = 0;
                valorMinimoDeGrupo = 0;
                notasInclusasNoGrupo = 0;
                auxiliar = (melhorOferta * decimal.Parse(percentualDiferenca.ToString()));
                auxiliar = auxiliar / 100;
                valorMinimoDeGrupo = melhorOferta + auxiliar;
                notasInclusasNoGrupo = ObterQuantidadeDeNotasComValorInferior(valorMinimoDeGrupo);
                auxiliar = 0;
                auxiliar = decimal.Parse((notasInclusasNoGrupo / 100).ToString());
                auxiliar = auxiliar * TotalNotas;
                auxiliar = 100 - auxiliar;
                percentualDeComparacao = double.Parse(auxiliar.ToString());
            }

            percentualDiferenca -= percentualDeDescida;
            return percentualDiferenca;
        }

        public static double ObterQuantidadeDeNotasComValorInferior(decimal valorMinimoDeGrupo)
        {
            
                return ofertalista.Where(o => o < double.Parse(valorMinimoDeGrupo.ToString())).Count();
            
        }

        public static double[] ofertalista = {3746.39
, 3499.00
, 3249.00
, 3399.98
, 3399.98
, 3598.00
, 4100.00
, 3379.00
, 3569.00
, 3349.00
, 3399.00
, 3167.89
, 3387.89
, 4190.00
, 3167.89
, 3299.99
, 3408.39
, 3408.39
, 3229.00
, 3408.39
, 3499.00
, 3499.00
, 3499.00
, 3499.00
, 3299.00
, 3199.00
, 3199.00
, 3139.00
, 3254.00
, 3149.00
, 3499.00
, 3149.00
, 3499.00
, 3699.00
, 3636.00
, 3149.00
, 3884.00
, 3096.00
, 3149.00
, 4391.00
, 3149.00
, 3746.39
, 3499.00
, 3249.00
, 3399.98
, 3399.98
, 3598.00
, 4100.00
, 3379.00
, 3569.00
, 3349.00
, 3399.00
, 3167.89
, 3387.89
, 4190.00
, 3167.89
, 3299.99
, 3408.39
, 3408.39
, 3229.00
, 3408.39
, 3499.00
, 3499.00
, 3499.00
, 3499.00
, 3299.00
, 3199.00
, 3199.00
, 3139.00
, 3254.00
, 3149.00
, 3499.00
, 3149.00
, 3499.00
, 3699.00
, 3636.00
, 3149.00
, 3884.00
, 3096.00
, 3149.00
, 4391.00
, 3149.00
, 3746.39
, 3499.00
, 3249.00
, 3399.98
, 3399.98
, 3598.00
, 4100.00
, 3379.00
, 3569.00
, 3349.00
, 3399.00
, 3167.89
, 3387.89
, 4190.00
, 3167.89
, 3299.99
, 3408.39
, 3408.39
, 3229.00
, 3408.39
, 3499.00
, 3499.00
, 3499.00
, 3499.00
, 3299.00
, 3199.00
, 3199.00
, 3139.00
, 3254.00
, 3149.00
, 3499.00
, 3149.00
, 3499.00
, 3699.00
, 3636.00
, 3149.00
, 3884.00
, 3096.00
, 3149.00
, 4391.00
, 3149.00 };
    }
}
