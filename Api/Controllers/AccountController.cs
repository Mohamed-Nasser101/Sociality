using System.Security.Claims;
using Api.DTOs;
using Api.Services;
using AutoMapper;
using Domain.Identities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly TokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        TokenService tokenService, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user is null) return Unauthorized();
        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        if (!result.Succeeded) return Unauthorized();
        return CreateUserObject(user);
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _userManager.Users.AnyAsync(u => u.NormalizedEmail == registerDto.Email.ToUpper()))
            return BadRequest("email already exists");

        if (await _userManager.Users.AnyAsync(u => u.UserName == registerDto.Username))
            return BadRequest("email already exists");

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return CreateUserObject(user);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
        return CreateUserObject(user);
    }

    private UserDto CreateUserObject(AppUser user)
    {
        return new UserDto
        {
            DisplayName = user.DisplayName,
            Username = user.UserName,
            Image = "",
            Token = _tokenService.CreateToken(user)
        };
    }
}