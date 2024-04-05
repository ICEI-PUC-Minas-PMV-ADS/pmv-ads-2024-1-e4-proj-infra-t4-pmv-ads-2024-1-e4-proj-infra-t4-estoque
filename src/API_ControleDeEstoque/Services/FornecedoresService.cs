using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

public class FornecedoresService
{
    private readonly IMongoCollection<Fornecedor> _fornecedoresCollection;
    public FornecedoresService(IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);
        _fornecedoresCollection = mongoDatabase.GetCollection<Fornecedor>(DatabaseSettings.Value.FornecedoresCollectionName);
    }

    public async Task<IReadOnlyCollection<Fornecedor>> GetAllFornecedores()
    {
        var results = await _fornecedoresCollection.Find(_ => true).ToListAsync();
        return results;
    }

    public async Task<Fornecedor> GetFornecedorById(string id)
    {
        var result = await _fornecedoresCollection.FindAsync(f => f.Id == id);
        return await result.FirstOrDefaultAsync();
    }

    public async Task<Fornecedor> GetFornecedorByCnpjCpf(string cnpjCpf)
    {
        var fornecedor = await _fornecedoresCollection.Find(f => f.CnpjCpf == cnpjCpf).FirstOrDefaultAsync();
        return fornecedor;
    }

    public async Task<bool> CheckIfFornecedorExists(string cnpjCpf)
    {
        var fornecedor = await GetFornecedorByCnpjCpf(cnpjCpf);
        return fornecedor != null;
    }

    public Task CreateFornecedor(Fornecedor fornecedor)
    {
        return _fornecedoresCollection.InsertOneAsync(fornecedor);
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
