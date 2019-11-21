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
    public class UnitMongoDbRepository : IUnitRepositoryService
    {
        private readonly DbContext _context = null;

        public UnitMongoDbRepository(IOptions<DatabaseSettings> databaseSettings)
        {
            _context = new DbContext(databaseSettings);
        }

        public async Task<IEnumerable<Unit>> GetAllUnitsAsync()
        {
            try
            {
                return await _context.units
                        .Find(unit => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Unit> GetUnitAsync(int id)
        {
            try
            {
                return await _context.units
                                .Find(unit => unit.id == id)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddUnitAsync(Unit unit)
        {
            try
            {
                await _context.units.InsertOneAsync(unit);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RemoveUnitAsync(int id)
        {
            try
            {
                DeleteResult actionResult
                = await _context.units.DeleteOneAsync(
                    Builders<Unit>.Filter.Eq("id", id));

                return actionResult.IsAcknowledged
                    && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateUnitAsync(int id, Unit unit)
        {
            try
            {
                ReplaceOneResult actionResult
                    = await _context.units
                                    .ReplaceOneAsync(un => un.id == id
                                            , unit
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
