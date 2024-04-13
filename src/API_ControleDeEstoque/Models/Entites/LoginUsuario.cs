using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System.ComponentModel.DataAnnotations;


//ainda nao implementado
namespace ProjetoControleDeEstoque.Models.Entites
{
    [CollectionName("usuarios")]
    public class LoginUsuario : MongoIdentityUser<Guid>
    {
        public string FullName { get; set; } = string.Empty;
    }
}
