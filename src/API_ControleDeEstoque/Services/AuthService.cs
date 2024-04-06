﻿using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

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

        public async Task<Usuario> GetDadosUsuarios(string usuario)
        {
            var result = await _userCollection.FindAsync(f => f.Id == usuario);
            return result.FirstOrDefault();
        }
    }
}