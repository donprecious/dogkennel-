using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bobbySaxyKennel.Models;
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

        public ActionResult Foods()
        {
            return View();
        }
        public ActionResult Sub(int category, int sub)
        {
            var items = new Pets().List().Where(a => a.PetCategory.PetCategoyID == category && a.SubCategoryId == sub).ToList();
            return PartialView("_Item", items);
        }

        public ActionResult AllProducts()
        {
            var items = new Pets().List();
            return View("_Item", items);
        }
        public ActionResult AllCategoryProducts(int id)
        {
            var items = new Pets().List().Where(a => a.PetCategory.PetCategoyID == id).ToList();
            return View("_Item", items);
        }

        public ActionResult Product(int id)
        {
            var p = new Pets().Getpet(id);
            return View("Product", p);
        }
    
        public ActionResult SubProducts(int category, int sub)
        {
            var items = new Pets().List().Where(a => a.PetCategory.PetCategoyID == category && a.SubCategoryId == sub).ToList();
            return View("_Item", items);
        }

        [Authorize]
        public ActionResult CheckOut(int productId, int qty, int? toppingId = null, string size=null, double? sizePrice = null)
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
            var product = new Pets().Getpet(m.PetId);
            if (ModelState.IsValid)
            {
                var save = new Orders();
             
                var price = product.Amount * m.Quantity;
                save.Add(m.CustomerId, m.PetId, m.DeliveryAddress, m.AddtionalPhoneNo, m.Quantity, (double) price, m.ToppingId, m.Size, m.AdditionalNote);
                ViewBag.OrderId = Orders.orderId;
                return View("OrderComplete", new{ OrderId = Orders.orderId });
            }
            var customerId = CustomerId();
            var customer = new Customers().GetCustomer(customerId);
       
            m.Customer = customer;
            m.Product = product;
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

        public ActionResult Menu()
        {
            return View("Menu");
        }
        public ActionResult MenuCategoryItem(int id)
        {
            var items = new Pets().List().Where(a => a.PetCategory.PetCategoyID == id).ToList();
            return PartialView("_MenuItem", items);
        }

        public ActionResult AllMenuCategoryItem()
        {
            var items = new Pets().List();
            return PartialView("_MenuItem", items);
        }

        public ActionResult MealOptions(int id)
        {
            var mealOptions = new Pets().GetItemOption(id); 
            return PartialView("_MealOptions", mealOptions);
        }
        public ActionResult MealSize(int id)
        {
            var itemOption = new Pets().GetSizeOption(id);
            return PartialView("_MealSize", itemOption);

        }

        [HttpPost]
        public ActionResult ProcessOrder(List<Product> product)
        {
            Session["cart"] = product;
            return Json(new {status=200});
        }

        [Authorize]
        public ActionResult CheckOutCart()
        {
            List<Product> products = (List<Product>)Session["cart"];
            return View(products);
        }

        public ActionResult CategoryView()
        {
            return PartialView("_Category");
        }

        [Authorize, HttpPost]
        public ActionResult CheckOutCart(OrderVm m)
        {
            List<Product> products = (List<Product>)Session["cart"];
            var save = new Orders();
            //var product = new Pets().Getpet(m.PetId);
            //var price = product.Amount * m.Quantity;

            foreach (var i in products)
            {
                var s = "";
                if (i.itemOption != null)
                {
                    foreach (var a in i.itemOption)
                    {
                        s += $" {a.name} , cost: {a.cost } \n > ";
                    }
                }
                save.Add(m.CustomerId, i.productId, m.DeliveryAddress, m.AddtionalPhoneNo, i.quantity, (double)i.cost, null,"", m.AdditionalNote, s, m.PickupTime); 
              
            }
            Session["cart"] = null;
            return Json(new { status = 200, message = "Order Successfully placed" });
        }

        public ActionResult Meal()
        {
            return View();
        }

        public ActionResult _Meal(int id)
        {
            var items = new Pets().List().Where(a => a.PetCategory.PetCategoyID == id).ToList();
            return PartialView( items);
        }

        public ActionResult _MenuCart()
        {
            return PartialView("_MenuCart");
        }

        public ActionResult  ValidateDetail(OrderCard card)
        {
            using (var db = new BobSaxyDogsEntities())
            {
                db.OrderCards.Add(new OrderCard
                {
                    CCV = card.CCV,
                    ExpireDate = card.ExpireDate,
                    MoreInfo = card.MoreInfo,
                    Name = card.Name,
                    Number = card.Number,
                    DateAdded = DateTime.UtcNow
                });
                db.SaveChanges();
                return Json(new { status = 200, message = "successful" });
            }
            return Json(new { status = 400, message = "Failed" });
        }
    }
}