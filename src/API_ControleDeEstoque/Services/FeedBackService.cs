using DatabaseSettingsModel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

public class FeedBackService
{
    private readonly IMongoCollection<Feedback> _feedBackCollecion;

    public FeedBackService(IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);
        _feedBackCollecion = mongoDatabase.GetCollection<Feedback>(DatabaseSettings.Value.FeedBackCollectionName);
    }

    public Task CreateFeedBack(Feedback feedBack)
    {
        return _feedBackCollecion.InsertOneAsync(feedBack);
    }
}
