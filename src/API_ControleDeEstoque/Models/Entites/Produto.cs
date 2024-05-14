using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ProjetoControleDeEstoque.Dtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoControleDeEstoque.Models.Entites
{
    public class Produto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public int Quantidade { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }
        public decimal ValorUnidade { get; set; }
        public string Localizacao { get; set; }
        public DateTime DataDeCriacao { get; set; }
        public DateTime? DataDeModificacao { get; set; }
        public string CodigoProduto { get; set; }
        [Required]
        public EstadoProduto EstadoProduto { get; set; }
        [Required]
        public Categoria Categoria { get; set; }
        public string FornecedorId { get; set; }
        public Fornecedor Fornecedor { get; set; }
        [Required]
        public string UsuarioId { get; set; }
        public LoginUsuario Usuario { get; set; }
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
        Obsoleto = 4,

        [Display(Name = "Produto vendido - FINALIZADO")]
        Vendido = 5
    }
    public enum Categoria
    {
        [Display(Name = "Sem Categoria")]
        SemCategoria = 0,

        [Display(Name = "Roupa")]
        Roupa = 1,

        [Display(Name = "Sapato")]
        Sapato = 2,

        [Display(Name = "Cosmético")]
        Cosmetico = 3,

        [Display(Name = "Alimento")]
        Alimento = 4,

        [Display(Name = "Eletrônico")]
        Eletronico = 5,

        [Display(Name = "Eletrodoméstico")]
        Eletrodomestico = 6
    }
}
