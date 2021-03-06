﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace court_register.Models
{
    public class UserSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public User current { get; set; }
        public IEnumerable<User> changes { get; set; }
    }
    public class User
    {
        public int version { get; set; }
        public int _id { get; set; }
        public string email { get; set; }

        public string first_name { get; set; }
        public string second_name { get; set; }
        public string third_name { get; set; }

        public bool active { get; set; }
        public Permission permission { get; set; }
        public Created created { get; set; }
    }
    public class Permission
    {
        public bool admin { get; set; } = false;
        public List<Role> roles { get; set; }
    }
    public class Role
    {
        public string test_fild { get; set; }
    }
    public class Created
    {
        public UserInfo userInfo { get; set; }
        public DateTime date { get; set; }
    }

    public class UserInfo
    {
        public int version { get; set; }
        public int _id { get; set; }
        public string email { get; set; }

        public string first_name { get; set; }
        public string second_name { get; set; }
        public string third_name { get; set; }

        public Permission permission { get; set; }
    }
}
