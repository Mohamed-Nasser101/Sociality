using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activity;

public class List
{
    public class Query : IRequest<List<Domain.Entities.Activity>>
    {
    }
    public class Handler : IRequestHandler<Query, List<Domain.Entities.Activity>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Domain.Entities.Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities.ToListAsync();
        }
    }
}