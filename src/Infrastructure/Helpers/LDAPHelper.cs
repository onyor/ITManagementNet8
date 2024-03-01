using Ardalis.Result;
using ITX.Application;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.ActiveDirectory;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Helpers
{
    public static  class LDAPHelper
    {

        private static string DCLocator(string pDomainAd)
        {
            try
            {
                DirectoryContext mycontext = new DirectoryContext(DirectoryContextType.Domain, pDomainAd);
                DomainController dc = DomainController.FindOne(mycontext);
                IPAddress DCIPAdress = IPAddress.Parse(dc.IPAddress);
                return DCIPAdress.ToString();
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public static Result ADAuthenticate(string userName, string password)
        {
            //userName = userName.Contains("@") ? userName.Split("@")[0] : userName;
            string LdapDomain = ApplicationData.LDAPDomain;
            string LdapIp = ApplicationData.LDAPAddress;
            if (string.IsNullOrEmpty(LdapDomain))
                return Result.Error("Ldap Domain is Null");
            string domainInfo = DCLocator(LdapDomain);
            if (string.IsNullOrEmpty(domainInfo))
                domainInfo = LdapIp;
            userName = LdapDomain + @"\" + userName;
            try
            {
                DirectoryEntry entry = new DirectoryEntry("LDAP://" + domainInfo, userName, password);
                try
                {
                    var nativeObject = entry.NativeObject;
                    return Result.Success();
                }
                catch (Exception ex)
                {
                    return Result.Error("LDAP Kullanıcı Hatası :(" + userName + ")|" + ex.Message);
                }
            }
            catch (DirectoryServicesCOMException dex)
            {
                return Result.Error("Giriş Hatası:" + dex.Message);
            }
        }
    }
}
