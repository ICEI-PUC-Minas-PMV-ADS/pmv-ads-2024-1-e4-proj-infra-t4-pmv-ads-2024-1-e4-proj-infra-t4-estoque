using Microsoft.AspNetCore.Mvc;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly ProdutosService _produtosCollection;
        private readonly AuthService _authService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProdutosController(ProdutosService produtosService, AuthService authService, IHttpContextAccessor httpContextAccessor)
        {
            _produtosCollection = produtosService;
            _authService = authService;
            _httpContextAccessor = httpContextAccessor;
        }

        // Método para acessar todos os produtos.
        [HttpGet("usuarioIdProdutos")]
        public async Task<ActionResult<IReadOnlyCollection<Produto>>> GetAll(string usuarioId)
        {
            try
            {
                //if (User.Identity.IsAuthenticated)
                //{
                //var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var produtos = await _produtosCollection.GetAllProdutos(usuarioId);
                return Ok(produtos);
                //}
                //return StatusCode(StatusCodes.Status500InternalServerError, $"Usuário não autenticado.");
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
                    return NotFound($"Produto com Id: {id} - não encontrado.");

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
                    return BadRequest("O Id do produto não corresponde ao Id fornecido.");

                var result = await _produtosCollection.UpdateProduto(id, produto);
                if (!result)
                    return NotFound($"Produto com o Id: {id} - não encontrado.");

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
                    return NotFound($"Produto com Id: {id} - não encontrado.");

                return Ok($"Produto com Id: {id} - excluído com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao ao excluir o produto: {ex.Message}");
            }
        }

        // Método para trazer os produtos filtrados na tela de ADM.
        [HttpGet("usuarioId")]
        public async Task<ActionResult<Produto>> GetAllProdutosAdministracao(string usuarioId)
        {
            try
            {
                var produtoZerado = await _produtosCollection.GetAllProdutosZerados(usuarioId);
                var produtoQuantidadeMinima = await _produtosCollection.GetAllProdutosQuantidadeMinima(usuarioId);
                var produtoEstoqueMinimo = await _produtosCollection.GetAllProdutosCadastrados(usuarioId);

                return Ok(new
                {
                    ProdutosZerados = produtoZerado,
                    ProdutosQuantidadeMinima = produtoQuantidadeMinima,
                    ProdutosEstoqueMinimo = produtoEstoqueMinimo
                });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao tentar acessar os dados de produtos.");
            }
        }
    }
}

