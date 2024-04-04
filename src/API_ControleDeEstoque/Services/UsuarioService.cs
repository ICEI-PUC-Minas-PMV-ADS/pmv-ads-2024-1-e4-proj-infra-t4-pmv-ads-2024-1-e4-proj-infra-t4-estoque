using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

public class UsuarioService
{
        private readonly IMongoCollection<Usuario> _usuarioCollection;

        public UsuarioService(IOptions<DatabaseSettings> DatabaseSettings)
        {
            var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);
            _usuarioCollection = mongoDatabase.GetCollection<Usuario>(DatabaseSettings.Value.UsuarioCollectionName);
        }

    public Task CreateUsuario(Usuario usuario)
    {
        return _usuarioCollection.InsertOneAsync(usuario);
    }
}

