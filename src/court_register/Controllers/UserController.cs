using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using court_register.Models;
using court_register.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace court_register.Controllers
{
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepositoryService _userRepositoryService;
        private string _userExecutorEmail = null;
        public UserController(IUserRepositoryService userRepositoryService)
        {
            _userRepositoryService = userRepositoryService;
            _userExecutorEmail = GetCurrentUserEmail();
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetUserListAsync()
        {
            var userList = await _userRepositoryService.GetUsersAsync(_userExecutorEmail);            
            return userList;
        }

        [HttpGet]
        [Route("api/user/{userEmail}")]
        public async Task<UserSystem> GetUserByUserEmailAsync(string userEmail)
        {
            var userSystem = await _userRepositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, userEmail);
            return userSystem;
        }

        [HttpGet]
        [Route("api/user")]
        public async Task<UserSystem> GetCurrentUserSystemAsync()
        {
            var userSystem = await _userRepositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, _userExecutorEmail);
            return userSystem;
        }

        //[HttpGet]
        //[Route("api/user/activateuser/{id}")]
        //public async Task<bool> ActivateUser(int id)
        //{
        //    var currentUserEmail = GetCurrentUserEmail();
        //    if (currentUserEmail != null)
        //    {
        //        var userList = await _userRepositoryService.GetUsersAsync();
        //        var currentUser = userList.Where(u => u.email == currentUserEmail).SingleOrDefault();

        //        if (currentUser != null && currentUser.admin)
        //        {
        //            var userWillUpdate = userList.Where(u => u.id == id).SingleOrDefault();
        //            userWillUpdate.active = true;

        //            var v = new User
        //            {
        //                id = userWillUpdate.id,
        //                active = true,
        //                admin = userWillUpdate.admin,
        //                email = userWillUpdate.email
        //            };

        //            return await _userRepositoryService.UpdateUserAsync(id, userWillUpdate);
        //        }
        //    }

        //    return false;
        //}

        private string GetCurrentUserEmail()
        {
            if (User != null)
            {
                var currentType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
                var email = User?.Claims.Where(c => c.Type == currentType).SingleOrDefault().Value;
                return email;
            }

            throw new Exception();
        }
    }
}
