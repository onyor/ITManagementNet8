using System.Text.Json;
using System;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Numerics;

namespace ITX.Infrastructure.Helpers
{
    public class Base62Converter
    {
        private static readonly string Base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        public static string Encode(string plainText)
        {
            StringBuilder stringBuilder = new StringBuilder();
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            BigInteger value = new BigInteger(bytes.Reverse().ToArray());

            while (value > 0)
            {
                stringBuilder.Insert(0, Base62Chars[(int)(value % 62)]);
                value /= 62;
            }

            return stringBuilder.ToString();
        }

        public static string Decode(string base62Encoded)
        {
            BigInteger value = 0;

            foreach (char c in base62Encoded)
            {
                value = value * 62 + Base62Chars.IndexOf(c);
            }

            byte[] bytes = value.ToByteArray().Reverse().ToArray();
            return System.Text.Encoding.UTF8.GetString(bytes);
        }
    }
}
