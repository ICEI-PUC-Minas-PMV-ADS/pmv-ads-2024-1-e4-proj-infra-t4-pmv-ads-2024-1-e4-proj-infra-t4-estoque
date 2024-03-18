namespace BookStoreApi.Models;

public class FornecedorStoreDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string FornecedorsCollectionName { get; set; } = null!;
}