﻿using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activity;

public class List
{
    public class Query : IRequest<Result<List<ActivityDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<List<ActivityDto>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var activities = await _context.Activities
                // .Include(x => x.Attendees)
                // .ThenInclude(a => a.Attendee)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() })
                .ToListAsync();
            return Result<List<ActivityDto>>.Success(activities);
        }
    }
}