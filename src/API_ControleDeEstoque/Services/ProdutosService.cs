using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

public class ProdutosService
{
    private readonly IMongoCollection<Produto> _produtosCollection;

    public ProdutosService(IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);
        _produtosCollection = mongoDatabase.GetCollection<Produto>(DatabaseSettings.Value.ProdutosCollectionName);
    }

    public async Task<IReadOnlyCollection<Produto>> GetAllProdutos()
    {
        var results = await _produtosCollection.Find(_ => true).ToListAsync();
        return results.ToList();
    }

    public async Task<Produto> GetProdutoById(string id)
    {
        var result = await _produtosCollection.FindAsync(f => f.Id == id);
        return await result.FirstOrDefaultAsync();
    }

    public Task CreateProduto(Produto produto)
    {
        return _produtosCollection.InsertOneAsync(produto);
    }

    public async Task<bool> UpdateProduto(string id, Produto produto)
    {
        var result = await _produtosCollection.ReplaceOneAsync(f => f.Id == id, produto);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteProduto(string id)
    {
        var result = await _produtosCollection.DeleteOneAsync(f => f.Id == id);
        return result.DeletedCount > 0;
    }
    //Aguardando ajustes - Necessário usuário
    public async Task<IReadOnlyCollection<Produto>> GetAllProdutosZerados(string userId)
    {
        var results = await _produtosCollection.Find(f => f.Id == userId).ToListAsync();
        results.Find(f => f.Quantidade == 0);
        return results;
    }
    //Aguardando ajustes - Necessário usuário.
    public async Task<IReadOnlyCollection<Produto>> GetAllProdutosQuantidadeMinima(string userId)
    {
        var results = await _produtosCollection.Find(f => f.Id == userId && f.Quantidade >= 50).ToListAsync();
        results.Find(f => f.Quantidade == 0);
        return results;
    }
    //Aguardando ajustes - Necessário usuário.
    public async Task<IReadOnlyCollection<Produto>> GetAllProdutosCadastrados(string userId)
    {
        var quantidadeProduto = await _produtosCollection.Find(p => true && p.Id == userId).ToListAsync();
        return quantidadeProduto;
    }
}
