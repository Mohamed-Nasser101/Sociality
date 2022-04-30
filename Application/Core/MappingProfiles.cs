using Application.Activity;
using Application.Comments;
using Application.Profiles;
using Domain.Entities;
using Domain.Identities;
using Profile = AutoMapper.Profile;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string currentUsername = null;

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
            .ForMember(p => p.Image, opt => opt.MapFrom(a => a.Attendee.Photos.FirstOrDefault(q => q.IsMain).Url))
            .ForMember(x => x.FollowersCount, opt => opt.MapFrom(a => a.Attendee.Followers.Count))
            .ForMember(x => x.FollowingCount, opt => opt.MapFrom(a => a.Attendee.Followings.Count))
            .ForMember(x => x.Following,
                opt => opt.MapFrom(a => a.Attendee.Followers.Any(f => f.Observer.UserName == currentUsername)));

        CreateMap<AppUser, Profiles.Profile>()
            .ForMember(p => p.Image, opt => opt.MapFrom(a => a.Photos.FirstOrDefault(q => q.IsMain).Url))
            .ForMember(x => x.FollowersCount, opt => opt.MapFrom(a => a.Followers.Count))
            .ForMember(x => x.FollowingCount, opt => opt.MapFrom(a => a.Followings.Count))
            .ForMember(x => x.Following,
                opt => opt.MapFrom(a => a.Followers.Any(f => f.Observer.UserName == currentUsername)));

        CreateMap<Comment, CommentDto>()
            .ForMember(x => x.DisplayName,
                o => o.MapFrom(a => a.Author.DisplayName))
            .ForMember(x => x.Username,
                o => o.MapFrom(a => a.Author.UserName))
            .ForMember(p => p.Image, opt => opt.MapFrom(a => a.Author.Photos.FirstOrDefault(q => q.IsMain).Url));

        CreateMap<ActivityAttendee, UserActivityDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(x => x.Activity.Id))
            .ForMember(d => d.Title, opt => opt.MapFrom(x => x.Activity.Title))
            .ForMember(d => d.Category, opt => opt.MapFrom(x => x.Activity.Category))
            .ForMember(d => d.Date, opt => opt.MapFrom(x => x.Activity.Date));
    }
}