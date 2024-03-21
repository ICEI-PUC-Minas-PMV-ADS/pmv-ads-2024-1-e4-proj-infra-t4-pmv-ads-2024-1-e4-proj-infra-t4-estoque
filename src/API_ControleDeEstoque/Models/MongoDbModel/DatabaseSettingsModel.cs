namespace DatabaseSettingsModel.Models;

public class DatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string FornecedorsCollectionName { get; set; } = null!;

     public string ProdutosCollectionName { get; set; } = null!;
}
