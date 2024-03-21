﻿using BookStoreApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly IMongoCollection<Produto> _produtosCollection;

        public ProdutosController(IOptions<FornecedorStoreDatabaseSettings> produtoStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(produtoStoreDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(produtoStoreDatabaseSettings.Value.DatabaseName);
            _produtosCollection = mongoDatabase.GetCollection<Produto>(produtoStoreDatabaseSettings.Value.ProdutosCollectionName);
        }

        // Método para acessar todos os produtos.
     [HttpGet]
public async Task<ActionResult<List<Produto>>> GetAll()
{
    try
    {
       var produtos = await _produtosCollection
    .Find(_ => true)
    .Project(p => new Produto
    {
        Id = p.Id,
        Nome = p.Nome,
        Descricao = p.Descricao,
        Quantidade = p.Quantidade,
        Valor = p.Valor,
        Localizacao = p.Localizacao,
        EstadoProduto = p.EstadoProduto,
        Categoria = p.Categoria,
        FornecedorId = p.Fornecedor != null ? p.Fornecedor.Id : null // Verifica se há um fornecedor e atribui o ID, senão, atribui null
    })
    .ToListAsync();

return Ok(produtos);

    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao acessar os produtos: {ex.Message}");
    }
}

        // Método para acessar um produto específico.
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetById(string id)
        {
            try
            {
                var produto = await _produtosCollection.Find(p => p.Id == id).FirstOrDefaultAsync();

                if (produto == null)
                    return NotFound($"Produto com ID {id} não encontrado.");

                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao acessar o produto: {ex.Message}");
            }
        }

        // Método para criar um produto.
        [HttpPost]
        public async Task<ActionResult<Produto>> Create(Produto produto)
        {
            try
            {
                await _produtosCollection.InsertOneAsync(produto);
                return CreatedAtAction(nameof(GetById), new { id = produto.Id }, produto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao criar o produto: {ex.Message}");
            }
        }

        // Método para atualizar o produto.
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, Produto produto)
        {
            try
            {
                if (id != produto.Id)
                    return BadRequest("ID do produto não corresponde ao ID fornecido na URL.");

                var result = await _produtosCollection.ReplaceOneAsync(p => p.Id == id, produto);
                if (result.ModifiedCount == 0)
                    return NotFound($"Produto com ID {id} não encontrado.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao atualizar o produto: {ex.Message}");
            }
        }

        // Método para deletar o produto.
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                var result = await _produtosCollection.DeleteOneAsync(p => p.Id == id);
                if (result.DeletedCount == 0)
                    return NotFound($"Produto com ID {id} não encontrado.");

                return Ok($"Produto com ID {id} excluído com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao excluir o produto: {ex.Message}");
            }
        }
    }
}
