using Microsoft.IdentityModel.Tokens;
using ProjetoControleDeEstoque.Models.Entites;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjetoControleDeEstoque.Services
{
    public class TokenService
    {
        public static object GenerateToken(Usuario usuario)
        {
            try
            {
                var key = Encoding.ASCII.GetBytes(Key.Secret);
                var tokenConfig = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                      new Claim(type:ClaimTypes.Name, value:usuario.Name.ToString()),
                      new Claim(type:ClaimTypes.Role, value:usuario.Role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(3),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenConfig);
                var tokenString = tokenHandler.WriteToken(token);

                return new
                {
                    token = tokenString
                };
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar gerar o token.");
            }
        }
    }
}
