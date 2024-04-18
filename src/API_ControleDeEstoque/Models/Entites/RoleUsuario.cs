using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace ProjetoControleDeEstoque.Models.Entites
{
    [CollectionName("roles")]
    public class RoleUsuario : MongoIdentityRole<Guid>
    {

    }
}
