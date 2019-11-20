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
        [Route("api/user/getuserlist")]
        public async Task<IEnumerable<User>> GetUserList()
        {
            var email = GetUserEmail(User?.Claims);
            if (email != null)
            {
                var userList = await _userRepositoryService.GetAllUsersAsync();
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
            var email = GetUserEmail(User?.Claims);
            if (email != null)
            {
                var userList = await _userRepositoryService.GetAllUsersAsync();
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
        public async Task<User> GetCurrentUser(string email)
        {
            if (email != null && email == GetUserEmail(User?.Claims))
            {
                var userList = await _userRepositoryService.GetAllUsersAsync();
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

                    userList = await _userRepositoryService.GetAllUsersAsync();
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
        public async Task ActivateUser(int id)
        {
            var currentUserEmail = GetUserEmail(User?.Claims);
            if (currentUserEmail != null)
            {
                var userList = await _userRepositoryService.GetAllUsersAsync();
                var currentUser = userList.Where(u => u.email == currentUserEmail).SingleOrDefault();
                
                if (currentUser != null && currentUser.admin)
                {
                    var userWillUpdate = userList.Where(u => u.id == id).SingleOrDefault();
                    userWillUpdate.active = true;
                    await _userRepositoryService.UpdateUserAsync(id, userWillUpdate);
                }
            }
        }

        private string GetUserEmail(IEnumerable<Claim> claimsPrincinal)
        {
            var currentType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

            var email = claimsPrincinal.Where(c => c.Type == currentType).SingleOrDefault().Value;

            return email;
        }
    }
}
