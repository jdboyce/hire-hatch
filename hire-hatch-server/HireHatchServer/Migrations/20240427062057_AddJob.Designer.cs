﻿// <auto-generated />
using System;
using HireHatchServer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HireHatchServer.Migrations
{
    [DbContext(typeof(JobContext))]
    [Migration("20240427062057_AddJob")]
    partial class AddJob
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("HireHatchServer.Models.Job", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DateApplied")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("FollowUpDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Location")
                        .HasColumnType("TEXT");

                    b.Property<string>("Notes")
                        .HasColumnType("TEXT");

                    b.Property<string>("PostingUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Priority")
                        .HasColumnType("TEXT");

                    b.Property<string>("Salary")
                        .HasColumnType("TEXT");

                    b.Property<string>("Source")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Jobs");

                    b.HasData(
                        new
                        {
                            Id = "3107346e-69ca-4559-bf77-36ff01cfed22",
                            CompanyName = "Tech Innovations Inc.",
                            DateApplied = new DateTime(2024, 2, 16, 0, 0, 0, 0, DateTimeKind.Local),
                            FollowUpDate = new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Local),
                            JobTitle = "Frontend Developer",
                            Location = "Remote",
                            Notes = "Angular-focused team. Values collaboration and continuous learning. Good work-life balance.",
                            PostingUrl = "https://www.linkedin.com/jobs/12345",
                            Priority = "High",
                            Salary = "$95,000",
                            Source = "LinkedIn",
                            Status = "Submitted Application",
                            Type = "Full-time"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
