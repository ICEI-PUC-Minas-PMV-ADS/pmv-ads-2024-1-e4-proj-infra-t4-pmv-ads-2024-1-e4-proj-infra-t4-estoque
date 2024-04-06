using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ProjetoControleDeEstoque.Models.Entites
{
    public class Feedback
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
