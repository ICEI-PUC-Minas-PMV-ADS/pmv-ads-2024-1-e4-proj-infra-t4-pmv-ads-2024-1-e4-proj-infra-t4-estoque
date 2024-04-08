using Amazon.SecurityToken.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Text;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        
        //Criação de usuário
        [HttpPost]
        public async Task<ActionResult<Usuario>> Create(Usuario usuario)
        {
            try
            {
                await _authService.CreateUsuario(usuario);
                {
                    var tokenString = GenerateJSONWebToken(usuario);
                    return CreatedAtAction(nameof(Create), new { id = usuario.Id }, usuario.Password);

                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro ao tentar criar o usuário.");
            }
        }

        private string GenerateJSONWebToken(Usuario usuarioinfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Jwt:Key"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5020",
                audience: "http://localhost:5020",
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
