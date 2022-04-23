using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;

public class Create
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public string Body { get; set; }
        public Guid ActivityId { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.Body).NotEmpty();
        }
    }

    public class Handler : IRequestHandler<Command, Result<CommentDto>>
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

        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == request.ActivityId);
            if (activity is null) return null;

            var user = await _context.Users.Include(a => a.Photos)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
            if (user is null) return null;

            var comment = new Comment
            {
                Body = request.Body,
                Author = user,
                Activity = activity
            };
            _context.Comments.Add(comment);
            var result = await _context.SaveChangesAsync() > 0;
            return result
                ? Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment))
                : Result<CommentDto>.Failure("Error Add Comment");
        }
    }
}