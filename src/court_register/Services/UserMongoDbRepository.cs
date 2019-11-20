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

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            try
            {
                return await _context.Users
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
                return await _context.Users
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
                await _context.Users.InsertOneAsync(user);
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
                = await _context.Users.DeleteOneAsync(
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
                var currentUser = await _context.Users
                                .Find(user => user.id == id)
                                .FirstOrDefaultAsync();

                ReplaceOneResult actionResult
                    = await _context.Users
                                    .ReplaceOneAsync(u => u.Equals(currentUser._id)
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
    }
}
