
using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

public class FornecedoresService
{
    private readonly IMongoCollection<Fornecedor> _fornecedorsCollection;

    public FornecedoresService(
        IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(
            DatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            DatabaseSettings.Value.DatabaseName);

        _fornecedorsCollection = mongoDatabase.GetCollection<Fornecedor>(
        DatabaseSettings.Value.FornecedorsCollectionName);
    }

    public async Task<List<Fornecedor>> GetAllFornecedores()
    {
        var results = await _fornecedorsCollection.Find(_ => true).ToListAsync();
        return results.ToList();

    }

    public async Task<Fornecedor> GetFornecedorById(string id)
    {
        var result = await _fornecedorsCollection.FindAsync(f => f.Id == id);
        return await result.FirstOrDefaultAsync();

    }

    public async Task<Fornecedor> GetFornecedorByCnpjCpf(string cnpjCpf)
    {
        var fornecedor = await _fornecedorsCollection.Find(f => f.CnpjCpf == cnpjCpf).FirstOrDefaultAsync();
        return fornecedor;
    }


    public async Task<bool> CheckIfFornecedorExists(string cnpjCpf)
    {
        var fornecedor = await GetFornecedorByCnpjCpf(cnpjCpf);
        return fornecedor != null;
    }


    public Task CreateFornecedor(Fornecedor fornecedor)
    {


        return _fornecedorsCollection.InsertOneAsync(fornecedor);

    }


    public async Task<bool> UpdateFornecedor(string id, Fornecedor fornecedor)
    {

        var result = await _fornecedorsCollection.ReplaceOneAsync(f => f.Id == id, fornecedor);
        return result.ModifiedCount > 0;
    }


    public async Task<bool> DeleteFornecedor(string id)
    {

        var result = await _fornecedorsCollection.DeleteOneAsync(f => f.Id == id);
        return result.DeletedCount > 0;

    }



}
