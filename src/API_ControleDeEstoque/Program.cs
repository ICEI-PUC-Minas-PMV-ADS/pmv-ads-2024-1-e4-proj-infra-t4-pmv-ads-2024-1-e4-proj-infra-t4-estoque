
using Microsoft.EntityFrameworkCore;

using ProjetoControleDeEstoque.Controllers;
using ProjetoControleDeEstoque.Models.Context;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;
using System.Text.Json.Serialization;
using BookStoreApi.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<AppDbContext>(options =>
     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


  builder.Services.Configure<FornecedorStoreDatabaseSettings>(
    builder.Configuration.GetSection("DatabaseMongoDb"));

    builder.Services.AddSingleton<DataAcess.FornecedorsService>();
     builder.Services.AddSingleton<ProdutosController>();

// Inje��o de depend�ncia
builder.Services.AddScoped<EmailService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
