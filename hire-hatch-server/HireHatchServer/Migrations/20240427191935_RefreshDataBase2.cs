using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HireHatchServer.Migrations
{
    /// <inheritdoc />
    public partial class RefreshDataBase2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Jobs",
                newName: "JobType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JobType",
                table: "Jobs",
                newName: "Type");
        }
    }
}
