using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoControleDeEstoque.Models.Entites
{
    [Table("Empresas")]
    public class Empresa
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string CNPJ { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Usuario { get; set; }
        [Required]
        public string Senha { get; set; }
        [Required]
        public string CaminhoFotoPerfil { get; set; }
        [Required]
        public DateTime DataCadastro { get; set; }
        public ICollection<Produto> ProdutosDaEmpresa { get; set; }
    }
}
