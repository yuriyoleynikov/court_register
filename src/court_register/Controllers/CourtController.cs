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
    public class CourtController : ControllerBase
    {
        private readonly IRepositoryService _repositoryService;

        public CourtController(IRepositoryService repositoryService)
        {
            _repositoryService = repositoryService;
        }

        [HttpPost]
        [Route("api/court")]
        public async Task<bool> AddCourtAsync([FromBody]Court court)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            await _repositoryService.AddCourtAsync(_userExecutorEmail, court);

            return true;
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
