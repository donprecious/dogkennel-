using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace bobbySaxyKennel.Models.ClassModel
{
    public class Pets
    {

        public static string returnMessage;
        public static int petId;
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

        public bool Add(string name, string description, decimal amount, int sellerid, string imgLocation, string imgName, int petCategory, int subCategory, double smallPrize, double mediumPrize, double largePrize)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var pet = new Pet()
                    {
                        Name = name,
                        Description = description,
                        Amount = amount,
                        SellerID = sellerid,
                        ImgLocation = imgLocation,
                        PetCategoryID = petCategory,
                        SubCategoryId = subCategory,
                        Datetime = DateTime.UtcNow,
                        ImgName = imgName,
                        SmallPrize = Convert.ToDecimal(smallPrize),
                        MediumPrize = Convert.ToDecimal(mediumPrize),
                        LargePrize = Convert.ToDecimal(largePrize)
                        
                    };
                    db.Pets.Add(pet);
                    db.SaveChanges();
                   petId= pet.PetID;
                    return true;
                }
               
            }
            catch (Exception ex)
            {
                returnMessage = ex.Message;
                return false;
            }
        }
       
        public bool Find(int petId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Pets.Find(petId);
                    return (r != null) ? true : false;
                }

            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return false;
            }

        }
        public bool Edit(int petId, string name, string description, decimal amount, int sellerid, string imgLocation, string imgName, int petCategory)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Pets.Find(petId);
                    if (r != null)
                    {
                        r.Name = name;
                        r.Description = description;
                        r.Amount = amount;
                        r.SellerID = sellerid;
                        r.ImgLocation = imgLocation;
                        r.PetCategoryID = petCategory;
                        r.ImgName = imgName;
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
        public bool Delete(int petId)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Pets.Find(petId);
                    if (r != null)
                    {
                        db.Pets.Remove(r);
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

        public Pet Getpet(int petId)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {
                    var r = db.Pets.Include(a=>a.Seller).Include(a=>a.PetCategory).Include(a=>a.PetView).Where( a=>a.PetID==petId).SingleOrDefault();
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
        public Pet Getpet(int petId, int sellerId)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {
                    var r = GetSellerPet(sellerId);

                    if (r != null)
                    {
                        var pet = r.Where(a => a.PetID == petId).SingleOrDefault();
                        if(pet != null)
                        {
                            return pet;
                        }
                     
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

        public List<Pet> GetSellerPet(int sellerid)
        {
            try
            {
                using (db = new BobSaxyDogsEntities()){
                    var r = db.Pets.Include(a=>a.Seller).Include(a=>a.PetCategory).Include(a=>a.Seller.User).Where(a => a.SellerID == sellerid).ToList<Pet>();
                    return r;
            }
            }
            catch (Exception ex)
            {

                returnMessage = ex.Message;
                return null;
            }

       
        }

        public List<Pet> List()
        {
            using (db = new BobSaxyDogsEntities())
            {
                return db.Pets.Include(a => a.PetCategory).
                    Include(a=>a.PetCategory)
                    .Include(a => a.Seller)
                    .Include(a=>a.SubCategory)
                    .Include(a=>a.PetCategory.SubCategories)
                    .ToList<Pet>();
            }
        } 

       public  int GetSellerspetNo( int sellerID)
        {
            using(db = new BobSaxyDogsEntities())
            {
                return db.Pets.Where(a => a.SellerID == sellerID).Count();
            }
        }

       public IEnumerable<ItemOption> GetItemOption(int petId)
       {
           using (db = new BobSaxyDogsEntities())
           {
               return db.ItemOptions.Where(a => a.ItemId == petId).ToList();
           }
        }

       public IEnumerable<ItemSize> GetSizeOption(int petId)
       {
           using (db = new BobSaxyDogsEntities())
           {
               return db.ItemSizes.Where(a => a.ItemId == petId).ToList();
           }
       }

        BobSaxyDogsEntities db;
    }
}