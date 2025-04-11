using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using TSM.CoreBusiness;
using TSM.EFCoreSqlServer;
using TSM.InMemoryStore;
using TSM.TradingWebApp.Components;
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

string conn = builder.Configuration["ConnectionStrings:BrokerDB"];
DbConnection connection = new SqlConnection(conn);

builder.Services.AddDbContext<TSMContext>(options =>
{
    options.UseSqlServer(connection,
         sql => sql.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
},ServiceLifetime.Transient);

builder.Services.AddTransient<IAssetsRepository, AssetsRepositoryEF>();
builder.Services.AddTransient<IUserRepository, UsersRepositoryEF>();

builder.Services.AddTransient<IViewUsersByNameUseCase, ViewUsersByNameUseCase>();
builder.Services.AddTransient<IUpdateTradeUseCase, UpdateTradeUseCase>();
builder.Services.AddTransient<IUpdateUserBalanceUseCase, UpdateUserBalanceUseCase>();
builder.Services.AddTransient<IAddTradeUseCase, AddTradeUseCase>();

builder.Services.AddTransient<IViewAssetsByNameUseCase, ViewAssetsByNameUseCase>();
builder.Services.AddTransient<IAddAssetsUseCase, AddAssetsUseCase>();
builder.Services.AddTransient<IViewAssetByIdUseCase, ViewAssetByIdUseCase>();
builder.Services.AddTransient<IDeleteAssetUseCase, DeleteAssetUseCase>();
builder.Services.AddTransient<IUpdateAssetUseCase, UpdateAssetUseCase>();

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
