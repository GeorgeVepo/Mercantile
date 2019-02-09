using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Serviços
{
    public interface IServico<E>
    {
        E SalvarTodos(E entity);

        Boolean Excluir(E entity);

        E Editar(E entity);

        E Obter(int id);

        List<E> ObterTodos();

        List<E> ObterTodos(Func<E, bool> expressao);

        void Dispose();
    }
}
