using DatabaseSettingsModel.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedoresController : ControllerBase
    {
        private readonly FornecedoresService _fornecedoresService;

        public FornecedoresController(FornecedoresService fornecedoresService)
        {
            _fornecedoresService = fornecedoresService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyCollection<Fornecedor>>> GetAll()
        {
            try
            {
                var fornecedores = await _fornecedoresService.GetAllFornecedores();
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
                var fornecedor = await _fornecedoresService.GetFornecedorById(id);
                if (fornecedor == null)
                    return NotFound($"Fornecedor com o Id: {id} - não encontrado.");

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

                var fornecedor = await _fornecedoresService.GetFornecedorByCnpjCpf(cnpjCpf);

                if (fornecedor == null)
                    return NotFound($"O fornecedor de CNPJ/CPF: {cnpjCpf} - não encontrado.");

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
                await _fornecedoresService.CreateFornecedor(fornecedor);
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
                    return BadRequest("O Id do fornecedor não corresponde ao Id fornecido.");

                var success = await _fornecedoresService.UpdateFornecedor(id, fornecedor);
                if (!success)
                    return NotFound($"Fornecedor com Id: {id} - não encontrado.");

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
                var success = await _fornecedoresService.DeleteFornecedor(id);
                if (!success)
                    return NotFound($"Fornecedor com Id {id} - não encontrado.");

                return Ok($"Fornecedor com Id: {id} - excluído com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao excluir o fornecedor: {ex.Message}");
            }
        }
    }

}



