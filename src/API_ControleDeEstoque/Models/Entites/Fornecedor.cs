using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

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
        [Required]
        public string Email { get; set; }
    }
}
