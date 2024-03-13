using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoControleDeEstoque.Models.Entites
{
    [Table("Fornecedores")]
    // A classe Fornecedor está herdando da classe LinkHATEOS
    public class Fornecedor : LinkHATEOS
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string CnpjCpf { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
