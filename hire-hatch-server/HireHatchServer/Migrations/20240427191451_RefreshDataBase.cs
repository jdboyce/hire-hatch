using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HireHatchServer.Migrations
{
    /// <inheritdoc />
    public partial class RefreshDataBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "JobTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Full-time" },
                    { 2, "Contract" },
                    { 3, "Part-time" }
                });

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "Id", "CompanyName", "DateApplied", "FollowUpDate", "JobTitle", "Location", "Notes", "PostingUrl", "Priority", "Salary", "Source", "Status", "Type" },
                values: new object[,]
                {
                    { "3107346e-69ca-4559-bf77-36ff01cfed22", "Tech Innovations Inc.", new DateTime(2024, 2, 16, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Local), "Frontend Developer", "Remote", "Angular-focused team. Values collaboration and continuous learning. Good work-life balance.", "<https://www.linkedin.com/jobs/12345>", "High", "$95,000", "LinkedIn", "Submitted Application", "Full-time" },
                    { "a6e5e5a0-5c1d-4f6e-8e5f-7e7f8c6e9c7e", "Web Wizards Agency", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 2, 23, 20, 17, 38, 0, DateTimeKind.Local), "Angular Developer", "Remote", "Startup culture. Encourages candid dialogue. Flexible and remote. Great reviews.", "https://www.glassdoor.com/jobs/67890", "High", "$90,000", "Glassdoor", "Interviewed", "Full-time" },
                    { "b4c2b0a4-3d6e-4c1e-9b3e-8a7f6b5c4a3b", "Digital Solutions Ltd.", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 2, 19, 0, 0, 0, 0, DateTimeKind.Local), "Software Engineer", "Remote", "Dynamic culture with emphasis on agile development. Competitive benefits.", "https://www.indeed.com/jobs/54321", "Medium", "$85,000", "Indeed", "Offer Received", "Full-time" },
                    { "d9f3d0c2-7b6e-4b1e-9c3e-8d7f6c5e4d3d", "Creative Minds Co.", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Local), null, "Full Stack Developer", "Hybrid (Charlotte, NC)", ".NET Core and React in stack. Good salary. Offers annual tech conference tickets.", "https://www.webwizards.com/careers", "Medium", "$100,000", "Company Website", "Prepping Interview", "Contract" },
                    { "dfd1aced-c9b2-48cf-9029-789a9fe4d4de", "InnovateTech Solutions", null, null, "Lead Developer", "On-site (Charlotte, NC)", "Offers mentorship programs, supports professional development.", "https://www.careerbuilder.com/jobs/98765", "Low", "$40/hour", "CareerBuilder", "Reviewing Posting", "Part-time" }
                });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "High" },
                    { 2, "Medium" },
                    { 3, "Low" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Reviewing Posting" },
                    { 2, "Not Interested" },
                    { 3, "Prepping Application" },
                    { 4, "Submitted Application" },
                    { 5, "Prepping Interview" },
                    { 6, "Interviewed" },
                    { 7, "Offer Received" },
                    { 8, "Declined" },
                    { 9, "Offer Accepted" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobTypes");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: "3107346e-69ca-4559-bf77-36ff01cfed22");

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: "a6e5e5a0-5c1d-4f6e-8e5f-7e7f8c6e9c7e");

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: "b4c2b0a4-3d6e-4c1e-9b3e-8a7f6b5c4a3b");

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: "d9f3d0c2-7b6e-4b1e-9c3e-8d7f6c5e4d3d");

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: "dfd1aced-c9b2-48cf-9029-789a9fe4d4de");
        }
    }
}
