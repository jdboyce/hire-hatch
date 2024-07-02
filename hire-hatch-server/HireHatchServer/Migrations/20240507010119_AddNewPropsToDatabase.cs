using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HireHatchServer.Migrations
{
    /// <inheritdoc />
    public partial class AddNewPropsToDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<DateTime>(
                name: "DateAdded",
                table: "Jobs",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Jobs",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: "3107346e-69ca-4559-bf77-36ff01cfed22",
                columns: new[] { "DateAdded", "LastUpdated" },
                values: new object[] { new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 2, 17, 0, 0, 0, 0, DateTimeKind.Local) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateAdded",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Jobs");

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "Id", "CompanyName", "DateApplied", "FollowUpDate", "JobTitle", "JobType", "Location", "Notes", "PostingUrl", "Priority", "Salary", "Source", "Status" },
                values: new object[,]
                {
                    { "a6e5e5a0-5c1d-4f6e-8e5f-7e7f8c6e9c7e", "Web Wizards Agency", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 2, 23, 20, 17, 38, 0, DateTimeKind.Local), "Angular Developer", "Full-time", "Remote", "Startup culture. Encourages candid dialogue. Flexible and remote. Great reviews.", "https://www.glassdoor.com/jobs/67890", "High", "$90,000", "Glassdoor", "Interviewed" },
                    { "b4c2b0a4-3d6e-4c1e-9b3e-8a7f6b5c4a3b", "Digital Solutions Ltd.", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 2, 19, 0, 0, 0, 0, DateTimeKind.Local), "Software Engineer", "Full-time", "Remote", "Dynamic culture with emphasis on agile development. Competitive benefits.", "https://www.indeed.com/jobs/54321", "Medium", "$85,000", "Indeed", "Offer Received" },
                    { "d9f3d0c2-7b6e-4b1e-9c3e-8d7f6c5e4d3d", "Creative Minds Co.", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Local), null, "Full Stack Developer", "Contract", "Hybrid (Charlotte, NC)", ".NET Core and React in stack. Good salary. Offers annual tech conference tickets.", "https://www.webwizards.com/careers", "Medium", "$100,000", "Company Website", "Prepping Interview" },
                    { "dfd1aced-c9b2-48cf-9029-789a9fe4d4de", "InnovateTech Solutions", null, null, "Lead Developer", "Part-time", "On-site (Charlotte, NC)", "Offers mentorship programs, supports professional development.", "https://www.careerbuilder.com/jobs/98765", "Low", "$40/hour", "CareerBuilder", "Reviewing Posting" }
                });
        }
    }
}
