using DatabaseSettingsModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace ProjetoControleDeEstoque.Services
{
    public class AuthService
    {
        private readonly IMongoCollection<Usuario> _userCollection;
        public AuthService(IOptions<DatabaseSettings> DatabaseSettings)
        {
            var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);
            _userCollection = mongoDatabase.GetCollection<Usuario>(DatabaseSettings.Value.UsuarioCollectionName);
        }
        public Task CreateUsuario(Usuario usuario)
        {
            return _userCollection.InsertOneAsync(usuario);
        }



    }
}