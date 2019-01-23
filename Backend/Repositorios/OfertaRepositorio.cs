using Backend.IRepositorio;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Repositorios
{
    public class OfertaRepositorio : IRepositorio<Oferta>
    {
        public Oferta Editar(Oferta entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Entry(entity).State = EntityState.Modified;
                contexto.SaveChanges();
            }
            return entity;
        }

        public bool Excluir(Oferta entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Oferta.Remove(entity);
                return contexto.SaveChanges() == 1;
            }
        }

        public Oferta Obter(int id)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(p => p.id_oferta == id).FirstOrDefault();
            }
        }

        public List<Oferta> ObterTodos()
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.ToList();
            }
        }

        public List<Oferta> ObterTodos(Func<Oferta, bool> expressao)
        {
            using (Contexto contexto = new Contexto())
            {
                return contexto.Oferta.Where(expressao).ToList();
            }
        }

        public Oferta SalvarTodos(Oferta entity)
        {
            using (Contexto contexto = new Contexto())
            {
                contexto.Oferta.Add(entity);
                contexto.SaveChanges();
            }
            return entity;
        }
    }
}
