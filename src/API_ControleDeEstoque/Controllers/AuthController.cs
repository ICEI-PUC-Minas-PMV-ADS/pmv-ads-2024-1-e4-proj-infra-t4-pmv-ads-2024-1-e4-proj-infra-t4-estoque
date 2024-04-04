using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;
using System.Reflection;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }


        //criar usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> Create(Usuario usuario)
        {
            await _authService.CreateUsuario(usuario);
            return CreatedAtAction(nameof(Create), new { id = usuario.Id }, usuario.Password);
        }
        //get usuario
    }
}
