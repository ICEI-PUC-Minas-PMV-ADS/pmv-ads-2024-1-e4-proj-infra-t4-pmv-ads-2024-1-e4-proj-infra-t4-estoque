using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoControleDeEstoque.Migrations
{
    /// <inheritdoc />
    public partial class M07 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodigoProduto",
                table: "Produtos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodigoProduto",
                table: "Produtos");
        }
    }
}
