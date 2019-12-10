using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace court_register.Models
{
    public class CaseSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public Case current { get; set; }
        public IEnumerable<Case> changes { get; set; }
    }
    public class Case
    {
        public int? version { get; set; }
        public int? _id { get; set; }
        public string? reg_number { get; set; }
        public string? case_number { get; set; }
        public Court court { get; set; }
        public TypeRoleCase type_role_case { get; set; }
        public CaseCategory case_category { get; set; }
        public Unit unit { get; set; }
        public Executor executor { get; set; }
        public List<Status> state { get; set; }
        
        public bool? deleted { get; set; } = false;
        public Created created { get; set; }
    }
    public class SettingsCase
    {
        public IEnumerable<Court>  courts { get; set; }
        //public TypeRoleCase type_role_case { get; set; }
        //public CaseCategory case_category { get; set; }
        public IEnumerable<Unit> units { get; set; }
        //public ExecutorSystem executor { get; set; }
        //public List<StatusSystem> state { get; set; }
    }
    public class CourtSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public Court current { get; set; }
        public List<Court> changes { get; set; }
    }
    public class Court
    {
        public int? version { get; set; }
        public int? id { get; set; }
        public string? name { get; set; }
        public string? full_name { get; set; }
        public string? adress { get; set; }
        public bool? deleted { get; set; } = false;
        public Created created { get; set; }
    }
    public class TypeRoleCaseSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public TypeRoleCase current { get; set; }
        public List<TypeRoleCase> changes { get; set; }
    }
    public class TypeRoleCase
    {
        public int version { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public string full_name { get; set; }
        public bool deleted { get; set; } = false;
        public Created created { get; set; }
    }
    public class ExecutorSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public Executor current { get; set; }
        public List<Executor> changes { get; set; }
    }
    public class Executor
    {
        public int version { get; set; }
        public int id { get; set; }
        public string first_name { get; set; }
        public string second_name { get; set; }
        public string third_name { get; set; }
        public string full_name
        {
            get
            {
                var name1 = !String.IsNullOrEmpty(first_name) ? $" {first_name.First()}." : "";
                var name2 = !String.IsNullOrEmpty(second_name) ? second_name : "";
                var name3 = !String.IsNullOrEmpty(third_name) ? $" {third_name.First()}." : "";

                return name2 + name1 + name3;
            }
        }
        public bool deleted { get; set; } = false;
        public Created created { get; set; }
    }
    public class CaseCategorySystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public CaseCategory current { get; set; }
        public List<CaseCategory> changes { get; set; }
    }
    public class CaseCategory
    {
        public int version { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public string full_name { get; set; }
        public bool deleted { get; set; } = false;
        public Created created { get; set; }

    }
    public class StatusSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public Status current { get; set; }
        public List<Status> changes { get; set; }
    }
    public class Status
    {
        public int version { get; set; }
        public int _id { get; set; }
        public string name { get; set; }
        public string short_sign { get; set; }
        public bool deleted { get; set; } = false;
        public Created created { get; set; }

    }    
    public class UnitSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public Unit current { get; set; }
        public List<Unit> changes { get; set; }
    }
    public class Unit
    {
        public int? version { get; set; }
        public int? _id { get; set; }
        public string? name { get; set; }
        public string? full_name { get; set; }
        public bool? deleted { get; set; } = false;
        public Created created { get; set; }
    }
}
