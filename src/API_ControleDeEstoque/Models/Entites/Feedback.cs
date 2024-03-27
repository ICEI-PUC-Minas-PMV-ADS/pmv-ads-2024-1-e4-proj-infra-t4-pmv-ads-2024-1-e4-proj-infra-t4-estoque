using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjetoControleDeEstoque.Models.Entites
{
    public class Feedback : LinkHATEOS
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FeedBackDescricao { get; set; }
    }
}
