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

        public IMongoCollection<UserSystem> users
        {
            get
            {
                return _database.GetCollection<UserSystem>("users");
            }
        }

        public IMongoCollection<UnitSystem> units
        {
            get
            {
                return _database.GetCollection<UnitSystem>("units");
            }
        }

        public IMongoCollection<CaseSystem> cases
        {
            get
            {
                return _database.GetCollection<CaseSystem>("cases");
            }
        }

        public IMongoCollection<CourtSystem> courts
        {
            get
            {
                return _database.GetCollection<CourtSystem>("courts");
            }
        }

        public IMongoCollection<TypeRoleCaseSystem> roles_in_case
        {
            get
            {
                return _database.GetCollection<TypeRoleCaseSystem>("role_in_case");
            }
        }

        public IMongoCollection<CategorySystem> category
        {
            get
            {
                return _database.GetCollection<CategorySystem>("category");
            }
        }

        public IMongoCollection<StatusSystem> statuses
        {
            get
            {
                return _database.GetCollection<StatusSystem>("statuses");
            }
        }
    }
}
