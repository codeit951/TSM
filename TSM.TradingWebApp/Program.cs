using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Net.NetworkInformation;
using TSM.CoreBusiness;
using TSM.EFCoreSqlServer;
using TSM.InMemoryStore;
using TSM.TradingWebApp.Components;
using TSM.TradingWebApp.Components.Controls.Common;
using TSM.TradingWebApp.Data;
using TSM.TradingWebApp.Prices;
using TSM.UseCase.Assets;
using TSM.UseCase.PluginInterfaces;
using TSM.UseCase.Users;


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
    .AddUserStore<UsersRepositoryEF>()
    .AddRoleStore<RoleRepositoryEF>()
    .AddDefaultTokenProviders();
// Change the lifetimes of the `UserStore` and `RoleStore` to transient
builder.Services.AddTransient<IUserStore<User>, UsersRepositoryEF>();
builder.Services.AddTransient<IRoleStore<IdentityRole>, RoleRepositoryEF>();

// Configure authentication cookie settings
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/login"; // Custom login path
    options.AccessDeniedPath = "/access-denied"; // Custom access denied page
    options.LogoutPath = "/logout"; // Custom logout path
});



builder.Services.AddAuthorization(); //  Ensure Authorization is also added

builder.Services.AddDbContextFactory<TSMContext>((services, options) =>
{
    var connectionString = builder.Configuration["ConnectionStrings:BrokerDB"];
    options.UseSqlServer(
        connectionString,
        sql =>
        {
            sql.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
            sql.EnableRetryOnFailure(maxRetryCount: 5); // Add resiliency
        }
    );
}, ServiceLifetime.Scoped);



builder.Services.AddScoped<IAssetsRepository, AssetsRepositoryEF>();
builder.Services.AddScoped<IUserRepository, UsersRepositoryEF>();

builder.Services.AddTransient<IViewUsersByNameUseCase, ViewUsersByNameUseCase>();
builder.Services.AddTransient<IUpdateTradeUseCase, UpdateTradeUseCase>();
builder.Services.AddTransient<IUpdateUserBalanceUseCase, UpdateUserBalanceUseCase>();
builder.Services.AddTransient<IAddTradeUseCase, AddTradeUseCase>();

builder.Services.AddTransient<IViewAssetsByNameUseCase, ViewAssetsByNameUseCase>();
builder.Services.AddTransient<IAddAssetsUseCase, AddAssetsUseCase>();
builder.Services.AddTransient<IViewAssetByIdUseCase, ViewAssetByIdUseCase>();
builder.Services.AddTransient<IDeleteAssetUseCase, DeleteAssetUseCase>();
builder.Services.AddTransient<IUpdateAssetUseCase, UpdateAssetUseCase>();
builder.Services.AddTransient<IViewAssetsByTypeUseCase, ViewAssetsByTypeUseCase>();

builder.Services.AddSingleton<CryptoPriceService>();
builder.Services.AddHostedService<CryptoPriceWorker>();
builder.Services.AddSingleton<PricePageState>();
// Scoped for user-specific state, Singleton for app-wide state
builder.Services.AddScoped<DynamicStateContainer>();
builder.Services.AddScoped(typeof(IAsyncDisposable), typeof(TradingViewComponent));
builder.Services.AddScoped<UserState>();

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
