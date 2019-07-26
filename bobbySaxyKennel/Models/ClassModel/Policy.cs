using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using bobbySaxyKennel.Models.ViewModels;

namespace bobbySaxyKennel.Models.ClassModel
{
    public class Policy
    {
        public static string returnMessage;
        BobSaxyDogsEntities db ;

        public Policy()
        {
           
            using (db = new BobSaxyDogsEntities())
            {
    if (!FindAny())
            {
                //create new 
                db.Policies.Add(new Models.Policy()
                {
                    Policy1 = ""
                });
                db.SaveChanges();

            }
            }
        
        }

        public bool Edit(PolicyVm m)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                                    var p = db.Policies.Find(m.Id);
                p.Policy1 = m.Policy1;
                db.Entry(p).State = EntityState.Modified;
                db.SaveChanges();
                return true;
                }
               ;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

        }
        public bool FindAny()
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
 if (db.Policies.FirstOrDefault() != null)
                {
                    return true;
                }
                }
                   
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
           
            }
           
            return false;
        }

        public Models.Policy Find()
        {
            using (db = new BobSaxyDogsEntities())
            {
  return db.Policies.FirstOrDefault();
            }
          
        }
    }

    public class About
    {
        public static string returnMessage;
        BobSaxyDogsEntities db;

        public About()
        {
            using (db = new BobSaxyDogsEntities())
            {
            if (!FindAny())
            {
                //create new 
                db.Abouts.Add(new Models.About()
                {
                    About1 = ""
                });
                db.SaveChanges();

            }
            }
         
        }

        public bool Edit(AboutVm m)
        {
            try
            {
                using (db = new BobSaxyDogsEntities())
                {
                   
                    var p = db.Abouts.Find(m.Id);
                    p.About1 = m.About1;
                    db.Entry(p).State = EntityState.Modified;
                    db.SaveChanges();
                    return true;
                }
             
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

        }
        public bool FindAny()
        {
            using (db = new BobSaxyDogsEntities())
            {
                  ;
            if (db.Abouts.FirstOrDefault() != null)
            {
                return true;
            } 
            }
         
            return false;
        }

        public Models.About Find()
        {
            using (db = new BobSaxyDogsEntities())
            {
                ;
            return db.Abouts.FirstOrDefault();
            }
           
        }
    }

    public class Faq
    {
        public static string returnMessage;
        BobSaxyDogsEntities db;

        public Faq()
        {
            using (db = new BobSaxyDogsEntities())
            {
             if (!FindAny())
            {
                //create new 
                db.Faqs.Add(new Models.Faq()
                {
                    Faq1 = ""
                });
                db.SaveChanges();

            }
            }
        
           
        }

        public bool Edit(FaqVm m)
        {
            try
            {
           
                using (db = new BobSaxyDogsEntities())
                {
     var p = db.Faqs.Find(m.Id);
                p.Faq1 = m.Faq1;
                db.Entry(p).State = EntityState.Modified;
                db.SaveChanges();
                return true;
                }
           
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

        }
        public bool FindAny()
        {
          
            using (db = new BobSaxyDogsEntities())
            {
                if (db.Faqs.FirstOrDefault() != null)
                {
                    return true;
                }
            }
            return false;
        }

        public Models.Faq Find()
        {
            using (db = new BobSaxyDogsEntities())
            {
                return db.Faqs.FirstOrDefault();
            }
        
        }
    }
}