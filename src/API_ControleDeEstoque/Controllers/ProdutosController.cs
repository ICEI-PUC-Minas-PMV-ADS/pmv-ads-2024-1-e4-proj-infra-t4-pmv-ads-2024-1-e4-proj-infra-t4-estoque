using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoControleDeEstoque.Models.Context;
using ProjetoControleDeEstoque.Models.Entites;
using System.Linq.Expressions;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }

        //Método para acessar todos os produtos.
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<Produto> produtos = new List<Produto>();
            try
            {
                produtos = await _context.Produtos.Include(i => i.Fornecedor).ToListAsync();

            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados!");
            }
            return Ok(produtos);
        }

        //Método para acessar um produto específico.
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var model = await _context.Produtos.Include(i => i.Fornecedor).FirstOrDefaultAsync(m => m.Id == id);

                if (model == null)
                {
                    return NotFound("Este produto não consta na base de dados!");
                }

                GerarLinks(model);

                return Ok(model);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados!");
            }
        }

        //Método para criar um produto.
        [HttpPost]
        public async Task<ActionResult> Create(Produto model)
        {
            try
            {
                if (String.IsNullOrEmpty(model.Nome) || String.IsNullOrEmpty(model.Descricao) || model.Valor == 0)
                {
                    return BadRequest("Alguns desses campos obrigatórios (Nome, Descrição, Valor) não foram preenchidos!");
                }

                _context.Produtos.Add(model);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar salvar os dados!");
            }
            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        //Método para atualizar o produto.
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Produto model)
        {
            try
            {
                if (id != model.Id)
                    return BadRequest("Ocorreu um erro!");

                var modeloDb = await _context.Produtos.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);

                if (modeloDb == null)
                    return NotFound("Este produto não foi encontrado na base de dados!");

                _context.Produtos.Update(model);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar atualizar os dados!");
            }
        }

        //Método para deletar o produto.
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var model = await _context.Produtos.FindAsync(id);

                if (model == null)
                {
                    return NotFound("Este produto não consta na base de dados!");
                }
                _context.Produtos.Remove(model);
                await _context.SaveChangesAsync();

                return Ok(model);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados!");
            }
        }

        // GERANDO LINKS PARA ACESSAR AS REQUISIÇÕES.
        private void GerarLinks(Produto model)
        {
            model.Links.Add(new LinkDTO(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDTO(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDTO(model.Id, Url.ActionLink(), rel: "delete", metodo: "Delete"));
        }
    }
}
