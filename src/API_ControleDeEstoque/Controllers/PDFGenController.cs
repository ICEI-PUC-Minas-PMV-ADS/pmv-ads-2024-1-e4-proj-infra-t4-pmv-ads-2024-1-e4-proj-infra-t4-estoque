using MongoDB.Bson;
using MongoDB.Driver;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

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
        public async Task<IActionResult> GeneratePDF(string usuarioId)
        {
            try
            {
                var filter = Builders<BsonDocument>.Filter.Eq("UsuarioId", usuarioId);
                var documents = await _collection.Find(filter).ToListAsync();

                if (documents.Count == 0)
                {
                    return BadRequest("Não foi possível gerar o PDF, nenhum documento encontrado para este usuário.");
                }

                MemoryStream memoryStream = new();
                Document document = new();
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);
                writer.CloseStream = false;
                document.Open();

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
                    DateTime field9 = documentData.GetValue("DataDeCriacao").ToUniversalTime();

                    Paragraph paragraph = new($"_id: {field1}");
                    document.Add(paragraph);

                    paragraph = new($"Nome: {field2}");
                    document.Add(paragraph);

                    paragraph = new($"Quantidade: {field3}");
                    document.Add(paragraph);

                    paragraph = new($"Valor: {field4:C}");
                    document.Add(paragraph);

                    paragraph = new($"Localizacao: {field5}");
                    document.Add(paragraph);

                    paragraph = new($"CodigoProduto: {field6}");
                    document.Add(paragraph);

                    paragraph = new($"EstadoProduto: {field7}");
                    document.Add(paragraph);

                    paragraph = new($"Categoria: {field8}");
                    document.Add(paragraph);

                    paragraph = new($"Data de Entrada: {field9:dd-MM-yyyy HH:mm}");
                    document.Add(paragraph);

                    document.Add(new Chunk("\n"));
                }

                document.Close();
                memoryStream.Position = 0;
                string fileName = $"Relatório de Inventário_{DateTime.Now:yyyy-MM-dd_HH-mm-ss}.pdf";

                return File(memoryStream, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return BadRequest($"Falha ao gerar o PDF: {ex.Message}");
            }
        }
    }
}
