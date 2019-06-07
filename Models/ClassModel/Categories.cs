using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bobbySaxyKennel.Models.ClassModel
{
    public class Categories
    {
        public static string returnMessage;
        public bool Add(string name, string description)
        {

            try
            {

                using (db = new BobSaxyDogsEntities())
                {

                    db.PetCategories.Add(new PetCategory() { Name = name, Description = description });
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

}