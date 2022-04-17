using Application.Activity;
using AutoMapper;
using Domain.Entities;
using Domain.Identities;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Domain.Entities.Activity, Domain.Entities.Activity>();

        CreateMap<Domain.Entities.Activity, ActivityDto>()
            .ForMember(x => x.HostUsername,
                o => o.MapFrom(a => a.Attendees
                    .FirstOrDefault(q => q.IsHost).Attendee.UserName));

        CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(x => x.DisplayName,
                o => o.MapFrom(a => a.Attendee.DisplayName))
            .ForMember(x => x.Username,
                o => o.MapFrom(a => a.Attendee.UserName))
            .ForMember(x => x.Bio,
                o => o.MapFrom(a => a.Attendee.Bio))
            .ForMember(p => p.Image, opt => opt.MapFrom(a => a.Attendee.Photos.FirstOrDefault(q => q.IsMain).Url));

        CreateMap<AppUser, Profiles.Profile>()
            .ForMember(p => p.Image, opt => opt.MapFrom(a => a.Photos.FirstOrDefault(q => q.IsMain).Url));
    }
}