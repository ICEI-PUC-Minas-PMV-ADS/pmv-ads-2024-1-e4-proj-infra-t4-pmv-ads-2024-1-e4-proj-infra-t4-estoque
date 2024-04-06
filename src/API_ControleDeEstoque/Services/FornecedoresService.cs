using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

namespace ProjetoControleDeEstoque.Services
{
    public class FornecedoresService
    {
        private readonly IMongoCollection<Fornecedor> _fornecedoresCollection;
        private readonly AuthService _authCollection;
        public FornecedoresService(IOptions<DatabaseSettings> DatabaseSettings, AuthService authService)
        {
            var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);
            _fornecedoresCollection = mongoDatabase.GetCollection<Fornecedor>(DatabaseSettings.Value.FornecedoresCollectionName);
            _authCollection = authService;
        }

        public async Task<IReadOnlyCollection<Fornecedor>> GetAllFornecedores(string usuarioId)
        {
            List<Fornecedor> listaDeFornecedorPorUsuario = [];

            var results = await _fornecedoresCollection.Find(f => f.UsuarioId == usuarioId).ToListAsync();
            foreach (var fornecedor in results)
            {
                var usuarioDados = await _authCollection.GetDadosUsuarios(fornecedor.UsuarioId);
                fornecedor.Usuario = usuarioDados;

                listaDeFornecedorPorUsuario.Add(fornecedor);
            }

            return listaDeFornecedorPorUsuario;
        }

        public async Task<Fornecedor> GetFornecedorById(string id)
        {
            var result = await _fornecedoresCollection.Find(f => f.Id == id).FirstOrDefaultAsync();

            if (result != null)
            {
                var usuarioDados = await _authCollection.GetDadosUsuarios(result.UsuarioId);
                result.Usuario = usuarioDados;
            }

            return result;
        }

        public async Task<Fornecedor> GetFornecedorByCnpjCpf(string cnpjCpf)
        {
            var result = await _fornecedoresCollection.Find(f => f.CnpjCpf == cnpjCpf).FirstOrDefaultAsync();

            if (result != null)
            {
                var usuarioDados = await _authCollection.GetDadosUsuarios(result.UsuarioId);
                result.Usuario = usuarioDados;
            }
            return result;
        }

        public async Task<bool> CheckIfFornecedorExists(string cnpjCpf)
        {
            var fornecedor = await GetFornecedorByCnpjCpf(cnpjCpf);
            return fornecedor != null;
        }

        public Task CreateFornecedor(Fornecedor fornecedor)
        {
            var fornecedorExisteByCnpjCpf = CheckIfFornecedorExists(fornecedor.CnpjCpf).Result;

            if (fornecedorExisteByCnpjCpf == false)
            {
                var result = _fornecedoresCollection.InsertOneAsync(fornecedor);
                return result;
            }
            else
                throw new Exception("Este CNPJ/CPF já está cadastrado no banco de dados, por favor verifique no menu 'FORNECEDORES'.");
        }

        public async Task<bool> UpdateFornecedor(string id, Fornecedor fornecedor)
        {
            var result = await _fornecedoresCollection.ReplaceOneAsync(f => f.Id == id, fornecedor);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteFornecedor(string id)
        {
            var result = await _fornecedoresCollection.DeleteOneAsync(f => f.Id == id);
            return result.DeletedCount > 0;
        }
    }
}