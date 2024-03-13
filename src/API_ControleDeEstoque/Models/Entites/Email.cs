using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace ProjetoControleDeEstoque.Models.Entites
{
    public class Email
    {
        public string Provedor { get; private set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public Email(string provedor, string username, string password)
        {
            Provedor = provedor ?? throw new ArgumentNullException(nameof(provedor));
            Username = username ?? throw new ArgumentNullException(nameof(username));
            Password = password ?? throw new ArgumentNullException(nameof(password));
        }

        public void SendEmail(List<string> emailsTo, string subject, string body)
        {
            var message = PrepareteMessage(emailsTo, subject, body);
            SendEmailBySmtp(message);
        }

        // Preparando a mensagem, sendo o assunto, a lista de emails, pra onder enviar.
        private MailMessage PrepareteMessage(List<string> emailsTo, string subject, string body)
        {
            var mail = new MailMessage();
            mail.From = new MailAddress(Username);

            foreach (var email in emailsTo)
            {
                if (ValidacaoEmail(email))
                {
                    mail.To.Add(email);
                }
            }
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            return mail;
        }

        // Método para validar se o e-mail passado está de acordo com o padrão "empresa@empresa.com.br"
        private bool ValidacaoEmail(string email)
        {
            Regex expression = new Regex(@"\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}");
            if (expression.IsMatch(email))
                return true;

            return false;
        }

        private void SendEmailBySmtp(MailMessage message)
        {
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Host = Provedor;
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(Username, Password);
            smtpClient.Timeout = 10000;
            smtpClient.Send(message);
            smtpClient.Dispose();
        }
    }
}
