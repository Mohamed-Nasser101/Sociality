using FluentValidation;

namespace Application.Activity;

public class ActivityValidator : AbstractValidator<Domain.Entities.Activity>
{
    public ActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Category).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Venue).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
    }
}