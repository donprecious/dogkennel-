using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace bobbySaxyKennel.Models.ClassModel
{
    public class Categories
    {
        public static string returnMessage;
        public bool Add(string name, string description, string imageLoc)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {

                    db.PetCategories.Add(new PetCategory() { Name = name, Description = description, imageUrl = imageLoc});
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

        public List<PetCategory> List()
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.PetCategories;
                return list.ToList<PetCategory>();
            }
        }

        public PetCategory GetCategory(int id)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.PetCategories.Find(id);
                return list;
            }
        }

        public bool Delete( int categoryId)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.PetCategories.Find(categoryId);
                if(list != null)
                {
                    db.PetCategories.Remove(list);
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public bool Edit(int categoryId, string name, string description)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.PetCategories.Find(categoryId);
                if (list != null)
                {
                    list.Name = name;
                    list.Description = description;
                    db.Entry(list).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }
        BobSaxyDogsEntities db;
    }

    public class SubCategories
    {
        public static string returnMessage;
        public bool Add(string name, int catgoryId, string description)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {

                    db.SubCategories.Add(new SubCategory() { Name = name, CategoryId = catgoryId, Description = description });
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

        public List<SubCategory> List(int categoryId)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.SubCategories.Where(a=>a.CategoryId == categoryId).Include(a=>a.PetCategory).ToList();
                return list;
            }
        }

        public SubCategory GetSubCategory(int id)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.SubCategories.Find(id);
                return list;
            }
        }

        public bool Delete(int categoryId)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.SubCategories.Find(categoryId);
                if (list != null)
                {
                    db.SubCategories.Remove(list);
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public bool Edit(int subCategoryId, int categoryId,  string name, string description)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.SubCategories.Find(subCategoryId);
                if (list != null)
                {
                    list.Name = name;
                    list.Description = description;
                    list.CategoryId = categoryId;
                    db.Entry(list).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }
        BobSaxyDogsEntities db;
    }

    public class ToppingService
    {
        public static string returnMessage;
        public bool Add(string name,  string description)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {

                    db.Toppings.Add(new Topping() { Name = name, Description = description });
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
        
        public List<Topping> List()
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.Toppings.ToList();
                return list;
            }
        }

        public Topping GetTopping(int id)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.Toppings.Find(id);
                return list;
            }
        }

        public bool Delete(int categoryId)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.Toppings.Find(categoryId);
                if (list != null)
                {
                    db.Toppings.Remove(list);
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public bool Edit(int subCategoryId, string name, string description)
        {
            using (db = new BobSaxyDogsEntities())
            {
                var list = db.Toppings.Find(subCategoryId);
                if (list != null)
                {
                    list.Name = name;
                    list.Description = description;
                    db.Entry(list).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }
        BobSaxyDogsEntities db;
    }


}