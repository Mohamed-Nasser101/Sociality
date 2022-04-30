﻿using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
        return HandleResult(await Mediator.Send(new Details.Query { UserName = username }));
    }

    [HttpGet("{username}/activities")]
    public async Task<IActionResult> ListActivities(string username, string predicate)
    {
        return HandleResult(
            await Mediator.Send(new ListActivities.Query { Username = username, Predicate = predicate }));
    }

    [HttpPut]
    public async Task<IActionResult> EditProfile(Edit.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }
}