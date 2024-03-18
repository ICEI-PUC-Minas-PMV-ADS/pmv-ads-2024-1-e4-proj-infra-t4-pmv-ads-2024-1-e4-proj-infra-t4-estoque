using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjetoControleDeEstoque.Models.Entites

{
    [Table("Feedback")]
    // A classe Fornecedor está herdando da classe LinkHATEOS
    public class Feedback : LinkHATEOS
    {
   
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Email { get; set; }
        public string FeedBackDescricao { get; set; }
    }
}
