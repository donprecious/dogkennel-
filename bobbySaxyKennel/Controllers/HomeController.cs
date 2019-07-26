using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models.ClassModel;
using bobbySaxyKennel.Models.ViewModels;
using Microsoft.AspNet.Identity;

namespace bobbySaxyKennel.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            var page = new Models.ClassModel.About().Find();
            return View(page);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Contact Us";

            return View();
        }


 
        public ActionResult ContactUs()
        {
            return PartialView("_ContactUs");
        }


        [HttpPost]
        public ActionResult ContactUs(ContactVm m)
        {
            if (ModelState.IsValid)
            {
                var send = new Models.ClassModel.Contacts().Add(m.Name, m.Email, m.Message);
                if (send)
                {
                    return Json(new { status = 200, message = "We Have Recieved Your Message, We Will Get Back to You Shortly" });
                }
            }
           
            return Json(new { status = 0, message = "Failed to send", errors = ModelErrors() });
            
        }

        public ActionResult Faq()
        {
            var page = new Models.ClassModel.Faq().Find();
            return View(page);
        }

        public ActionResult Privacy()
        {
            var page = new Models.ClassModel.Policy().Find();
            return View(page);
        }
        public ActionResult Terms()
        {
            return View();
        }

        public ActionResult Pet(int id)
        {
            var m = new Models.ClassModel.Pets().Getpet(id);
           
            if (m == null)
            {
                //m.SellerID = 101;
                //m.PetID = 102;
            }
            return View(m);
        }

       

        public ActionResult SendQuotaMessage( int sellerId, int petId)
        {
            var quotaVm = new QuotaVm();
            if (User.Identity.IsAuthenticated){
                string userId = User.Identity.GetUserId();
                var customerid = new Customers().GetCustomerID(userId);
               
                if (customerid != null)
                {
                    var customer = new Customers().GetCustomer((int)customerid);
                    quotaVm.customerId = (int)customerid;
                    quotaVm.Email = customer.User.Email; 
                    quotaVm.PhoneNumber = customer.User.PhoneNumber;
                }
             
               // quotaVm.
            }
            quotaVm.sellerID = sellerId;
            quotaVm.petID = petId;
            return PartialView("_SendQuotaMessage",quotaVm);
        }

        [HttpPost, ValidateAntiForgeryToken()]
        public ActionResult SendQuotaMessage(QuotaVm m)
        {
            if (ModelState.IsValid)
            {
                if (new Models.ClassModel.QuoteMessages().Add(m.Email, m.PhoneNumber, m.Message, m.sellerID, m.customerId))
                {
                    return Json(new { status = 200, message = "Your Message Sent" });
                }
            
            }
            return Json(new { status = 0, message = "Failed", errors = ModelErrors() });
        }

        public ActionResult Gallary()
        {
            var list = new Models.ClassModel.Pets().List();

            return View(list.OrderBy(a=>a.Datetime));
        }

        [Authorize]
        public ActionResult SendOrder(int petId, int sellerId)
        {
            //  var quotaVm = new QuotaVm();
            var m = new Models.ClassModel.Pets().Getpet(petId);
            if (User.Identity.IsAuthenticated)
            {
               
                string userId = User.Identity.GetUserId();
                var customerid = new Customers().GetCustomerID(userId);

                if (customerid != null)
                {
                    var customer = new Customers().GetCustomer((int)customerid);
                    var send = new Models.ClassModel.QuoteMessages()
                                                                   .Add(customer.User.Email, customer.User.PhoneNumber, "An Order has been Placed please reply customer", sellerId, customer.CustomerID);
                    if (send)
                    {
                        TempData["view"] = 200;
                        TempData["message"] = "Your order has been Placed Successfully";
                       
                        return View("Pet", m);
                     //   return Json(new { status = 200, message = "Your order has been Placed Successfully" }, JsonRequestBehavior.AllowGet);
                    }
                 
                }
                else
                {
                    var add = new Customers().Add(userId);
                     customerid = new Customers().GetCustomerID(userId);
                    var customer = new Customers().GetCustomer((int)customerid);
                    var send = new Models.ClassModel.QuoteMessages()
                                                                    .Add(customer.User.Email, customer.User.PhoneNumber, "An Order has been Placed please reply customer", sellerId, customer.CustomerID);
                    if (send)
                    {
                        TempData["view"] = 200;
                        TempData["message"] = "Your order has been Placed Successfully";
                     //   var m = new Models.ClassModel.Pets().Getpet(petId);
                        return View("Pet", m);
                    }
                }
            }
            TempData["view"] = 0;
            TempData["message"] = "Something Went Wrong while Processing your Order!";
          //  var m = new Models.ClassModel.Pets().Getpet(petId);
            return View("Pet", m);
           // return Json(new { status = 0, message="" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ShortPets()
        {
            var pets = new Models.ClassModel.Pets().List().OrderBy(a => a.Datetime).Take(12);
            return PartialView("_ShortPets", pets);
        }
        [Authorize]
        public ActionResult Messages(string id)

        {
            return View();
        }

        public List<string> ModelErrors()
        {
            List<string> lstErr = new List<string>();
            foreach (ModelState modelState in ViewData.ModelState.Values)
            {
                foreach (ModelError error in modelState.Errors)
                {
                    lstErr.Add(error.ErrorMessage);

                }
            }
            return lstErr;
        }
    }
}