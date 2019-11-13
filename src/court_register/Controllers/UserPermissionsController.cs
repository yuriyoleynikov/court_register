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
    public class UserPermissionsController : ControllerBase
    {
        private readonly UserService _userService;

        public UserPermissionsController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IDictionary<string, string> Get()
        {
            if (User?.Claims == null)
                return null;
            var temp = new Dictionary<string, string>(User.Claims.Select(c => new KeyValuePair<string, string>(c.Type, c.Value)));

            temp.TryGetValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress", out var email);
            if (email != null)
            {
                if (_userService.Get(email) == null)
                {
                    _userService.Create(new User { email = email, active = false, admin = false });
                }

                var user = _userService.Get(email);

                var d = new Dictionary<string, string>();

                d.Add(nameof(user.email), user.email);
                d.Add(nameof(user.active), user.active.ToString());
                d.Add(nameof(user.admin), user.admin.ToString());

                return d;
            }
            return null;
        }
    }
}
