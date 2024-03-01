namespace ITX.Application.Shared
{
    public class JwtConfiguration
    {
        public string SecretKey { get; set; }
        public string EncryptionKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int NotBeforeMinutes { get; set; }
        public int ExpirationMinutes { get; set; }
    }
}
