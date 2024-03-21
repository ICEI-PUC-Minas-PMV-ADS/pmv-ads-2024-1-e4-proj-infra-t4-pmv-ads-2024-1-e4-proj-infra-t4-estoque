using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjetoControleDeEstoque.Models.Entites
{
    [Table("Fornecedores")]
    // A classe Fornecedor está herdando da classe LinkHATEOS
    public class Fornecedor : LinkHATEOS
    {
   
      
  [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
        public string Nome { get; set; }
        [Required]
        public string CnpjCpf { get; set; }
        [Required]
        public string Email { get; set; }

        
    }
}
