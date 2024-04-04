namespace DatabaseSettingsModel.Models;
public class DatabaseSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string FornecedoresCollectionName { get; set; } = null!;
    public string ProdutosCollectionName { get; set; } = null!;
    public string FeedBackCollectionName { get; set; } = null!;
    public string UsuarioCollectionName { get; set; } = null!;
    
}