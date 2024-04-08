using Microsoft.IdentityModel.Tokens;
using ProjetoControleDeEstoque.Models.Entites;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjetoControleDeEstoque.Services
{
    public class TokenService
    {
        private string GenerateJSONWebToken(Usuario usuarioinfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Jwt:Key"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, usuarioinfo.Name),
                new Claim(JwtRegisteredClaimNames.Email, usuarioinfo.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5020",
                audience: "http://localhost:5020",
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
