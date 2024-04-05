using MongoDB.Bson;
using MongoDB.Driver;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;

namespace ProjetoControleDeEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFGenController : ControllerBase
    {
        private readonly IMongoCollection<BsonDocument> _collection;

        public PDFGenController(IMongoDatabase database)
        {
            _collection = database.GetCollection<BsonDocument>("Produtos");
        }

        [HttpGet("Gerar")]
        public IActionResult GeneratePDF()
        {
            try
            {
                Document document = new Document();
                string outputPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "output_pdf_file.pdf");
                PdfWriter writer = PdfWriter.GetInstance(document, new FileStream(outputPath, FileMode.Create));
                document.Open();
                List<BsonDocument> data = _collection.Find(new BsonDocument()).ToList();
                foreach (BsonDocument documentData in data)
                {
                    string field1 = documentData.GetValue("_id").ToString(); // Convert ObjectId to string
                    int field2 = documentData.GetValue("Quantidade").AsInt32;
                    Paragraph paragraph = new Paragraph($"Field1: {field1}, Field2: {field2}");
                    document.Add(paragraph);
                }

                document.Close();
                return File(new FileStream(outputPath, FileMode.Open), "application/pdf", "output_pdf_file.pdf");
            }
            catch (Exception ex)
            {
                return BadRequest($"Falha ao Gerar PDF: {ex.Message}");
            }
        }
    }
}
