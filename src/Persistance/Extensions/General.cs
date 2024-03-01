using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace ITX.Persistance.Extensions
{
   
    public static class General
    {
        public static decimal xYuvarla(this object deger, byte precision = 2)
        {
            decimal dDeger = deger.xToDecimal();
            dDeger += (decimal)0.000001;
            return Math.Round(dDeger, precision);
        }
        public static decimal xToDecimal(this object deger)
        {
            decimal returnValue = 0;
            try
            {
                returnValue = Convert.ToDecimal(deger);
            }
            catch (Exception)
            {

                returnValue = 0;
            }
            return returnValue;
        }
        public static long xToLong(this object deger)
        {
            long returnValue = 0;
            try
            {
                returnValue = Convert.ToInt64(deger);
            }
            catch (Exception)
            {

                returnValue = 0;
            }
            return returnValue;
        }
        public static int xToInt(this object deger)
        {
            int returnValue = 0;
            try
            {
                returnValue = Convert.ToInt32(deger);
            }
            catch (Exception)
            {

                returnValue = 0;
            }
            return returnValue;
        }
        public static DateTime xToDateTime(this object deger)
        {
            DateTime returnValue;
            try
            {
                returnValue = Convert.ToDateTime(deger);
            }
            catch (Exception)
            {

                returnValue = DateTime.Now;
            }
            return returnValue;
        }
        public static  string isDateTime  (this object deger)
        {
            string returnValue;
            try
            {
                returnValue = DateTime.Parse(deger.ToString()).ToShortDateString();
            }
            catch (Exception)
            {

                returnValue = deger.ToString();
            }
            return returnValue;
        }
        public static byte xToByte(this object deger)
        {
            byte returnValue = 0;
            try
            {
                returnValue = Convert.ToByte(deger);
            }
            catch (Exception)
            {

                returnValue = 0;
            }
            return returnValue;
        }
        public static bool xToBool(this object deger)
        {
            bool returnValue = false;
            try
            {
                returnValue = Convert.ToBoolean(Convert.ToByte(deger));
            }
            catch (Exception)
            {

                returnValue = false;
            }
            return returnValue;
        }
        public static string xToString(this object deger)
        {
            string returnValue = "";
            try
            {
                returnValue = Convert.ToString(deger).Trim();
            }
            catch (Exception)
            {

                returnValue = "";
            }
            return returnValue;
        }
        public static T xCloneObject<T>(this T source)
        {
            var serialized = JsonConvert.SerializeObject(source);
            return JsonConvert.DeserializeObject<T>(serialized);

        }
        public static object xGetMemberValue(this object self, string name)
        {
            object result = null;

            PropertyInfo prop;
            string[] nameList = name.Split(".");
            if (name.Contains("."))
            { 
               self= self.xGetMemberValue(nameList[0]);
                if (nameList.Length>2)
                    self = self.xGetMemberValue(nameList[1]);
              
                name = nameList[nameList.Length-1];
            }
            var type = self.GetType();
            prop = type.GetProperty(name);
            var value = prop != null ? prop.GetValue(self) : null;
            result = value != null ? value  : null;
            return result;
        }

        public static void xSetMemberValue(this object self, string name, object value)
        {
            var type = self.GetType();
            var prop = type.GetProperty(name);
            prop.SetValue(self, value);

        }


        /* Bertan */


        public static string xGetDisplayName(this Enum enu)
        {
            var attr = xGetDisplayAttribute(enu);
            return attr != null ? attr.Name : enu.ToString();
        }

        private static DisplayAttribute xGetDisplayAttribute(object value)
        {
            Type type = value.GetType();
            if (!type.IsEnum)
            {
                throw new ArgumentException(string.Format("Type {0} is not an enum", type));
            }

            // Get the enum field.
            var field = type.GetField(value.ToString());
            return field == null ? null : field.GetCustomAttribute<DisplayAttribute>();
        }



        public static string xGetEnumDescription(this Enum enumValue)
        {
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            var descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : enumValue.ToString();
        }
        public static List<EnumModel> xGetEnumList(Type enumType)
        {
            var list = new List<EnumModel>();
            foreach (var e in Enum.GetValues(enumType))
            {
                list.Add(new EnumModel()
                {
                    Id = (int)e,
                    Value = ((Enum)e).xGetDisplayName()
                });
            }
            return list;
        }
        
        public static string MaskText(this string input, int maskSize, char maskChar)
        {
            if (string.IsNullOrEmpty(input))
            {
                return input;
            }

            if (maskSize >= input.Length)
            {
                return new string(char.ToUpper(maskChar), input.Length);
            }

            string unmasked = input.Substring(0, maskSize);
            string masked = new string(maskChar, input.Length - maskSize);
            return unmasked + masked;
        }

        public class EnumModel
        {
            public int Id { get; set; }
            public string Value { get; set; }
        }
    }
}
