using ITX.Application.ViewModels;
using Microsoft.AspNetCore.Html;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace ITX.Application.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDisplayName(this Enum enu)
        {
            var attr = GetDisplayAttribute(enu);
            return attr != null ? attr.Name : enu.ToString();
        }

        private static DisplayAttribute GetDisplayAttribute(object value)
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


        public static HtmlString GetDisplayName2(this Enum enumValue)
        {
            //return enumValue.GetType()
            //                .GetMember(enumValue.ToString())
            //                .FirstOrDefault()
            //                .GetCustomAttribute<DisplayAttribute>()
            //                .GetName();

            var member = enumValue.GetType().GetMember(enumValue.ToString());
            DisplayAttribute displayAttribute = (DisplayAttribute)member[0]
                .GetCustomAttributes(typeof(DisplayAttribute), false)
                .FirstOrDefault();

            if (displayAttribute != null)
            {
                return new HtmlString(displayAttribute.Name);
            }

            return new HtmlString(enumValue.ToString());
        }

        public static List<EnumViewModel> GetEnumList<T>()
        {
            var list = new List<EnumViewModel>();
            foreach (var e in Enum.GetValues(typeof(T)))
            {
                list.Add(new EnumViewModel()
                {
                    Id = (int)e,
                    Name = ((Enum)e).GetDisplayName()
                });
            }
            return list;
        }


    }

}