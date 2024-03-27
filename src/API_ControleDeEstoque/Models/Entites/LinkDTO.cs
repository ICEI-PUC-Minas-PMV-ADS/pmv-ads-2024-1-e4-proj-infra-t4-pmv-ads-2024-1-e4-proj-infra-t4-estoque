using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjetoControleDeEstoque.Models.Entites
{
    public class LinkDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Href { get; set; }
        public string Rel { get; set; }
        public string Metodo { get; set; }
        public LinkDTO(string id, string href, string rel, string metodo)
        {
            Id = id;
            Href = href;
            Rel = rel;
            Metodo = metodo;
        }
    }
    public class LinkHATEOS
    {
        public List<LinkDTO> Links { get; set; } = new List<LinkDTO>();
    }
}
