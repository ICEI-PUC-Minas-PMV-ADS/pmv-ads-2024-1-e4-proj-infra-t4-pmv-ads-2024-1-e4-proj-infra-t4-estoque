namespace ProjetoControleDeEstoque.Models
{
    public class LinkDTO
    {
        public int Id { get; set; }
        // O link que utilizará para a navegação.
        public string Href { get; set; }
        // É o Método. Ação que você está usando relacionada a aquele objeto.
        public string Rel { get; set; }
        //Método HTTP.
        public string Metodo { get; set; }
        public LinkDTO(int id, string href, string rel, string metodo)
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
