using court_register.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public class UserMongoDbRepository : IUserRepositoryService
    {
        private readonly DbContext _context = null;
        public UserMongoDbRepository(IOptions<DatabaseSettings> databaseSettings)
        {
            _context = new DbContext(databaseSettings);
        }

        private async Task CheckCurrentUserIsExistAsync(string userExecutorEmail)
        {
            var userSystem = await _context.users.Find(uS => uS.current.email == userExecutorEmail).SingleOrDefaultAsync();

            if (userSystem != null)
                return;

            try
            {
                var userList = await _context.users
                            .Find(user => true).ToListAsync();

                var newUser = new UserSystem
                {
                    current = new User
                    {
                        active = false,
                        created = new Created { date = DateTime.Now },
                        email = userExecutorEmail,
                        version = 0,
                        permission = new Permission { admin = false }
                    }
                };

                await _context.users.InsertOneAsync(newUser);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return;
        }
        private async Task<bool> GetCurrentUserIsActiveAsync(string userExecutorEmail)
        {
            var userSystem = await _context.users.Find(uS => uS.current.email == userExecutorEmail).SingleOrDefaultAsync();
            return userSystem.current.active;
        }
        private async Task<bool> GetCurrentUserIsAdminAsync(string userExecutorEmail)
        {
            var userSystem = await _context.users.Find(uS => uS.current.email == userExecutorEmail).SingleOrDefaultAsync();
            return userSystem.current.permission.admin;
        }

        public async Task<IEnumerable<User>> GetUsersAsync(string userExecutorEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isAvtive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isAvtive)
                    return null;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!isAdmin)
                    return null;

                var userSystemList = await _context.users
                        .Find(userSystem => true).ToListAsync();

                var userList = userSystemList.Select(userSystem => userSystem.current);

                return userList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isAvtive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isAvtive)
                    return null;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!(isAdmin || userExecutorEmail == userEmail))
                    return null;

                var userSystem = await _context.users
                        .Find(userSystem => userSystem.current.email == userEmail).SingleOrDefaultAsync();

                return userSystem;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail, User user)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isAvtive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isAvtive)
                    return false;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!(isAdmin || userExecutorEmail == userEmail))
                    return false;

                var userSystem = await _context.users
                        .Find(userSystem => userSystem.current.email == userEmail).SingleOrDefaultAsync();

                var newChanges = userSystem.changes.ToList();
                newChanges.Add(userSystem.current);

                userSystem.changes = newChanges;
                var newVersion = userSystem.current.version + 1;
                userSystem.current = user;
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail, userEmail)).current;
                userSystem.current.created = new Created { date = DateTime.Now, user = userExecutor };
                userSystem.current.version = newVersion;

                ReplaceOneResult actionResult
                    = await _context.users
                                    .ReplaceOneAsync(u => u.current.email == userEmail
                                            , userSystem
                                            , new UpdateOptions { IsUpsert = true });
                return actionResult.IsAcknowledged
                    && actionResult.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
