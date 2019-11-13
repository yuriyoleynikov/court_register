using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using court_register.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace court_register.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController: ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            GetClaims().TryGetValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress", out var email);
            return email;
        }

        IDictionary<string, string> GetClaims()
        {
            if (User?.Claims == null)
                return null;
            return new Dictionary<string, string>(User.Claims.Select(c => new KeyValuePair<string, string>(c.Type, c.Value)));
        }
    }
}