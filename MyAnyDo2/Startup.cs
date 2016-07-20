using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyAnyDo2.Startup))]
namespace MyAnyDo2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
