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
        //private string _userExecutorEmail = null;
        public UserController(IUserRepositoryService userRepositoryService)
        {
            _userRepositoryService = userRepositoryService;
            //_userExecutorEmail = GetCurrentUserEmail();
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetUserListAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();
            var userList = await _userRepositoryService.GetUsersAsync(_userExecutorEmail);
            return userList;
        }

        [HttpGet]
        [Route("api/user/{userEmail}")]
        public async Task<UserSystem> GetUserByUserEmailAsync(string userEmail)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();
            var userSystem = await _userRepositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, userEmail);
            return userSystem;
        }

        [HttpGet]
        [Route("api/user")]
        public async Task<UserSystem> GetCurrentUserSystemAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();
            var userSystem = await _userRepositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail);
            return userSystem;
        }

        [HttpPut]
        [Route("api/user")]
        public async Task<bool> UpdateUserAsync([FromBody]User user)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var userSystemResult = await _userRepositoryService.UpdateUserSystemByUserEmailAsync(_userExecutorEmail, user);
            return userSystemResult;
        }

        [HttpPut]
        [Route("api/user/{userEmail}")]
        public async Task<bool> UpdateUserByUserEmailAsync(string userEmail, User user)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var userSystemResult = await _userRepositoryService.UpdateUserSystemByUserEmailAsync(_userExecutorEmail, userEmail, user);
            return userSystemResult;
        }

        [HttpGet]
        [Route("api/user/activate/{userEmail}")]
        public async Task<bool> ActivateUserByUserEmailAsync(string userEmail)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var user = (await _userRepositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, userEmail)).current;
            user.active = true;

            return await UpdateUserByUserEmailAsync(userEmail, user);
        }

        [HttpGet]
        [Route("api/user/deactivate/{userEmail}")]
        public async Task<bool> DeactivateUserByUserEmailAsync(string userEmail)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var user = (await _userRepositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, userEmail)).current;
            user.active = false;

            return await UpdateUserByUserEmailAsync(userEmail, user);
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
            throw new Exception();
        }
    }
}
