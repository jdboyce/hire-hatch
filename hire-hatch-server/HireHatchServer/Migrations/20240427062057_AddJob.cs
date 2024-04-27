using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HireHatchServer.Migrations
{
    /// <inheritdoc />
    public partial class AddJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "Id", "CompanyName", "DateApplied", "FollowUpDate", "JobTitle", "Location", "Notes", "PostingUrl", "Priority", "Salary", "Source", "Status", "Type" },
                values: new object[] { "3107346e-69ca-4559-bf77-36ff01cfed22", "Tech Innovations Inc.", new DateTime(2024, 2, 16, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Local), "Frontend Developer", "Remote", "Angular-focused team. Values collaboration and continuous learning. Good work-life balance.", "https://www.linkedin.com/jobs/12345", "High", "$95,000", "LinkedIn", "Submitted Application", "Full-time" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: "3107346e-69ca-4559-bf77-36ff01cfed22");
        }
    }
}
