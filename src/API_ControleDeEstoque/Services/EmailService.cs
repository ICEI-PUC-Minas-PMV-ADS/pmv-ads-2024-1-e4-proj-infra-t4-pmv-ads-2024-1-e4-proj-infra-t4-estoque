using Microsoft.AspNetCore.Http.HttpResults;
using ProjetoControleDeEstoque.Models.Context;
using ProjetoControleDeEstoque.Models.Entites;

namespace ProjetoControleDeEstoque.Services
{
    public class EmailService
    {
        private readonly AppDbContext _context;
        public EmailService(AppDbContext context)
        {
            _context = context;
        }

        public void EnviarEmail(Feedback model)
        {
            try
            {
                // E-mail que irá enviar para os administradores do sistema por padrão.
                var gmail = new Email("smtp.gmail.com", "desenvolvedoresprojetocontrole@gmail.com", "");

                gmail.SendEmail(
                emailsTo: new List<string>
                {
                    model.Email.ToString(),
                    "lscoutinho@sga.pucminas.br",
                    //"jcjunior@sga.pucminas.br",
                    //"thiago.souza.1138412@sga.pucminas.br",
                    //"ricardo.fonseca@sga.pucminas.br",
                    //"jadirdesousag@gmail.com",
                    //"diego.ruas@sga.pucminas.br"
                },
                subject: $"Feedback - E-mail: {model.Email}",
                body: $"<html><body>" +
                      $"<img src='cid:{Path.Combine(Environment.CurrentDirectory, @"img\ControleDeEstoqueLogo.jpg")}' />" +
                      $"<br/><br/>" +
                      $"<p>Segue o Feedback referente ao E-mail: {model.Email} - Identificador: {model.Id}</p>" +
                      $"<p>Feedback:</p>" +
                      $"<p>{model.FeedBackDescricao}</p>" +
                      $"</body></html>");
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar enviar o e-mail;");
            }
        }
    }
}
