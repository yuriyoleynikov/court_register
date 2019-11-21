using court_register.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public class DbContext
    {
        private readonly IMongoDatabase _database = null;
        public DbContext(IOptions<DatabaseSettings> databaseSettings)
        {
            var client = new MongoClient(databaseSettings.Value.ConnectionString);
            if (client != null)
            {
                _database = client.GetDatabase(databaseSettings.Value.DatabaseName);
            }            
        }

        public IMongoCollection<User> users
        {
            get
            {
                return _database.GetCollection<User>("users");
            }
        }

        public IMongoCollection<Unit> units
        {
            get
            {
                return _database.GetCollection<Unit>("units");
            }
        }
    }
}
