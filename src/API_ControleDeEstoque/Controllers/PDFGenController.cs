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

        [HttpGet("usuarioId")]
        public IActionResult GeneratePDF(string usuarioId)
        {
            try
            {
                Document document = new Document();
                string outputPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), $"Relatório de Inventário.pdf");
                PdfWriter writer = PdfWriter.GetInstance(document, new FileStream(outputPath, FileMode.Create));
                document.Open();

                var filter = Builders<BsonDocument>.Filter.Eq("UsuarioId", ObjectId.Parse(usuarioId));
                var documents = _collection.Find(filter).ToList();

                foreach (var documentData in documents)
                {
                    string field1 = documentData.GetValue("_id").ToString();
                    string field2 = documentData.GetValue("Nome").AsString;
                    int field3 = documentData.GetValue("Quantidade").AsInt32;
                    decimal field4 = decimal.Parse(documentData.GetValue("Valor").ToString());
                    string field5 = documentData.GetValue("Localizacao").AsString;
                    string field6 = documentData.GetValue("CodigoProduto").AsString;
                    int field7 = documentData.GetValue("EstadoProduto").AsInt32;
                    int field8 = documentData.GetValue("Categoria").AsInt32;
                    DateTime field9 = DateTime.Now;
                    Paragraph paragraph9 = new Paragraph($"DataDeCriacao: {field9}");
                    document.Add(paragraph9);

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

                    paragraph = new Paragraph($"Data de Entrada: {field9}");
                    document.Add(paragraph);
                }
                document.Close();
                string fileName = $"Relatório de Inventário_ {DateTime.Now.ToString("yyyy/MM/dd")}.pdf";
                return File(new FileStream(outputPath, FileMode.Open), "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return BadRequest($"Falha ao Gerar PDF. {ex.Message}");
            }
        }
    }
}
