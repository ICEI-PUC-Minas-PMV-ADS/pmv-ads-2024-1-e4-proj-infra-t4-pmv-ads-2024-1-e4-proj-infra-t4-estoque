using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoControleDeEstoque.Models.Context;
using ProjetoControleDeEstoque.Models.Entites;
using System;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedoresController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FornecedoresController(AppDbContext context)
        {
            _context = context;
        }

        //Método para acessar todos os fornecedores.
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<Fornecedor> fornecedores = new List<Fornecedor>();
            try
            {
                fornecedores = await _context.Fornecedores.ToListAsync();

            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados!");
            }
            return Ok(fornecedores);
        }

        //Método para acessar um fornecedor específico. 
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var model = await _context.Fornecedores.FirstOrDefaultAsync(m => m.Id == id);

                if (model == null)
                {
                    return NotFound("Este fornecedor não consta na base de dados!");
                }

                GerarLinks(model);

                return Ok(model);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados!");
            }
        }

        //Método para verificar se o fornecedor existe. 
        [HttpGet("cnpjCpf")]
        public async Task<ActionResult> ExisteFornecedor(string cnpjCpf)
        {
            try
            {
                if (cnpjCpf == null)
                {
                    return NotFound("É obrigatório inserir um fornecedor!");
                }

                var model = await _context.Fornecedores.FirstOrDefaultAsync(m => m.CnpjCpf == cnpjCpf);

                if (model != null)
                {
                    return NotFound("Este fornecedor já consta na base de dados!");
                }
                else
                {
                    return NotFound("O fornecedor pode ser cadastrado!");
                }

            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados!");
            }
        }

        //Método para criar um fornecedor.
        [HttpPost]
        public async Task<ActionResult> Create(Fornecedor model)
        {
            try
            {
                if (String.IsNullOrEmpty(model.Nome) || String.IsNullOrEmpty(model.Email) || String.IsNullOrEmpty(model.CnpjCpf))
                {
                    return BadRequest("Alguns desses campos obrigatórios (Nome, E-mail, CNPJ/CPF) não foram preenchidos!");
                }

                _context.Fornecedores.Add(model);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar salvar os dados!");
            }
            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        //Método para atualizar os dados do fornecedor.
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Fornecedor model)
        {
            try
            {
                if (id != model.Id)
                    return BadRequest("Ocorreu um erro!");

                var modeloDb = await _context.Fornecedores.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);

                if (modeloDb == null)
                    return NotFound("Este fornecedor não foi encontrado na base de dados!");

                _context.Fornecedores.Update(model);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar atualizar os dados!");
            }
        }

        //Método para deletar o fornecedor.
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var model = await _context.Fornecedores.FindAsync(id);

                if (model == null)
                {
                    return NotFound("Este fornecedor não consta na base de dados!");
                }
                _context.Fornecedores.Remove(model);
                await _context.SaveChangesAsync();

                return Ok(model);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados!");
            }
        }

        // GERANDO LINKS PARA ACESSAR AS REQUISIÇÕES.
        private void GerarLinks(Fornecedor model)
        {
            model.Links.Add(new LinkDTO(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDTO(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDTO(model.Id, Url.ActionLink(), rel: "delete", metodo: "Delete"));
        }
    }
}
