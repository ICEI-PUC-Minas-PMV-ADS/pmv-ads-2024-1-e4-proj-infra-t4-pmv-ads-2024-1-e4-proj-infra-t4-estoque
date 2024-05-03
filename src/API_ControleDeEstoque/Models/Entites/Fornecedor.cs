using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ProjetoControleDeEstoque.Dtos;
using System.ComponentModel.DataAnnotations;

namespace ProjetoControleDeEstoque.Models.Entites
{
    public class Fornecedor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
        [Required]
        public string CnpjCpf { get; set; }
        public string CodigoFornecedor { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string UsuarioId { get; set; }
        public LoginUsuario Usuario { get; set; }
    }
}
