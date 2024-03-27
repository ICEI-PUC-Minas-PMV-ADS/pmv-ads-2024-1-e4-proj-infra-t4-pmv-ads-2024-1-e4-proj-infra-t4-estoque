using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ProjetoControleDeEstoque.Models.Entites;
using ProjetoControleDeEstoque.Services;
using System;

namespace ProjetoControleDeEstoque.Controllers
{
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
                    catch (Exception ex)
                    {
                        session.AbortTransaction();
                        throw new Exception("Ocorreu um erro ao tentar realizar a transação! Por favor, tente novamente.", ex);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao tentar enviar o feedback! Por favor, tente novamente.");
            }
        }
    }
}
