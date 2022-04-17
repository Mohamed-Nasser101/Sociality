using Domain.Entities;
using Domain.Identities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<ActivityAttendee>()
            .HasKey(a => new { a.ActivityId, a.AttendeeId });
        
        builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Attendee)
            .WithMany(b => b.Activities)
            .HasForeignKey(aa => aa.AttendeeId);
        
        builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(b => b.Attendees)
            .HasForeignKey(aa => aa.ActivityId);
    }

    public DbSet<Activity> Activities { get; set; }
    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public DbSet<Photo> Photos { get; set; }
}