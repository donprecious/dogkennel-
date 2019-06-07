using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(bobbySaxyKennel.Startup))]
namespace bobbySaxyKennel
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
         //   new Reusable.RoleCreator().createRoleDefaultUser1();
        }
    }
}
