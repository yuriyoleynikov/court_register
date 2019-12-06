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
    public class CaseController : ControllerBase
    {
        private readonly IRepositoryService _repositoryService;

        public CaseController(IRepositoryService repositoryService)
        {
            _repositoryService = repositoryService;
        }

        [HttpGet]
        [Route("api/cases")]
        public async Task<IEnumerable<Case>> GetCaseListAsync([FromQuery]string filter1, [FromQuery]string filter2)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var caseList = await _repositoryService.GetCasesAsync(_userExecutorEmail);
            return caseList;
        }

        [HttpGet]
        [Route("api/case/settings")]
        public async Task<SettingsCase> GetSettingsCaseAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var settingsCase = await _repositoryService.GetSettingsCaseAsync(_userExecutorEmail);
            return settingsCase;
        }

        [HttpPost]
        [Route("api/case")]
        public async Task<bool> AddCaseAsync([FromBody]Case @case)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            await _repositoryService.AddCaseAsync(_userExecutorEmail, @case);
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
