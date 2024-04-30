using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProjetoControleDeEstoque.Dtos;
using ProjetoControleDeEstoque.Models.Entites;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjetoControleDeEstoque.Services
{
    public class AuthService
    {
        private readonly UserManager<LoginUsuario> _userManager;
        private readonly RoleManager<RoleUsuario> _roleManager;

        public AuthService(UserManager<LoginUsuario> userManager, RoleManager<RoleUsuario> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task<IActionResult> CreateRole(RoleUsuario appRole)
        {
            try
            {
                await _roleManager.CreateAsync(appRole);
                return new OkResult();
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }
        public async Task<LoginUsuario> GetDadosUsuarios(string usuarioId)
        {
            try
            {
                var dadosDoUsuario = await _userManager.FindByIdAsync(usuarioId);
                return dadosDoUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao tentar acessar os dados.", ex);
            }
        }
        public async Task<RegisterResponse> RegisterAsync(Dtos.RegisterRequest request)
        {
            try
            {
                var userExists = await _userManager.FindByEmailAsync(request.Email);
                if (userExists != null) return new RegisterResponse { Message = "Usuario ja existe", Sucesso = false };

                userExists = new LoginUsuario
                {
                    FullName = request.UserName,
                    Email = request.Email,
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    UserName = request.Email,
                    Cnpj = request.Cnpj
                };
                var createUserResult = await _userManager.CreateAsync(userExists, request.Password);
                if (!createUserResult.Succeeded) return new RegisterResponse
                { Message = $"A criacao de usuario falhou {createUserResult?.Errors.First()?.Description}", Sucesso = false };

                var addUserToRoleResult = await _userManager.AddToRoleAsync(userExists, "USER");
                if (!addUserToRoleResult.Succeeded) return new RegisterResponse
                { Message = $"A criacao de usuario foi feita mas falhou em adicionar um Role {addUserToRoleResult?.Errors.First()?.Description}", Sucesso = false };

                return new RegisterResponse
                {
                    Sucesso = true,
                    Message = "Usuario registrado com sucesso"
                };
            }
            catch (Exception ex)
            {
                return new RegisterResponse { Message = ex.Message, Sucesso = false };
            }
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user is null) return new LoginResponse { Message = "Email ou senha invalida", Sucesso = false };

                var userPassword = await _userManager.CheckPasswordAsync(user, request.Password);
                if (!userPassword)
                    return new LoginResponse { Message = "Email ou senha inválida", Sucesso = false };

                var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key.Secret));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expires = DateTime.Now.AddMinutes(40);
                var token = new JwtSecurityToken(
                    issuer: "http://localhost:5020",
                    audience: "http://localhost:5020",
                    claims: claims,
                    expires: expires,
                    signingCredentials: creds
                    );
                return new LoginResponse
                {
                    AcessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login Concluido",
                    Email = user?.Email,
                    Sucesso = true,
                    UserId = user?.Id.ToString()
                };
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return new LoginResponse { Sucesso = false };
            }
        }
    }
}
