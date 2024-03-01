using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace ITX.WebMVC.Extensions
{
    public interface ISessionService
    {
        void SaveClaimsForUser(string userId, IEnumerable<Claim> claims);
        IEnumerable<string> GetUserIdsByRole(string role);
        string GetUserIdsByUser(string userId);
        void MarkUserForLogout(IEnumerable<string> userId);
        void MarkUserForLogout(string userId);
        bool ShouldLogout(string userId);
        bool ClearLogout(string userId);
    }

    public class SessionService : ISessionService
    {
        private readonly Dictionary<string, List<Claim>> _userClaims = new Dictionary<string, List<Claim>>();
        private readonly HashSet<string> _usersToLogout = new HashSet<string>();

        public void SaveClaimsForUser(string userId, IEnumerable<Claim> claims)
        {
            if (_userClaims.ContainsKey(userId))
            {
                _userClaims[userId].AddRange(claims);
            }
            else
            {
                _userClaims.Add(userId, new List<Claim>(claims));
            }
        }

        public IEnumerable<Claim> GetClaimsForUser(string userId)
        {
            if (_userClaims.TryGetValue(userId, out var claims))
            {
                return claims;
            }

            return Enumerable.Empty<Claim>();
        }

        public void MarkUserForLogout(IEnumerable<string> userIds)
        {
            foreach (var userId in userIds)
            {
                _usersToLogout.Add(userId);
            }
        }
        public void MarkUserForLogout(string userId)
        {
            _usersToLogout.Add(userId);
        }

        public bool ShouldLogout(string userId)
        {
            return _usersToLogout.Contains(userId);
        }

        public bool ClearLogout(string userId)
        {
            return _usersToLogout.Remove(userId);
        }

        public IEnumerable<string> GetUserIdsByRole(string role)
        {
            try
            {
                IEnumerable<string> userIds = _userClaims
                   .Where(kvp => kvp.Value.Any(claim => claim.Type == ClaimTypes.Role && claim.Value == role))
                   .Select(kvp => kvp.Key)
                   .ToList();

                MarkUserForLogout(userIds);
                return (IEnumerable<string>)userIds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetUserIdsByUser(string userId)
        {
            try
            {
                MarkUserForLogout(userId);
                return userId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
