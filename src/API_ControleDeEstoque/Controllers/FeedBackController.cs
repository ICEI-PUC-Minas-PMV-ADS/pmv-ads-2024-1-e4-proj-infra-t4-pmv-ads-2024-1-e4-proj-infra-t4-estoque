using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;

namespace ProjetoControleDeEstoque.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly FeedBackService _feedBackService;
        private readonly EmailService _emailService;
        private readonly IMongoCollection<Feedback> _feedbacksCollection;

        public FeedBackController(FeedBackService feedBackService, EmailService emailService, IMongoDatabase database)
        {
            _feedBackService = feedBackService;
            _emailService = emailService;
            _feedbacksCollection = database.GetCollection<Feedback>("Feedback");
        }

        [HttpPost("EnviarFeedBack")]
        public ActionResult EnviarFeedBackPorEmailESalvar(Feedback model)
        {
            try
            {
                using (var session = _feedbacksCollection.Database.Client.StartSession())
                {
                    try
                    {
                        session.StartTransaction();

                        _feedBackService.CreateFeedBack(model);
                        _emailService.EnviarEmail(model);

                        session.CommitTransaction();
                        return NoContent();
                    }
                    catch (Exception)
                    {
                        session.AbortTransaction();
                        throw new Exception("Ocorreu um erro ao tentar realizar a transação! Por favor, tente novamente.");
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception("Ocorreu um erro ao tentar enviar o feedback! Por favor, tente novamente.");
            }
        }
    }
}
