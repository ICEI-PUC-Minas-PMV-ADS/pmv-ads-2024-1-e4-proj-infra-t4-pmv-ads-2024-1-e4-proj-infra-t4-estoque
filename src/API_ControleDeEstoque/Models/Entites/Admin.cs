using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace API_ControleDeEstoque.Models.Entities
{
    public class Admin
    {
        [BsonId]
        [JsonProperty("usuarioId")]
        public string Id { get; set; }
    }
}