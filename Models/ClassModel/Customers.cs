using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
 using bobbySaxyKennel.Models;

namespace Models.ClassModel
{
    public class Customers
    {
      public static string returnMessage;
        public static int customerId;
        //public bool Add()
        //{
        //    try
        //    {
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {

        //        returnMessage = ex.Message;
        //        return false;
        //    }

        //}

        public bool Add(string userID)
        {
            try
            {
                using (db = new BobSaxyDogsEntities()) {
                    var cus = new Customer() { UserID = userID };
                    db.Customers.Add(cus);
                    db.SaveChanges();
                    customerId = cus.CustomerID;
                    return true;
                }
               
            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }

        public bool Find(int customerId)
        {
            try
            {
                using(db=new BobSaxyDogsEntities())
                {
                    var r = db.Customers.Find(customerId);
                    return (r!=null) ? true : false;
                }
             
            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }
        public bool Delete(int customerId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Customers.Find(customerId);
                    if (r != null)
                    {
                        db.Customers.Remove(r);
                        db.SaveChanges();
                        return true;
                    }
                    return false;
                }
              
            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }

        public Customer GetCustomer(int customerId)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Customers.Include(a=>a.User).Include(a=>a.QuotaMessages).Where(a=>a.CustomerID == customerId).SingleOrDefault();
                    if (r != null)
                    {
                     
                        return r;
                    }
                    return null;
                }
               
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return null;
            }
        }
        public int? GetCustomerID(string UserId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var cusId = db.Customers.Where(a => a.User.Id == UserId).Select(a => a.CustomerID).SingleOrDefault();
                    if (cusId != 0)
                    {
                        return cusId;
                    }
                    return null;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return null;
            }

        }
        public List<Customer> List()
        {
            using (db = new BobSaxyDogsEntities())
            {
                return db.Customers.Include(a=>a.User).Include(a=>a.QuotaMessages).ToList<Customer>();
            }
        }

        BobSaxyDogsEntities db;
    }
}