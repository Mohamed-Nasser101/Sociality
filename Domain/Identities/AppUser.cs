﻿using Microsoft.AspNetCore.Identity;

namespace Domain.Identities;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
}