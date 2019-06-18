using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace bobbySaxyKennel.Models.ClassModel
{
    public class Orders
    {

        public static string returnMessage;
        public static int orderId;


        public bool Add(int customerId, int petId, string deliveryAddress, string contact, int quantity, double totalPrice, int toppingId, string size, string note )
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var order = new Order()
                    {
                        AddtionalPhoneNo = contact,
                        CustomerId = customerId,
                        DeliveryAddress = deliveryAddress,
                        PetId = petId,
                        Quantity =  quantity,
                        TotalPrice = Convert.ToDecimal(totalPrice),
                        Status = "Pending",
                        SIze = size,
                        ToppingId =  toppingId,
                       AdditionalNote = note
                    };
                    db.Orders.Add(order);
                    db.SaveChanges();
                   orderId = order.Id;
                    return true;
                }
               
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return false;
            }
        }

        public bool SetOrderStatus(int orderId, string status)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Orders.Find(orderId);
                    if (r != null)
                    {
                        r.Status = status;
                        db.Entry(r).State = EntityState.Modified;
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
        public bool Find(int orderId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Orders.Find(orderId);
                    return (r != null) ? true : false;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }
        public bool Edit(int orderId, int customerId, int petId, string deliveryAddress, string contact)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Orders.Find(orderId);
                    if (r != null)
                    {
                        r.CustomerId = customerId;
                        r.AddtionalPhoneNo = contact;
                        r.DeliveryAddress = deliveryAddress;
                        r.PetId = petId;
                        db.Entry(r).State = System.Data.Entity.EntityState.Modified;
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
        public bool Delete(int orderId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Orders.Find(orderId);
                    if (r != null)
                    {
                        db.Orders.Remove(r);
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

        public Order GetOrder(int oId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Orders
                        .Where(a=>a.Id == oId)
                        .Include(a=>a.Customer)
                        .Include(a => a.Customer.User)
                        .Include(a=>a.Pet)
                        .Include(a=>a.Topping)
                        .SingleOrDefault();
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
     
        public List<Order> GetCustomerOrder(int customerId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities()){
                    var r = db.Orders
                        .Where(a=>a.CustomerId == customerId)
                        .Include(a => a.Topping)
                        .Include(a=>a.Customer).Include(a=>a.Pet).ToList();
                    return r;
            }
            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return null;
            }

       
        }

        public List<Order> List()
        {
            using (db = new BobSaxyDogsEntities())
            {
                return db.Orders
                    .Include(a => a.Customer)
                    .Include(a => a.Pet)
                    .Include(a => a.Customer.User)

                    .Include(a => a.Topping).ToList();
            }
        } 

      

        BobSaxyDogsEntities db;
    }
}