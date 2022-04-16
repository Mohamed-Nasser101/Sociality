using Domain.Identities;

namespace Domain.Entities;

public class ActivityAttendee
{
    public AppUser Attendee { get; set; }
    public string AttendeeId { get; set; }
    public Activity Activity { get; set; }
    public Guid ActivityId { get; set; }
    public bool IsHost { get; set; }
}