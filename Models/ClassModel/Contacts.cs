using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bobbySaxyKennel.Models.ClassModel
{
    public class Contacts
    {
        public static string returnMessage;
        public bool Add(string name, string email, string message)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var con = new Contact() {FullName=name, email=email, Message=message, Achieved=false, DateStamp=DateTime.UtcNow };
                    db.Contacts.Add(con);
                    db.SaveChanges();
                //    customerId = cus.CustomerID;
                     return true;
                }

            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return false;
            }

        }

        public List<Contact> List()
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var list = db.Contacts.ToList();
                    //    customerId = cus.CustomerID;
                    return list;
                }

            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return null;
            }

        }
        public bool Delete(int id)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var m = db.Contacts.Find(id);
                    db.Contacts.Remove(m);
                    db.SaveChanges();
                    //    customerId = cus.CustomerID;
                    return true;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }

        BobSaxyDogsEntities db;

    }
}