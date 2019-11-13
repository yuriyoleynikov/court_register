using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Models
{
    public class User
    {
        public string id { get; set; }
        public string email { get; set; }
        public bool active { get; set; }
        public bool admin { get; set; }
    }
}
