using ITX.Application.Dtos.Identity;
using ITX.Application.Models;

namespace ITX.Application.Interfaces
{
    public interface IJwtService
    {
        string CreateToken(UserDto userDto);
        int GetMinutes { get; }
        RefreshToken GenerateRefreshToken();
    }
}
