using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Models
{
    public class Unit
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public string full_name { get; set; }
        public DateTime create_date { get; set; }
        public int create_user_id { get; set; }

    }
}
