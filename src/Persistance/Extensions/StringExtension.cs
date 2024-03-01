using Newtonsoft.Json.Serialization;
using System.Text;

namespace ITX.Persistance.Extensions
{
    public static class StringExtension
    {

        public static string? ToSnakeCase(this string? str) => str is null
         ? null
         : new DefaultContractResolver() { NamingStrategy = new SnakeCaseNamingStrategy() }.GetResolvedPropertyName(str);

        private static readonly Dictionary<char, char> TurkishCharMapping = new Dictionary<char, char>
        {
            { 'Ç', 'ç' },
            { 'Ğ', 'ğ' },
            { 'İ', 'i' },
            { 'Ö', 'ö' },
            { 'Ş', 'ş' },
            { 'Ü', 'ü' },
            { 'I', 'ı' }
        };

        public static string ToLowerWithCustomization(this string input)
        {
            if (input == null) throw new ArgumentNullException(nameof(input));

            StringBuilder result = new StringBuilder(input.Length);

            foreach (char c in input)
            {
                if (TurkishCharMapping.TryGetValue(c, out char lowerChar))
                {
                    result.Append(lowerChar);
                }
                else
                {
                    result.Append(char.ToLowerInvariant(c));
                }
            }

            return result.ToString();
        }

        public static string NormalizeTurkishCharacters(string input)
        {
            var replacements = new Dictionary<char, char>
            {
                { 'İ', 'i' },
                { 'I', 'ı' },
                { 'Ç', 'C' },
                { 'ç', 'c' },
                { 'Ş', 'S' },
                { 'ş', 's' },
                { 'Ğ', 'G' },
                { 'ğ', 'g' },
                { 'Ü', 'U' },
                { 'ü', 'u' },
                { 'Ö', 'O' },
                { 'ö', 'o' }
            };

            var result = new StringBuilder(input.Length);
            foreach (var c in input)
            {
                result.Append(replacements.TryGetValue(c, out var replacement) ? replacement : c);
            }

            return result.ToString();
        }



    }
}
