using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace bobbySaxyKennel.Models.ClassModel
{
    public class Sellers
    {
        public static string returnMessage;
        public static int sellerId;
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

        public bool Add(string userID, string email)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var seller = new Seller() { UserID = userID, AddressableEmail = email };
                    db.Sellers.Add(seller);
                    db.SaveChanges();
                    sellerId = seller.SellerID;
                    return true;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }

       

        public bool Find(int sellerId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var da = db.Sellers.Include(a => a.Pets).Include(a => a.User).Include(a => a.QuotaMessages).Where(a => a.SellerID == sellerId) ;
                  
                   
                    return (da != null) ? true : false;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }
        public Seller FindSeller(int sellerId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var da = db.Sellers.Include(a => a.Pets).Include(a => a.User).Include(a => a.QuotaMessages).Where(a => a.SellerID == sellerId).SingleOrDefault();

                   
                    return (da != null) ? da : null;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return null;
            }

        }
        public bool Edit(int sellerId, string firstName, string lastName, string phoneNumber, string address, string addressableEmail )
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Sellers.Find(sellerId);
                   if(r != null)
                    {
                        r.User.FirstName = firstName;
                        r.User.LastName = lastName;
                        r.User.PhoneNumber = phoneNumber;
                        r.User.Address = address;
                        r.AddressableEmail = addressableEmail;
                        
                    }
                    db.Entry(r).State = EntityState.Modified;
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
        public bool Delete(int sellerId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Sellers.Find(sellerId);
                    if (r != null)
                    {
                        db.Sellers.Remove(r);
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

        public Seller Getseller(int sellerId)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {
                    var r = FindSeller(sellerId);
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

        public List<Seller> List()
        {
            using (db= new BobSaxyDogsEntities())
            {
            var list = db.Sellers.Include(a => a.User).Include(a => a.Pets);
                return list.ToList<Seller>();
            }
        }

        public int ? GetSellerID(string UserId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var sellerId = db.Sellers.Where(a => a.User.Id == UserId).Select(a => a.SellerID).SingleOrDefault();
                    if(sellerId != 0)
                    {
                        return sellerId;
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
        BobSaxyDogsEntities db;
    }
}