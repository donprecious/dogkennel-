using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace bobbySaxyKennel.Models.ClassModel
{
    public class QuoteMessages
    {
        public static string returnMessage;
        public static int QuotaID;
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

        public bool Add(string customerEmail, string phoneNo, string message, int sellerID, int? customerId = null)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var qMessage = new QuotaMessage
                    {
                        CustomerEmail = customerEmail,
                        CustomerID = customerId,
                        PhoneNo = phoneNo,
                        Message = message,
                        SellerID = sellerID,
                        Archieved = false,
                        DateTime = DateTime.UtcNow,
                    };
                    db.QuotaMessages.Add(qMessage);
                    db.SaveChanges();
                    QuotaID = qMessage.QuotaID;
                    return true;
                }

            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return false;
            }
        }

        public bool Read(int quotaId)
        {
            try
            {
               
                var read = GetquotaMessage(quotaId);
                read.Archieved = true;
                var db = new BobSaxyDogsEntities();
                db.Entry(read).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return false;
            }
        }
        public bool Find(int quoteId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.QuotaMessages.Find(quoteId);
                    return (r != null) ? true : false;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }
        public bool Delete(int quoteId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.QuotaMessages.Find(quoteId);
                    if (r != null)
                    {
                        db.QuotaMessages.Remove(r);
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
         
        public QuotaMessage GetquotaMessage(int quotaid)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.QuotaMessages.Find(quotaid);
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

        public List<QuotaMessage> GetQuotaMessageToSeller(int sellerid)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.QuotaMessages.Where(a => a.SellerID == sellerid).ToList<QuotaMessage>();
                    return r;
                }
            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return null;
            }
        }

        public List<QuotaMessage> GetQuotaMessageToCustomer(int customerId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.QuotaMessages.Where(a => a.CustomerID == customerId).ToList<QuotaMessage>();
                    return r;
                }
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return null;
            }  
        }

        public bool RelyQuota(int  quotaId,string message)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var addReply = new QuotaReply()
                    {
                        QuotaID = quotaId,
                        Message = message,
                        DateTime = DateTime.UtcNow,
                    };
                    db.QuotaReplies.Add(addReply);
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

        public bool DeleteRelpiedMessage(int replyId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.QuotaReplies.Find(replyId);
                    if (r != null)
                    {
                        db.QuotaReplies.Remove(r);
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
        public List<QuotaMessage> List()
        {
            try 
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.QuotaMessages.Include(a => a.Customer).Include(a => a.Customer.User).Include(a => a.Seller).Include(a => a.Customer.User).ToList<QuotaMessage>();
                    return r;
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