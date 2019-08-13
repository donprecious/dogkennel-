using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
namespace bobbySaxyKennel.Models.ClassModel
{
    public class Users
    {
        public static string returnMessage;
     public List<User> List()
        {
            try
            {
                using(db = new BobSaxyDogsEntities())
                {
                    var list = db.Users.Include(a=>a.Roles).ToList();
                    return list.ToList<User>();
                }
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return null;
            }
        }
        public bool delete( string userid)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var li = db.Users.Find(userid);
                    db.Users.Remove(li);
                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return false;
            }
        }

        public string  GetUserName(string userid)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var li = db.Users.Find(userid);
                   
                    return (li!=null?li.FirstName +" "+ li.LastName:null);
                }
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return null;
            }
        }

        public User GetUser(string userId)
        {
            using (db = new BobSaxyDogsEntities())
            {
                db = new BobSaxyDogsEntities();
                return db.Users.Find(userId);
            }

          
           
        }
        BobSaxyDogsEntities db;
    }
}