using System.Threading.Tasks;
using HireHatchServer.Models;
using HireHatchServer.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace HireHatchServer.Tests
{
    [TestClass]
    public class AuthServiceTests
    {
        private AuthService CreateAuthServiceWithUser(User user)
        {
            var options = new DbContextOptionsBuilder<Data.JobContext>()
                .UseInMemoryDatabase(databaseName: "AuthTestDb_" + System.Guid.NewGuid())
                .Options;

            var context = new Data.JobContext(options);
            context.Users.Add(user);
            context.SaveChanges();

            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?>
                {
                    { "Jwt:Key", "testkeytestkeytestkeytestkeytestkey12" },
                    { "Jwt:Issuer", "TestIssuer" },
                    { "Jwt:Audience", "TestAudience" }
                })
                .Build();

            return new AuthService(context, config);
        }

        [TestMethod]
        public async Task LoginAsync_ReturnsAuthResponse_WhenCredentialsAreValid()
        {
            var password = "password123";
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
            };

            var service = CreateAuthServiceWithUser(user);

            var result = await service.LoginAsync(new LoginRequest { Email = user.Email, Password = password });

            Assert.IsNotNull(result);
            Assert.AreEqual(user.Email, result.Email);
            Assert.IsFalse(string.IsNullOrEmpty(result.Token));
        }

        [TestMethod]
        public async Task LoginAsync_ReturnsNull_WhenCredentialsAreInvalid()
        {
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
            };

            var service = CreateAuthServiceWithUser(user);

            var result = await service.LoginAsync(new LoginRequest { Email = user.Email, Password = "wrongpassword" });

            Assert.IsNull(result);
        }

        [TestMethod]
        public async Task GetUserByEmailAsync_ReturnsUser_WhenUserExists()
        {
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
            };

            var service = CreateAuthServiceWithUser(user);

            var result = await service.GetUserByEmailAsync(user.Email);

            Assert.IsNotNull(result);
            Assert.AreEqual(user.Email, result.Email);
        }

        [TestMethod]
        public async Task GetUserByEmailAsync_ReturnsNull_WhenUserDoesNotExist()
        {
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
            };

            var service = CreateAuthServiceWithUser(user);

            var result = await service.GetUserByEmailAsync("notfound@example.com");

            Assert.IsNull(result);
        }
    }
}
