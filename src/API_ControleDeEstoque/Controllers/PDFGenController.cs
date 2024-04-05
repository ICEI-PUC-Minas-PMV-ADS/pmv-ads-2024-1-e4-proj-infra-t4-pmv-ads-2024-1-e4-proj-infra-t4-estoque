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

        [HttpGet("Gerar/{id}")]
        public IActionResult GeneratePDF(string id)
        {
            try
            {
                Document document = new Document();
                string outputPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "output_pdf_file.pdf");
                PdfWriter writer = PdfWriter.GetInstance(document, new FileStream(outputPath, FileMode.Create));
                document.Open();

                BsonDocument documentData = _collection.Find(Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(id))).FirstOrDefault();

                if (documentData != null)
                {
                    string field1 = documentData.GetValue("_id").ToString();
                    string field2 = documentData.GetValue("Nome").AsString;
                    int field3 = documentData.GetValue("Quantidade").AsInt32;
                    decimal field4 = decimal.Parse(documentData.GetValue("Valor").ToString());
                    string field5 = documentData.GetValue("Localizacao").AsString;
                    string field6 = documentData.GetValue("CodigoProduto").AsString;
                    int field7 = documentData.GetValue("EstadoProduto").AsInt32;
                    int field8 = documentData.GetValue("Categoria").AsInt32;

                    document.Add(new Paragraph("---"));

                    Paragraph paragraph = new Paragraph($"_id: {field1}");
                    document.Add(paragraph);

                    paragraph = new Paragraph($"Nome: {field2}");
                    document.Add(paragraph);

                    paragraph = new Paragraph($"Quantidade: {field3}");
                    document.Add(paragraph);

                    paragraph = new Paragraph($"Valor: {field4}");
                    document.Add(paragraph);

                    paragraph = new Paragraph($"Localizacao: {field5}");
                    document.Add(paragraph);

                    paragraph = new Paragraph($"CodigoProduto: {field6}");
                    document.Add(paragraph);

                    paragraph = new Paragraph($"EstadoProduto: {field7}");
                    document.Add(paragraph);

                    paragraph = new Paragraph($"Categoria: {field8}");
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
