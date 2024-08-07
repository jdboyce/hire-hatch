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
    [Migration("20240507010119_AddNewPropsToDatabase")]
    partial class AddNewPropsToDatabase
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

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DateApplied")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("FollowUpDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("JobType")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastUpdated")
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

                    b.HasKey("Id");

                    b.ToTable("Jobs");

                    b.HasData(
                        new
                        {
                            Id = "3107346e-69ca-4559-bf77-36ff01cfed22",
                            CompanyName = "Tech Innovations Inc.",
                            DateAdded = new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Local),
                            DateApplied = new DateTime(2024, 2, 16, 0, 0, 0, 0, DateTimeKind.Local),
                            FollowUpDate = new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Local),
                            JobTitle = "Frontend Developer",
                            JobType = "Full-time",
                            LastUpdated = new DateTime(2024, 2, 17, 0, 0, 0, 0, DateTimeKind.Local),
                            Location = "Remote",
                            Notes = "Angular-focused team. Values collaboration and continuous learning. Good work-life balance.",
                            PostingUrl = "<https://www.linkedin.com/jobs/12345>",
                            Priority = "High",
                            Salary = "$95,000",
                            Source = "LinkedIn",
                            Status = "Submitted Application"
                        });
                });

            modelBuilder.Entity("HireHatchServer.Models.JobType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("JobTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Full-time"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Contract"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Part-time"
                        });
                });

            modelBuilder.Entity("HireHatchServer.Models.Priority", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Priorities");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "High"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Medium"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Low"
                        });
                });

            modelBuilder.Entity("HireHatchServer.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Statuses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Reviewing Posting"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Not Interested"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Prepping Application"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Submitted Application"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Prepping Interview"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Interviewed"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Offer Received"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Declined"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Offer Accepted"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
