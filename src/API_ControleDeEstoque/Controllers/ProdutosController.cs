using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using ProjetoControleDeEstoque.Models.Entites;
using System;
using System.Collections.Generic;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly ProdutosService _produtosCollection;

        public ProdutosController(ProdutosService produtosService)
        {
            _produtosCollection = produtosService;
        }

        // Método para acessar todos os produtos.
        [HttpGet]
        public async Task<ActionResult<IReadOnlyCollection<Produto>>> GetAll()
        {
            try
            {
                var produtos = await _produtosCollection.GetAllProdutos();
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
                var produto = await _produtosCollection.GetProdutoById(id);

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
                await _produtosCollection.CreateProduto(produto);
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

                var result = await _produtosCollection.UpdateProduto(id, produto);
                if (!result)
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
                var result = await _produtosCollection.DeleteProduto(id);
                if (!result)
                    return NotFound($"Produto com ID {id} não encontrado.");

                return Ok($"Produto com ID {id} excluído com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao excluir o produto: {ex.Message}");
            }

        }

        // Método para trazer produtos com estoque zerado.

        [HttpGet("{userId}")]

        public async Task<ActionResult<object>> GetAllProdutosAdministracao(string userId)
        {
            try
            { 
                var produtoZerado = await _produtosCollection.GetAllProdutosZerados(userId);
                var produtoQuantidadeMinima = await _produtosCollection.GetAllProdutosQuantidadeMinima(userId);
                var produtoEstoqueMinimo = await _produtosCollection.GetAllProdutosCadastrados(userId);

                return Ok(new
                {
                    ProdutosZerados = produtoZerado,
                    ProdutosQuantidadeMinima = produtoQuantidadeMinima,
                    ProdutosEstoqueMinimo = produtoEstoqueMinimo
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao acessar os produtos: {ex.Message}");
            }
        }
    }
}

