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
        public async Task<User> GetUserAsync(string id)
        {
            try
            {
                ObjectId internalId = GetInternalId(id);
                return await _context.Users
                                .Find(user => user.id == id
                                        || user._id == internalId)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private ObjectId GetInternalId(string id)
        {
            ObjectId internalId;
            if (!ObjectId.TryParse(id, out internalId))
                internalId = ObjectId.Empty;

            return internalId;
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

        public async Task<bool> RemoveUserAsync(string id)
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

        public async Task<bool> UpdateUserAsync(string id, User user)
        {
            try
            {
                ReplaceOneResult actionResult
                    = await _context.Users
                                    .ReplaceOneAsync(u => u.Equals(id)
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
