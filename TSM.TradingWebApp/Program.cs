using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Identity;
using TSM.CoreBusiness;
using TSM.InMemoryStore;
using TSM.TradingWebApp.Components;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddBlazorBootstrap(); //  Add BlazorBootstrap

builder.Services.Configure<CircuitOptions>(options =>
{
    options.DetailedErrors = true;
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddIdentity<User, IdentityRole>()
    .AddUserStore<UsersRepository>()
    .AddRoleStore<RoleRepository>()
    .AddDefaultTokenProviders();

// Configure authentication cookie settings
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/login"; // Custom login path
    options.AccessDeniedPath = "/access-denied"; // Custom access denied page
    options.LogoutPath = "/logout"; // Custom logout path
});



builder.Services.AddAuthorization(); //  Ensure Authorization is also added

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAuthentication(); //  Called once
app.UseAuthorization();
app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
