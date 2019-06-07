using bobbySaxyKennel.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reusable
{
    public class RoleCreator
    {
        public RoleCreator()
        {
            createRoleDefaultUser1();
        }
        public void createRoleDefaultUser1()
        {
            ApplicationDbContext context = new ApplicationDbContext();
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            // In Startup create a super admin   
            string superRole = "SuperAdmin";
            string regRole = "Admin";
            if (!roleManager.RoleExists("SuperAdmin"))
            {
                // first we create Admin rool   
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = superRole;
                roleManager.Create(role);

            }

            // creating Creating Create Reqular Admin  
            if (!roleManager.RoleExists(regRole))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = regRole;

                roleManager.Create(role);

            }
            //create and add user to role

            //Here we create a Admin super user who will maintain the website                  

            var user = new ApplicationUser();
            user.UserName = "Iyeritufu@gmail.com";
            user.Email = "Iyeritufu@gmail.com";
            user.DateStamp = DateTime.UtcNow;
            string password = "precious0don";

            //find user{
            var findUser = UserManager.FindByEmail(user.Email);
            if (findUser == null)
            {
                //GO AHEAD AND CREATE THE USER

                var chkUser = UserManager.Create(user, password);
                if (chkUser.Succeeded)
                {
                    var result1 = UserManager.AddToRole(user.Id, superRole);
                    result1 = UserManager.AddToRole(user.Id, regRole);
                }
            }
            else
            {
                //GET USER id
                var userID = findUser.Id;
                var result1 = UserManager.AddToRole(userID, superRole);

            }
        }

        public bool createRole(string roleName)
        {
            ApplicationDbContext context = new ApplicationDbContext();
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            if (!roleManager.RoleExists(roleName))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = roleName;
                roleManager.Create(role);
                return true;
            }
            return false;
        }

        public bool AddUserToRole(string UserID, string roleName)
        {
            ApplicationDbContext context = new ApplicationDbContext();
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            var findUser = UserManager.FindById(UserID);
            if (findUser != null)
            {
                //role
                if (!roleManager.RoleExists(roleName))
                {
                    // first we create Admin rool   
                    var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                    role.Name = roleName;
                    roleManager.Create(role);

                }
                UserManager.AddToRole(UserID, roleName);
                return true;
            }

            return false;
        }

        public bool MakeUserAdmin(string UserID)
        {
            string roleName = "Admin";
            ApplicationDbContext context = new ApplicationDbContext();
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            var findUser = UserManager.FindById(UserID);
            if (findUser != null)
            {
                //role
                if (!roleManager.RoleExists(roleName))
                {
                    // first we create Admin rool   
                    var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                    role.Name = roleName;
                    roleManager.Create(role);

                }
                UserManager.AddToRole(UserID, roleName);
                return true;
            }

            return false;
        }

        public bool RemoveUserFromAdmin(string UserID)
        {
            string roleName = "Admin";
            ApplicationDbContext context = new ApplicationDbContext();
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            var findUser = UserManager.FindById(UserID);
            if (findUser != null)
            {
                //role
                if (!roleManager.RoleExists(roleName))
                {
                    return true;
                }
                UserManager.RemoveFromRole(UserID, roleName);
                return true;
            }

            return false;
        }

        public bool CheckUserInAdminRole(string UserID)
        {
            string roleName = "Admin";
            ApplicationDbContext context = new ApplicationDbContext();
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            var findUser = UserManager.FindById(UserID);
            if (findUser != null)
            {
                //role
                UserManager.IsInRole(UserID, roleName);

                return true;
            }
            return false;
        }
    }
}

