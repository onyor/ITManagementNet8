using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

public class DecryptAttribute : ActionFilterAttribute
{
    private readonly string _secretKey;

    // IConfiguration yerine direkt olarak SecretKey'i constructor üzerinden almak
    public DecryptAttribute(string secretKey)
    {
        _secretKey = secretKey;
    }

   public override void OnActionExecuting(ActionExecutingContext context)
    {
        var queryString = context.HttpContext.Request.QueryString.Value;
        if (!string.IsNullOrEmpty(queryString))
        {
            queryString = queryString.StartsWith("?") ? queryString.Substring(1) : queryString;
            var decryptedValue = Decrypt(queryString); // Şifre çözme işlemi burada yapılır
            if (decryptedValue.Count > 0)
            {
                context.HttpContext.Items["DecryptedValue"] = decryptedValue;
            }
        }
        base.OnActionExecuting(context);
    }

    private Dictionary<string, string> Decrypt(string encryptedValue)
    {
        var result = new Dictionary<string, string>();
        byte[] keyBytes = Encoding.UTF8.GetBytes(_secretKey);

        // Önce & ile ayır
        var pairs = encryptedValue.Split('&');
        foreach (var pair in pairs)
        {
            // Her çifti ~ ile ayır
            var splitPair = pair.Split('~');
            if (splitPair.Length == 2)
            {
                var key = splitPair[0];
                var value = splitPair[1];

                var encryptedKeyBytes = Convert.FromBase64String(key);
                var decryptedKey = DecryptStringFromBytes(encryptedKeyBytes, keyBytes);

                var encryptedValueBytes = Convert.FromBase64String(value);
                var decryptedValue = DecryptStringFromBytes(encryptedValueBytes, keyBytes);

                result.Add(decryptedKey, decryptedValue);
            }
        }

        return result;
    }

    private string DecryptStringFromBytes(byte[] cipherText, byte[] key)
    {
        // Check arguments.
        if (cipherText == null || cipherText.Length <= 0)
        {
            throw new ArgumentNullException("cipherText");
        }
        if (key == null || key.Length <= 0)
        {
            throw new ArgumentNullException("key");
        }
        // Declare the string used to hold
        // the decrypted text.
        string plaintext = null;
        // Create an RijndaelManaged object
        // with the specified key and IV.
        using (var rijAlg = new RijndaelManaged())
        {
            //Settings
            rijAlg.Mode = CipherMode.ECB;
            rijAlg.Padding = PaddingMode.PKCS7;
            rijAlg.Key = key;
            // Create a decrytor to perform the stream transform.
            var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);
            try
            {
                // Create the streams used for decryption.
                using (var msDecrypt = new MemoryStream(cipherText))
                {
                    using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (var srDecrypt = new StreamReader(csDecrypt))
                        {
                            plaintext = srDecrypt.ReadToEnd();
                        }
                    }
                }
            }
            catch
            {
                plaintext = "keyError";
            }
        }
        return plaintext;
    }
}
