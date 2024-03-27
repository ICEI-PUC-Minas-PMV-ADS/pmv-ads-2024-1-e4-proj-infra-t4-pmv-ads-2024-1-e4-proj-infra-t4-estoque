using Microsoft.EntityFrameworkCore;
using ProjetoControleDeEstoque.Controllers;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;
using System.Text.Json.Serialization;
using DatabaseSettingsModel.Models;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.Configure<DatabaseSettings>(
  builder.Configuration.GetSection("DatabaseMongoDb"));

builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    var settings = serviceProvider.GetRequiredService<IOptions<DatabaseSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddSingleton<IMongoDatabase>(serviceProvider =>
{
    var client = serviceProvider.GetRequiredService<IMongoClient>();
    var settings = serviceProvider.GetRequiredService<IOptions<DatabaseSettings>>().Value;
    return client.GetDatabase(settings.DatabaseName);
});

// Injeção de dependência
builder.Services.AddSingleton<FornecedoresService>();
builder.Services.AddSingleton<ProdutosService>();
builder.Services.AddSingleton<FeedBackService>();
builder.Services.AddSingleton<EmailService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
