using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using court_register.Models;
using court_register.Services;
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
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public string Get()
        {
            GetClaims().TryGetValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress", out var email);
            if (email != null)
            {
                var user = _userService.Get(email);
                if (user != null)
                    return user.active.ToString();
            }
            return null;
        }

        IDictionary<string, string> GetClaims()
        {
            if (User?.Claims == null)
                return null;
            return new Dictionary<string, string>(User.Claims.Select(c => new KeyValuePair<string, string>(c.Type, c.Value)));
        }
    }
}
