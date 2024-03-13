using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoControleDeEstoque.Migrations
{
    /// <inheritdoc />
    public partial class M05 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Anonimo",
                table: "Feedbacks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Anonimo",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
