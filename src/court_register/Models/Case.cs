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
    public class CaseMove
    {
        public int round { get; set; }
        public string case_number { get; set; }
        public Court? court { get; set; }
        public Status? status { get; set; }
        public DateTime? date { get; set; }
        public IEnumerable<TextDocument> documents { get; set; }
    }
    public class TextDocument
    {
        public int num { get; set; }
        public string name { get; set; }
        public string text { get; set; }
    }
    public class Case
    {
        public int? version { get; set; }
        public int? _id { get; set; }
        public string reg_number { get; set; }
        public IEnumerable<CaseMove> case_move { get; set; }

        public TypeRoleCase type_role { get; set; }
        public Category category { get; set; }
        public Unit unit { get; set; }
        public Executor executor { get; set; }
        public Sides sides { get; set; }

        public bool? deleted { get; set; } = false;
        public Created created { get; set; }
    }
    public class Sides
    {
        public IEnumerable<Person> plaintiffs { get; set; }
        public IEnumerable<Person> defendants { get; set; }
        public IEnumerable<Person> third_sides { get; set; }
    }
    public class SettingsCase
    {
        public IEnumerable<Court> courts { get; set; }
        public IEnumerable<TypeRoleCase> type_roles { get; set; }
        public IEnumerable<Category> category { get; set; }
        public IEnumerable<Unit> units { get; set; }
        public IEnumerable<Executor> executors { get; set; }
        public IEnumerable<Status> statuses { get; set; }
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
        public int? _id { get; set; }
        public string? name { get; set; }
        public string? full_name { get; set; }
        public string? address { get; set; }
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
        public int _id { get; set; }
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
        public int _id { get; set; }
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
    public class CategorySystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public Category current { get; set; }
        public List<Category> changes { get; set; }
    }
    public class Category
    {
        public int version { get; set; }
        public int _id { get; set; }
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
    public class PersonSystem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public Person current { get; set; }
        public List<Person> changes { get; set; }
    }
    public class Person
    {
        public int? version { get; set; }
        public int? _id { get; set; }

        public string? _type { get; set; }
        public string? address { get; set; }
        public Individual individual { get; set; }
        public Entity entity { get; set; }        
        public Administration administration { get; set; }
        public bool? deleted { get; set; } = false;
        public Created created { get; set; }
    }
    public class Individual
    {
        public string? first_name { get; set; }
        public string? second_name { get; set; }
        public string? third_name { get; set; }
    }
    public class Entity
    {
        public string? inn { get; set; }
        public string? name { get; set; }
    }
    public class Administration
    {
        public string? name { get; set; }
    }
}
