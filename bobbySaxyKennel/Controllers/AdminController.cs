using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bobbySaxyKennel.Models;
using bobbySaxyKennel.Models.ClassModel;
using bobbySaxyKennel.Models.ViewModels;
using Models.ClassModel;
using Infrastructure;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity;
using About = bobbySaxyKennel.Models.About;
using Faq = bobbySaxyKennel.Models.ClassModel.Faq;
using Policy = bobbySaxyKennel.Models.ClassModel.Policy;


namespace bobbySaxyKennel.Controllers
{
    [Authorize (Roles ="Admin, SuperAdmin")]
    public class AdminController : Controller
    {
        // GET: Admin
        

        private string UserId()
        {
            return User.Identity.GetUserId();

        }

        private int SellerId()
        {
          
            return new Sellers().GetSellerIdFromUserId(UserId()) ;
        }

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
                m.Password = "xxxxxx";
                m.ConfirmPassword = "xxxxxx";
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
                var add = new Pets().Add(m.Name, m.Description, m.Amount, m.SellerId, m.ImgLoc, m.ImgName, m.CategoryID, m.SubCategoryId,m.SmallPrize, m.MediumPrize,m.LargePrize  );
                if (add)
                {
                    return Json(new { status = 200, message = "Item Added Successfully" });
                }
                else
                {
                    return Json(new { status = 0, message = "Failed", errors= ModelErrors() });
                }
              
            }
           // return View(m);
            return Json(new { status = 0, message = "Failed", errors = ModelErrors() });
        }

       
        public ActionResult DeletePet(int petid)
        {
            var petName = new Pets().Getpet(petid).ImgName;
            var delete =new Pets().Delete(petid);
          
            if (new Pets().Delete(petid))
            {
                var delRes = Infrastructure.FileUpload.DeleteFromCloud(petName);
                return RedirectToAction("Pets");
            }
            return RedirectToAction("Pets");
        }

        public ActionResult AddLocation()
        {
            return View();
        }

        [HttpPost, ValidateAntiForgeryToken]

        public ActionResult AddLocation(LocationVm m)
        {
           
            var loc = new ToppingService().Add(m.Name, m.Description);
            
            return RedirectToAction("AddLocation");
        }


        public ActionResult EditLocation(int Id)
        {
            var loc = new ToppingService().GetTopping(Id);
            var m = new LocationVm()
            {
                Id = loc.Id,
                Name = loc.Name,
                Description = loc.Description
            };
            return View(m);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult EditLocation(LocationVm m)
        {
            var loc = new ToppingService().Edit(m.Id,m.Name, m.Description);

            return RedirectToAction("AddLocation");
        }

        public ActionResult DeleteLocation(int Id)
        {
            var del = new ToppingService().Delete(Id);
            return RedirectToAction("AddLocation");

        }

        public ActionResult LocationList()
        {
            var list = new ToppingService().List();
            return PartialView("_LocationList",list);
        }

        public ActionResult JsonLocationList()
        {
            var list = new ToppingService().List();
            return Json( list, JsonRequestBehavior.AllowGet);
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

        public ActionResult AddSubCategory()
        {
            return View();
        }
        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult AddSubCategory(Models.ViewModels.SubCategoryVm m)
        {
            if (ModelState.IsValid)
            {
                if(new Models.ClassModel.SubCategories().Add(m.Name,m.CategoryId,m.Description))
                {
                    return RedirectToAction("AddSubCategory");
                    //   return Json(new { status = 200, message = "Category Added Successfully " });
                }
            }
            return View(m);
        }

        [HttpGet]
        public ActionResult DeleteSubCategory(int id)
        {
            if (new SubCategories().Delete(id))
            {
                //return Json(new { status = 200, message = "Delete Successfully" });
                return RedirectToAction("AddSubCategory");
            }
            return RedirectToAction("AddSubCategory");
         //   return Json(new { staus = 0, message = "Failed to Delete" });
        }

        public ActionResult EditSubCategory(int id)
        {
            var m = new Models.ViewModels.SubCategoryVm();
            var ds = new SubCategories().GetSubCategory(id);
           if(ds != null)
            {
                m.Description = ds.Description;
                m.Name = ds.Name;

                m.CategoryId = Convert.ToInt32(ds.CategoryId);
            }
            return View(m);

        }

        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult EditSubCategory(Models.ViewModels.SubCategoryVm m)
        {
            if(new SubCategories().Edit(m.Id, m.CategoryId, m.Name, m.Description))
            {
                return Json(new { status = 200, message = "Edit Successful" });
            }
            return Json(new { status = 0, message = "Edit Failed" });
        }
        public ActionResult SubCategoryList(int id)
        {
            var lst = new SubCategories().List(id);
            return PartialView("_SubCategoryList", lst);
        }
        public ActionResult JsonCategoryList(int id)
        {
            var lst = new SubCategories().List(id);
           
            var lst1 =  new List<SubCategoryVm>();
            lst.ForEach((a) =>
            {
                lst1.Add(new SubCategoryVm
                {
                    Id = a.Id,
                    CategoryId = Convert.ToInt32(a.CategoryId),
                 Name = a.Name

            });
          
            });
            return Json(lst1,JsonRequestBehavior.AllowGet);
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
                if (new Models.ClassModel.Categories().Add(m.Name, m.Description, m.ImageUrl))
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
            if (ds != null)
            {
                m.Description = ds.Description;
                m.Name = ds.Name;
                m.CategoryID = ds.PetCategoyID;
            }
            return View(m);

        }

        [HttpPost, ValidateAntiForgeryToken ]
        public ActionResult EditCategory(Models.ViewModels.CategoryVm m)
        {
            if (new Categories().Edit(m.CategoryID, m.Name, m.Description))
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

        public ActionResult Orders()
        {
            var list = new Orders().List();
            return View(list);
        }

        public ActionResult SetOrderStatus(int id, string status)
        {
            var set = new Orders().SetOrderStatus(id, status);
            return RedirectToAction("Orders");
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


        public ActionResult PolicyPage()
        { 
          
            var find = new Policy().Find();
            var m = new PolicyVm
            {
                Id = find.Id,
                Policy1 = find.Policy1

            };
            return View(m);
        }

        [HttpPost,ValidateAntiForgeryToken]
        public ActionResult PolicyPage( PolicyVm m)
        {
            var edit = new Policy().Edit(m);
            return RedirectToAction("PolicyPage");
        }

        public ActionResult Faq()
        {
            var find = new Faq().Find();
            var m = new FaqVm
            {
                Id = find.Id,
               Faq1 = find.Faq1

            };
            return View(m);

        }

        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult Faq(FaqVm m)
        {
            var edit = new Faq().Edit(m);
            return RedirectToAction("Faq");
        }

        public ActionResult AboutPage()
        {
            var find = new Models.ClassModel.About().Find();
            var m = new AboutVm()
            {
                Id = find.Id,
                About1 = find.About1

            };
            return View(m);

        }
        [HttpPost, ValidateAntiForgeryToken]
        public ActionResult AboutPage(AboutVm m)
        {
            var edit = new Models.ClassModel.About().Edit(m);
            return RedirectToAction("AboutPage");
        }

        public ActionResult Cards()
        {
            using (var dv = new BobSaxyDogsEntities())
            {
                var c = dv.OrderCards.OrderByDescending(a=>a.DateAdded).ToList();
                return View(c);
            }
        }
    }
}