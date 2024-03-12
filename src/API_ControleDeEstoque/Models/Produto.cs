using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;

namespace ProjetoControleDeEstoque.Models
{
    [Table("Produtos")]
    public class Produto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public int Quantidade { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }
        public string Localizacao  { get; set; }
        [Required]
        public EstadoProduto EstadoProduto { get; set; }
        public int FornecedorId { get; set; }
        public Fornecedor Fornecedor { get; set; }
    }
    public enum EstadoProduto
    {
        [Display(Name = "Produtos em boas condições")]
        BoasCondicoes = 0,

        [Display(Name = "Produto danificado")]
        Danificado = 1,

        [Display(Name = "Produto vencido")]
        Vencido = 2,

        [Display(Name = "Produto reembolsado")]
        Reembolsado = 3,

        [Display(Name = "Produto obsoleto")]
        Obsoleto = 4
    }
}
