﻿using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Domain.Identities;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public ICollection<ActivityAttendee> Activities { get; set; } = new List<ActivityAttendee>();
}