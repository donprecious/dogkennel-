using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using bobbySaxyKennel.Models.ClassModel;
using Models.ClassModel;
using Infrastructure;
namespace bobbySaxyKennel.Controllers
{
    [Authorize (Roles ="Admin, SuperAdmin")]
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SellersList()
        {
            var sellers = new Sellers();
            
            return View(sellers.List());
        }

        public ActionResult AddSellerFromUser(String id, string email)
        {
            var seller = new Sellers().Add(id, email);
            if (seller)
            {
                return RedirectToAction("Sellerslist");
            }
            return RedirectToAction("user");
        }

        public ActionResult AddSeller(Models.ViewModels.SellerVm m)
        {
            return View(m);
        }

        
        public ActionResult DeleteSeller(int id)
        {
            if (new Sellers().Delete(id))
            {
                return RedirectToAction("SellersList");
              //  Json(new { status = 200, message = "Delete successful" });
            }
            return Json(new { status = 0, message = "Failed to Delete " });
        }

        public ActionResult EditSeller(int id)
        {
            var list = new Sellers().Getseller(id);
            var m = new Models.ViewModels.SellerVm() ;
            if(list != null)
            {
                ViewBag.SellerName = list.User.FirstName +" "+ list.User.LastName;
                m.sellerId = list.SellerID;
                m.Email = list.User.Email;
                m.FirstName = list.User.FirstName;
                m.LastName = list.User.LastName;
                m.PhoneNumber = list.User.PhoneNumber;
                m.Address = list.User.Address;
                m.AddressableEmail = list.AddressableEmail;
                m.Password = "xxxxxx0";
                m.ConfirmPassword = "xxxxxx0";
            }
            return View(m);
        }

        public ActionResult Contacts()
        {
            return View(new Contacts().List());
        }

        public ActionResult DeleteMessage(int id)
        {
            var del = new Contacts().Delete(id);
            return RedirectToAction("Contacts","Admin");

        }
        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult EditSeller(Models.ViewModels.SellerVm m)
        {
            if (ModelState.IsValid)
            {
                var edit = new Sellers().Edit(m.sellerId,m.FirstName,m.LastName,m.PhoneNumber,m.Address,m.AddressableEmail);
                if (edit)
                {
                return  Json(new { status = 200, message = "Edit successful" });
                }
            }
            return View(m);
        }
        public ActionResult SellerPets(int id)
        {
            var list = new Pets().GetSellerPet(id);
            return View(list);
        }
        public ActionResult CustomerList()
        {
            var lst = new Customers().List();
            return View(lst);
        }

        [HttpPost]
        public ActionResult DeleteCustomer(int customerId)
        {
            if (new Customers().Delete(customerId))
            {

                Json(new { status = 200, message = "Delete successful" });
            }
            return Json(new { status = 0, message = "Failed to Delete " });
        }

        public ActionResult EditCustomer(int customerID)
        {
            var list = new Customers().GetCustomer(customerID);
            return View(list);
        }

        //[HttpPost]
        //public ActionResult EditCustomer(int customerID)
        //{
        //    var list = new Customers().GetCustomer(customerID);
        //    return View(list);
        //}

        public ActionResult Pets()
        {
            var list = new Pets().List();
              return View(list);
        }

      

        public ActionResult AddPet(int sellerID)
        {
            var seller = new Sellers().Getseller(sellerID);
            var m = new Models.ViewModels.PetVm();

            if(seller != null)
            {
                m.SellerId = seller.SellerID;
                ViewBag.SellerName = seller.User.FirstName + seller.User.LastName;
            }
            return View(m);
        }


        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult AddPet(Models.ViewModels.PetVm m)
        {
            if (ModelState.IsValid)
            {
                var add = new Pets().Add(m.Name, m.Description, m.Amount, m.SellerId, m.ImgLoc, m.ImgName, m.CategoryID);
                if (add)
                {
                    return Json(new { status = 200, message = "Pet Added Successfully" });
                }
                else
                {
                    return Json(new { status = 0, message = "Failed", errors= ModelErrors() });
                }
              
            }
           // return View(m);
            return Json(new { status = 0, message = "Failed", errors = ModelErrors() });
        }

       
        public ActionResult DeletePet(int petid, string returnUrl)
        {
            var petName = new Pets().Getpet(petid).ImgName;
            var delete =new Pets().Delete(petid);
          
            if (new Pets().Delete(petid))
            {
                var delRes = Infrastructure.FileUpload.DeleteFromCloud(petName);
                return Redirect(returnUrl);
            }
            return Redirect(returnUrl);
        }

        public ActionResult EditPet(int petId, int sellerId)
        {
            var m = new Models.ViewModels.PetVm();
            ViewBag.isEdited = true;
            var pet = new Pets().Getpet(petId, sellerId);
            if (pet != null)
            {
                ViewBag.petName = pet.Name;
                m.petId = pet.PetID;
                m.Amount = pet.Amount;
                m.CategoryID = pet.PetCategoryID;
                m.Description = pet.Description;
                m.ImgLoc = pet.ImgLocation;
                m.Name = pet.Name;
                m.SellerId = pet.SellerID;
                m.ImgName = pet.ImgName;
            }

            return View(m);
           // return View(m);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult EditPet(Models.ViewModels.PetVm m)
        {
            if (ModelState.IsValid)
            {
                if(new Pets().Edit(m.petId, m.Name, m.Description, m.Amount, m.SellerId, m.ImgLoc,m.ImgName, m.CategoryID))
                {
                    return Json(new { status = 200, message = "Pet Edited Successfully" });
                }
            }
            return Json(new { status = 0, message = "Failed to Edit ", errors=ModelErrors() });
        }
       
        public ActionResult UploadFile(string file)
        {
            var upload = Infrastructure.FileUpload.uploadCropedToCloudinary(file,FileUpload.thumbNailFolder);
            if (upload)
            {
               return Json(new { status = 200, message = "Uploaded", fullImageName = FileUpload.publicID, imageLocation = FileUpload.filePath }, JsonRequestBehavior.AllowGet);
            }
         return   Json(new { status = 0, message = "Failed to upload" }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult DeleteFile(string fileName)
        {
            var deleteUpload = Infrastructure.FileUpload.DeleteFromCloud(fileName);
            if (deleteUpload)
            {
                return Json(new { status=200, message = "Deleted Successfully" },JsonRequestBehavior.AllowGet);
            }
            return Json(new { status = 0, message = "Failed" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddCategory()
        {
            return View();
        }
        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult AddCategory(Models.ViewModels.CategoryVm m)
        {
            if (ModelState.IsValid)
            {
                if(new Models.ClassModel.Categories().Add(m.Name, m.Description))
                {
                    return RedirectToAction("AddCategory");
                    //   return Json(new { status = 200, message = "Category Added Successfully " });
                }
            }
            return View(m);
        }

        [HttpGet]
        public ActionResult DeleteCategory(int id)
        {
            if (new Categories().Delete(id))
            {
                //return Json(new { status = 200, message = "Delete Successfully" });
                return RedirectToAction("AddCategory");
            }
            return RedirectToAction("AddCategory");
         //   return Json(new { staus = 0, message = "Failed to Delete" });
        }

        public ActionResult EditCategory(int id)
        {
            var m = new Models.ViewModels.CategoryVm();
            var ds = new Categories().GetCategory(id);
           if(ds != null)
            {
                m.Description = ds.Description;
                m.Name = ds.Name;
                m.CategoryID = ds.PetCategoyID;
            }
            return View(m);

        }

        [HttpPost]
        public ActionResult EditCategory(Models.ViewModels.CategoryVm m)
        {
            if(new Categories().Edit(m.CategoryID, m.Name, m.Description))
            {
                return Json(new { status = 200, message = "Edit Successful" });
            }
            return Json(new { status = 0, message = "Edit Failed" });
        }
        public ActionResult CategoryList()
        {
            var lst = new Categories().List();
            return PartialView("_CategoryList", lst);
        }
        public ActionResult Messages()
        {
            var list = new QuoteMessages().List();
            return View(list);
        }
        public ActionResult QuotaMessage(int id)
        {
            var msg = new QuoteMessages().GetquotaMessage(id);
            new QuoteMessages().Read(id);
            return View(msg);
        }
        public ActionResult ShortMessage()
        {
            var list = new QuoteMessages().List().OrderByDescending(a => a.DateTime).Take(5);
            return PartialView("_ShortMessage", list);
        }
        public ActionResult MyMessages(int id)
        {
            var list = new QuoteMessages().GetQuotaMessageToSeller(id);
         
            return View(list);
        }

        public ActionResult MyUnreadMessages(int id)
        {
            var list = new QuoteMessages().GetQuotaMessageToSeller(id);
            return View(list.Where(a => a.Archieved == false).ToList());
        }
        public ActionResult MyreadMessages(int id)
        {
            var list = new QuoteMessages().GetQuotaMessageToSeller(id);
            return View(list.Where(a => a.Archieved == true).ToList());
        }


        public ActionResult ReplyQuota(int id)
        {
          var m = new Models.ViewModels.ReplyQuotaVm();
            var msg = new QuoteMessages().GetquotaMessage(id);
            if(msg != null)
            {
                m.QuotaId = msg.QuotaID;
            }
            return View(m);
        }

        public ActionResult DeleteQuotaMessage(int id)
        {
            var del = new QuoteMessages().Delete(id);
            return RedirectToAction("Messages");
        }

        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult ReplyQuota(Models.ViewModels.ReplyQuotaVm m)
        {
            var reply = new QuoteMessages().RelyQuota(m.id, m.Message);
            if (reply)
            {
                new QuoteMessages().Read(m.id);
                return Json(new { status = 200, message = "Message Sent" });
            }
            return Json(new { status = 0, message = "failed to send message", errors = ModelErrors() });
        }


        public ActionResult Users()
        {
            var users = new Users().List();
            return View(users);
        }

        public ActionResult DeleteUser(string id)
        {
            var users = new Users().delete(id);

            return RedirectToAction("Users");
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

        public ActionResult Super()
        {
            var users = new Users().List();
            return View(users);
        }
        public ActionResult MakeAdmin(string id)
        {
            var make = new Reusable.RoleCreator().AddUserToRole(id, "Admin");
          return  RedirectToAction("Super");
        }

      
    }
}