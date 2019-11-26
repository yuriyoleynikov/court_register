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

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            try
            {
                return await _context.users
                        .Find(user => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<User> GetUserAsync(int id)
        {
            try
            {
                return await _context.users
                                .Find(user => user.id == id)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddUserAsync(User user)
        {
            try
            {
                await _context.users.InsertOneAsync(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveUserAsync(int id)
        {
            try
            {
                DeleteResult actionResult
                = await _context.users.DeleteOneAsync(
                    Builders<User>.Filter.Eq("id", id));

                return actionResult.IsAcknowledged
                    && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateUserAsync(int id, User user)
        {
            try
            {
                ReplaceOneResult actionResult
                    = await _context.users
                                    .ReplaceOneAsync(u => u.id == id
                                            , user
                                            , new UpdateOptions { IsUpsert = true });
                return actionResult.IsAcknowledged
                    && actionResult.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> GetUserIdByEmailAsync(string email)
        {
            try
            {
                var userSystem = await _context.users
                                .Find(user => user.current.email == email)
                                .FirstOrDefaultAsync();
                if (userSystem == null)
                {
                    throw new Exception();
                }
                return userSystem.current.id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
