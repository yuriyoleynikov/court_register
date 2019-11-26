using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using court_register.Models;
using court_register.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace court_register.Controllers
{
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepositoryService _userRepositoryService;
        public UserController(IUserRepositoryService userRepositoryService)
        {
            _userRepositoryService = userRepositoryService;
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetUserList()
        {
            var email = GetCurrentUserEmail();
            if (email != null)
            {
                var userList = await _userRepositoryService.GetUsersAsync();
                var currentUser = userList.Where(u => u.email == email & u.admin).SingleOrDefault();
                if (currentUser != null && currentUser.active && currentUser.admin)
                {
                    return userList;
                }
            }
            return null;
        }

        [HttpGet]
        [Route("api/user/getuser/{id}")]
        public async Task<User> GetUser(int id)
        {
            var email = GetCurrentUserEmail();
            if (email != null)
            {
                var userList = await _userRepositoryService.GetUsersAsync();
                var currentUser = userList.Where(u => u.email == email & u.admin).SingleOrDefault();
                if (currentUser != null && currentUser.active && currentUser.admin)
                {
                    var userWithId = userList.Where(u => u.id == id).SingleOrDefault();
                    return userWithId;
                }
            }
            return null;
        }

        [HttpGet]
        [Route("api/user/getcurrentuser/{email}")]
        public async Task<User> GetCurrentUser(string email)//api/user/profile  //api/admin/users/{id}/profilex
        {
            if (email != null && email == GetCurrentUserEmail())
            {
                var userList = await _userRepositoryService.GetUsersAsync();
                var currentUser = userList.Where(u => u.email == email).SingleOrDefault();
                if (currentUser == null)
                {
                    var lastId = userList.Select(u => u.id).Max();
                    await _userRepositoryService.AddUserAsync(
                        new User
                        {
                            email = email,
                            id = lastId + 1,
                            active = false,
                            admin = false
                        });

                    userList = await _userRepositoryService.GetUsersAsync();
                    currentUser = userList.Where(u => u.email == email).SingleOrDefault();
                }

                if (currentUser != null && currentUser.email == email)
                {
                    var userWithEmail = userList.Where(u => u.email == email).SingleOrDefault();
                    return userWithEmail;
                }
            }
            return null;
        }

        [HttpGet]
        [Route("api/user/activateuser/{id}")]
        public async Task<bool> ActivateUser(int id)
        {
            var currentUserEmail = GetCurrentUserEmail();
            if (currentUserEmail != null)
            {
                var userList = await _userRepositoryService.GetUsersAsync();
                var currentUser = userList.Where(u => u.email == currentUserEmail).SingleOrDefault();

                if (currentUser != null && currentUser.admin)
                {
                    var userWillUpdate = userList.Where(u => u.id == id).SingleOrDefault();
                    userWillUpdate.active = true;

                    var v = new User
                    {
                        id = userWillUpdate.id,
                        active = true,
                        admin = userWillUpdate.admin,
                        email = userWillUpdate.email
                    };

                    return await _userRepositoryService.UpdateUserAsync(id, userWillUpdate);
                }
            }

            return false;
        }

        private int GetCurrentUserId()
        {
            var email = GetCurrentUserEmail();

            var id = 0;

            

            return id;
        }

        private string GetCurrentUserEmail()
        {
            if (User != null)
            {
                var currentType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
                var email = User?.Claims.Where(c => c.Type == currentType).SingleOrDefault().Value;
                return email;
            }
            return null;
        }

        private async Task<bool> GetCurrentUserIsActiveAdmin()
        {
            var email = GetCurrentUserEmail();

            var userList = await _userRepositoryService.GetUsersAsync();
            var currentUser = userList.Where(u => u.email == email & u.admin).SingleOrDefault();
            if (currentUser != null && currentUser.active && currentUser.admin)
            {
                return userList;
            }

            return false;
        }
    }
}
