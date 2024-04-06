using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;
public class ProdutosService
{
    private readonly IMongoCollection<Produto> _produtosCollection;
    private readonly AuthService _authCollection;
    private readonly FornecedoresService _fornecedorCollection;
    public ProdutosService(IOptions<DatabaseSettings> DatabaseSettings, AuthService authService, FornecedoresService fornecedoresService)
    {
        var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);
        _produtosCollection = mongoDatabase.GetCollection<Produto>(DatabaseSettings.Value.ProdutosCollectionName);
        _authCollection = authService;
        _fornecedorCollection = fornecedoresService;
    }

    public async Task<IReadOnlyCollection<Produto>> GetAllProdutos(string userId)
    {
        List<Produto> listaDeProdutosPorUsuario = new List<Produto>();

        var result = await _produtosCollection.Find(f => f.UsuarioId == userId).ToListAsync();

        foreach (var produto in result)
        {
            var usuarioDados = await _authCollection.GetDadosUsuarios(produto.UsuarioId);
            produto.Usuario = usuarioDados;

            var fornecedorDados = await _fornecedorCollection.GetFornecedorById(produto.FornecedorId);
            produto.Fornecedor = fornecedorDados;

            listaDeProdutosPorUsuario.Add(produto);
        }

        return listaDeProdutosPorUsuario;
    }

    public async Task<Produto> GetProdutoById(string id)
    {
        var result = await _produtosCollection.Find(f => f.Id == id).FirstOrDefaultAsync();

        if (result != null)
        {
            var usuarioDados = await _authCollection.GetDadosUsuarios(result.UsuarioId);
            result.Usuario = usuarioDados;

            var fornecedorDados = await _fornecedorCollection.GetFornecedorById(result.FornecedorId);
            result.Fornecedor = fornecedorDados;
        }

        return result;
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

    public async Task<IReadOnlyCollection<Produto>> GetAllProdutosZerados(string userId)
    {
        var result = await _produtosCollection.Find(f => f.UsuarioId == userId && f.Quantidade == 0).ToListAsync();
        return result;
    }

    public async Task<IReadOnlyCollection<Produto>> GetAllProdutosQuantidadeMinima(string userId)
    {
        var result = await _produtosCollection.Find(f => f.UsuarioId == userId && f.Quantidade <= 50).ToListAsync();
        return result;
    }

    public async Task<long> GetAllProdutosCadastrados(string userId)
    {
        var result = await _produtosCollection.Find(p => p.UsuarioId == userId).CountDocumentsAsync();
        return result;
    }
}
