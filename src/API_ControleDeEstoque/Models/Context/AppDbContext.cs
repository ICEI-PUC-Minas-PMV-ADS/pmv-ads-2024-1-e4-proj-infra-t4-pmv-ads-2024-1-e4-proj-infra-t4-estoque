using Microsoft.EntityFrameworkCore;
using ProjetoControleDeEstoque.Models.Entites;

namespace ProjetoControleDeEstoque.Models.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Produto> Produtos { get; set; }
        
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
