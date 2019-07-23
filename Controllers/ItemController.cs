using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bobbySaxyKennel.Models.ClassModel;
using bobbySaxyKennel.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Provider;
using Models.ClassModel;

namespace bobbySaxyKennel.Controllers
{
    public class ItemController : Controller
    {
        // GET: Item
        public ActionResult All()
        {
            var items = new Pets().List();
            return PartialView("_Item", items);
        }
        public ActionResult AllCategoryItem(int id)
        {
            var items = new Pets().List().Where(a=>a.PetCategory.PetCategoyID == id).ToList();
            return PartialView("_Item", items);
        }

        public ActionResult Sub(int category, int sub)
        {
            var items = new Pets().List().Where(a => a.PetCategory.PetCategoyID == category && a.SubCategoryId == sub).ToList();
            return PartialView("_Item", items);
        }

        [Authorize]
        public ActionResult CheckOut(int productId, int qty =0, int? toppingId=null, string size=null, double sizePrice=0.0)
        {
            if (User.IsInRole("Admin") || User.IsInRole("SuperAdmin"))
            {
                return RedirectToAction("Login", "Account");
            }
            var product = new Pets().Getpet(productId);
            var customerId = CustomerId();
            var customer  = new Customers().GetCustomer(customerId);
            var price = (product.Amount + Convert.ToDecimal(sizePrice)) * qty;
            var orderVm = new OrderVm()
            {
                 CustomerId = customerId,
                 PetId = product.PetID,
                 Quantity = qty,
                 TotalPrice = price,
                 Product = product,
                 Customer = customer
                 
            };
            return View("CheckOut", orderVm);
        }


        [Authorize]
        [HttpPost]
        public ActionResult CheckOut(OrderVm m)
        {
            //
         
            if (ModelState.IsValid)
            {
                var save = new Orders();
                var product = new Pets().Getpet(m.PetId);
                var price = product.Amount * m.Quantity;
                save.Add(m.CustomerId, m.PetId, m.DeliveryAddress, m.AddtionalPhoneNo, m.Quantity, (double) price, 
                    m.ToppingId, m.SIze, $"Pick Up Location: {m.PickUpLocation} \n" +                                $"Pick Up Date: {m.PickUpDatetime} \n Drop off location: {m.DropoffLocation} \n Drop off Date  "+ m.AdditionalNote);
                ViewBag.OrderId = Orders.orderId;
                return View("OrderComplete", new{ OrderId = Orders.orderId });
            }
            return View(m);
        }
        private string UserId()
        {
            return User.Identity.GetUserId();
        }

        private int CustomerId()
        {
            var userId = UserId();
            var customerId = new Customers().GetCustomerID(userId);
            return Convert.ToInt32(customerId);
        }
        [Authorize]
        public ActionResult MyOrders()
        {
            var cutomerId = CustomerId();
            var orders = new Orders().GetCustomerOrder(cutomerId);
            return View("Orders", orders);
        }

        public ActionResult Cars()
        {
            var items = new Pets().List();
            return View(items);
        }

        public ActionResult FilterCars(int id)
        {
            var items = new Pets().List().Where(a => a.PetCategory.PetCategoyID == id).ToList();
         
            return View("Cars",items);
        }
    }
} 

