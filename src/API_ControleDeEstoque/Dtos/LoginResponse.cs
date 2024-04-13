namespace ProjetoControleDeEstoque.Dtos
{
    public class LoginResponse
    {
        public bool Sucesso { get; set; }
        public string AcessToken { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
