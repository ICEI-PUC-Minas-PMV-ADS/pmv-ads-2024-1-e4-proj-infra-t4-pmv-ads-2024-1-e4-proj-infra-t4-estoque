using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoControleDeEstoque.Models.Context;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService;
        public FeedBackController(AppDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // Método para enviar e-mail e salvar no banco os dados referentes ao FEEDBACK.
        [HttpPost("EnviarFeedBack")]
        public ActionResult EnviarFeedBackPorEmailESalvar(Feedback model)
        {
            try
            {
                var modelDb = _context.Feedbacks.Add(model);
                _emailService.EnviarEmail(modelDb.Entity);

                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar enviar o feedback. Tente novamente!");
            }
            return NoContent();
        }
    }
}
