using Application.Activity;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        return HandleResult(await Mediator.Send(new List.Query()));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }

    [HttpPost("{id}/attend")]
    public async Task<IActionResult> UpdateActvity(Guid id)
    {
        return HandleResult(await Mediator.Send(new UpdateActivity.Command { Id = id }));
    }
}