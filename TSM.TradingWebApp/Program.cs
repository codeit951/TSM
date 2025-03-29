using Microsoft.AspNetCore.Components.Server;
using TSM.CoreBusiness;
using TSM.InMemoryStore;
using TSM.TradingWebApp.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.Configure<CircuitOptions>(options =>
{
    options.DetailedErrors = true;
});

builder.Services.AddHttpContextAccessor();


builder.Services.AddAuthentication("MyLoginAuth").AddCookie("MyLoginAuth", options =>
{
    options.Cookie.Name = "MyLoginAuth";
    //options.LoginPath = "/Account/Login";
    //options.AccessDeniedPath = "/Account/AccessDenied";
});

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
