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
                    "jcjunior@sga.pucminas.br",
                    "thiago.souza.1138412@sga.pucminas.br",
                    "ricardo.fonseca@sga.pucminas.br",
                    "jadirdesousag@gmail.com",
                    "diego.ruas@sga.pucminas.br"
                },
                subject: $"Feedback - E-mail: {model.Email} - Protocolo: {model.Id}",
                body: $@"<html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                        }}
                        .container {{
                            border: 1px solid #ccc;
                            padding: 20px;
                        }}
                        .title {{
                            font-size: 20px;
                            color: #333;
                        }}
                        .subtitle {{
                            font-size: 18px;
                            color: #666;
                        }}
                        .content {{
                            font-size: 16px;
                            color: #666;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <img src='img/ControleDeEstoqueLogo.jpg' /><br/>
                        <br/><br/>
                        <p class='title'>Segue o feedback referente ao E-mail: {model.Email} - Protocolo: {model.Id}</p>
                        <p class='subtitle'>Feedback:</p>
                        <p class='content'>{model.FeedBackDescricao}</p>
                    </div>
                </body>
                </html>");
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar enviar o e-mail;");
            }
        }
    }
}
