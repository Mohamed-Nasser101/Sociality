using Domain.Identities;

namespace Domain.Entities;

public class RefreshToken
{
    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public string Token { get; set; }
    public DateTime Expires { get; set; } = DateTime.UtcNow.AddDays(7);
    public bool IsExpired => Expires <= DateTime.UtcNow;
    public DateTime? Revoked { get; set; }
    public bool IsActive => Revoked == null && !IsExpired;
}