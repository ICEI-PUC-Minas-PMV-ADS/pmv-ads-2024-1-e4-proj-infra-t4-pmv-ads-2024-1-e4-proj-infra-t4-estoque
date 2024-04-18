using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;

namespace ProjetoControleDeEstoque.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedoresController : ControllerBase
    {
        private readonly FornecedoresService _fornecedoresService;

        public FornecedoresController(FornecedoresService fornecedoresService)
        {
            _fornecedoresService = fornecedoresService;
        }

        [HttpGet("usuarioIdFornecedores")]
        public async Task<ActionResult<IReadOnlyCollection<Fornecedor>>> GetAll(string usuarioId)
        {
            try
            {
                var fornecedores = await _fornecedoresService.GetAllFornecedores(usuarioId);
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
   var success = await _fornecedoresService.UpdateFornecedor(id, fornecedor);

         if (!success)
                    return NotFound($"Fornecedor com Id: {id} - não encontrado.");
              

             
          

               return Ok($"Fornecedor com Id: {id} - atualizado com sucesso.");
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



