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
        builder.Entity<Comment>()
            .HasOne(c => c.Activity)
            .WithMany(a => a.Comments)
            .OnDelete(DeleteBehavior.Cascade);
        builder.Entity<UserFollowing>(e =>
        {
            e.HasKey(u => new { u.ObserverId, u.TargetId });

            e.HasOne(x => x.Observer)
                .WithMany(x => x.Followings)
                .HasForeignKey(x => x.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(x => x.Target)
                .WithMany(x => x.Followers)
                .HasForeignKey(x => x.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    public DbSet<Activity> Activities { get; set; }
    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<UserFollowing> UserFollowings { get; set; }
}