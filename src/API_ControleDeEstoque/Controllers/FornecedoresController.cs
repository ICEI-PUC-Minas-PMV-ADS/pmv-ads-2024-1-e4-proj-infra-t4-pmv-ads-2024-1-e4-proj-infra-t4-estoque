
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Context;
using ProjetoControleDeEstoque.Models.Entites;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;
using BookStoreApi.Models;

namespace ProjetoControleDeEstoque.Controllers
{

   [Route("api/[controller]")]
        [ApiController]

                public class FornecedoresController : ControllerBase
        {
            private readonly DataAcess.FornecedorsService _dataAcess;

            public FornecedoresController(DataAcess.FornecedorsService dataAcess)
            {
                _dataAcess = dataAcess;
            }

            [HttpGet]
            public async Task<ActionResult<List<Fornecedor>>> GetAll()
            {
                try
                {
                    var fornecedores = await _dataAcess.GetAllFornecedores();
                    return Ok(fornecedores);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao acessar os fornecedores: {ex.Message}");
                }
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<Fornecedor>> GetById(string id)
            {
                try
                {
                    var fornecedor = await _dataAcess.GetFornecedorById(id);
                    if (fornecedor == null)
                        return NotFound($"Fornecedor com ID {id} não encontrado.");

                    return Ok(fornecedor);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao acessar o fornecedor: {ex.Message}");
                }
            }

           [HttpGet("cnpjCpf")]
public async Task<ActionResult<Fornecedor>> ExisteFornecedor(string cnpjCpf)
{
    try
    {
        if (cnpjCpf == null)
            return BadRequest("CNPJ/CPF não fornecido.");

        var fornecedor = await _dataAcess.GetFornecedorByCnpjCpf(cnpjCpf);
        
        if (fornecedor == null)
            return NotFound($"Fornecedor com CNPJ/CPF {cnpjCpf} não encontrado.");

        return Ok(fornecedor);
    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao verificar a existência do fornecedor: {ex.Message}");
    }
}
            [HttpPost]
            public async Task<ActionResult<Fornecedor>> Create(Fornecedor fornecedor)
            {
                try
                {
                    await _dataAcess.CreateFornecedor(fornecedor);
                    return CreatedAtAction(nameof(GetById), new { id = fornecedor.Id }, fornecedor);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao criar o fornecedor: {ex.Message}");
                }
            }

            [HttpPut("{id}")]
            public async Task<ActionResult> Update(string id, Fornecedor fornecedor)
            {
                try
                {
                    if (id != fornecedor.Id)
                        return BadRequest("ID do fornecedor não corresponde ao ID fornecido na URL.");

                    var success = await _dataAcess.UpdateFornecedor(id, fornecedor);
                    if (!success)
                        return NotFound($"Fornecedor com ID {id} não encontrado.");

                    return NoContent();
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao atualizar o fornecedor: {ex.Message}");
                }
            }

            [HttpDelete("{id}")]
            public async Task<ActionResult> Delete(string id)
            {
                try
                {
                    var success = await _dataAcess.DeleteFornecedor(id);
                    if (!success)
                        return NotFound($"Fornecedor com ID {id} não encontrado.");

                    return Ok($"Fornecedor com ID {id} excluído com sucesso.");
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao excluir o fornecedor: {ex.Message}");
                }
            }
        }
  
    }

public class DataAcess
{


    public class FornecedorsService
    {
        private readonly IMongoCollection<Fornecedor> _FornecedorsCollection;

        public FornecedorsService(
            IOptions<FornecedorStoreDatabaseSettings> FornecedorStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                FornecedorStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                FornecedorStoreDatabaseSettings.Value.DatabaseName);

            _FornecedorsCollection = mongoDatabase.GetCollection<Fornecedor>(
            FornecedorStoreDatabaseSettings.Value.FornecedorsCollectionName);
        }

        public async Task<List<Fornecedor>> GetAllFornecedores()
        {
            var results = await _FornecedorsCollection.Find(_ => true).ToListAsync();
            return results.ToList();

        }

        public async Task<Fornecedor> GetFornecedorById(string id)
        {
            var result = await _FornecedorsCollection.FindAsync(f => f.Id == id);
            return await result.FirstOrDefaultAsync();

        }

        public async Task<Fornecedor> GetFornecedorByCnpjCpf(string cnpjCpf)
{
    var fornecedor = await _FornecedorsCollection.Find(f => f.CnpjCpf == cnpjCpf).FirstOrDefaultAsync();
    return fornecedor;
}


      public async Task<bool> CheckIfFornecedorExists(string cnpjCpf)
{
    var fornecedor = await GetFornecedorByCnpjCpf(cnpjCpf);
    return fornecedor != null;
}


        public Task CreateFornecedor(Fornecedor fornecedor)
        {


            return _FornecedorsCollection.InsertOneAsync(fornecedor);

        }


        public async Task<bool> UpdateFornecedor(string id, Fornecedor fornecedor)
        {

            var result = await _FornecedorsCollection.ReplaceOneAsync(f => f.Id == id, fornecedor);
            return result.ModifiedCount > 0;
        }


        public async Task<bool> DeleteFornecedor(string id)
        {

            var result = await _FornecedorsCollection.DeleteOneAsync(f => f.Id == id);
            return result.DeletedCount > 0;

        }



    }

}