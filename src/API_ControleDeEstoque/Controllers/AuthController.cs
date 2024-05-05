using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Dtos;
using ProjetoControleDeEstoque.Models;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;

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

        // Inserindo role.
        [HttpPost]
        [Route("roles")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            try
            {
                var appRole = new RoleUsuario { Name = request.Role };
                var createRole = await _authService.CreateRole(appRole);

                return Ok(new { message = "Role criado" });
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar criar o role.");
            }
        }

        // Acessando dados do usuário que está cadastrado.
        [HttpPost]
        [Route("usuarioIdDados")]
        public async Task<LoginUsuario> GetDadosUsuarios(string usuarioId)
        {
            try
            {
                return await _authService.GetDadosUsuarios(usuarioId);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados.");
            }
        }

        //Registro de usuário.
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] Dtos.RegisterRequest request)
        {
            try
            {
                var result = await _authService.RegisterAsync(request);
                return result.Sucesso ? Ok(result) : BadRequest(result.Message);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar se registrar.");
            }
        }

        //Login de usuário.
        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(LoginResponse))]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var result = await _authService.LoginAsync(request);
                return result.Sucesso ? Ok(result) : BadRequest(result.Message);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar fazer login.");
            }
        }

        //Editar usuário

        [HttpPut]
        [Route("editUsuario")]
        public async Task<IActionResult> EditUser([FromBody] EditUser request)
        {
            try
            {
                var result = await _authService.EditUserAsync(request);
                return result.Sucesso ? Ok(result) : BadRequest(result.Message);
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar editar o usuario.");
            }
        }
    }
}
