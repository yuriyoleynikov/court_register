using court_register.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>("users");
        }

        public List<User> Get() =>
            _users.Find(book => true).ToList();

        public User Get(string email) =>
            _users.Find<User>(book => book.email == email).FirstOrDefault();

        public User Create(User book)
        {
            _users.InsertOne(book);
            return book;
        }

        public void Update(string id, User bookIn) =>
            _users.ReplaceOne(book => book.id == id, bookIn);

        public void Remove(User bookIn) =>
            _users.DeleteOne(book => book.id == bookIn.id);

        public void Remove(string id) =>
            _users.DeleteOne(book => book.id == id);
    }
}
