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
        private readonly IUserRepositoryService _userRepositoryService;

        public UserPermissionsController(IUserRepositoryService userRepositoryService)
        {
            _userRepositoryService = userRepositoryService;
        }

        [HttpGet]
        public async Task<IDictionary<string, string>> Get()
        {
            if (User?.Claims == null)
                return null;
            var temp = new Dictionary<string, string>(User.Claims.Select(c => new KeyValuePair<string, string>(c.Type, c.Value)));

            temp.TryGetValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress", out var email);
            if (email != null)
            {
                var userList = await _userRepositoryService.GetAllUsersAsync();
                if (!userList.Where(u=>u.email == email).Any())
                {
                    await _userRepositoryService.AddUserAsync(new User { email = email, active = false, admin = false });
                }
                userList = await _userRepositoryService.GetAllUsersAsync();
                var user = userList.Where(u => u.email == email).SingleOrDefault();

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
