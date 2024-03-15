using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var modelDb = _context.Feedbacks.Add(model);
                    _context.SaveChanges();

                    _emailService.EnviarEmail(modelDb.Entity);

                    transaction.Commit();
                    return NoContent();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Ocorreu um erro ao tentar enviar o feedback! Por favor, tente novamente.");
                }
            }
        }
    }
}
