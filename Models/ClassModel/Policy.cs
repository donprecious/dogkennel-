using System;
using System.Collections.Generic;
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
            db = new BobSaxyDogsEntities();
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

        public bool Edit(PolicyVm m)
        {
            try
            {
                var p = db.Policies.Find(m.Id);
                m.Policy1 = m.Policy1;
                db.SaveChanges();
                return true;
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
                if (db.Policies.FirstOrDefault() != null)
                {
                    return true;
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
            return db.Policies.FirstOrDefault();
        }
    }

    public class About
    {
        public static string returnMessage;
        BobSaxyDogsEntities db;

        public About()
        {
            db = new BobSaxyDogsEntities();
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

        public bool Edit(AboutVm m)
        {
            try
            {
                var p = db.Abouts.Find(m.Id);
                m.About1 = m.About1;
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

        }
        public bool FindAny()
        {
            if (db.Abouts.FirstOrDefault() != null)
            {
                return true;
            }
            return false;
        }

        public Models.About Find()
        {
            return db.Abouts.FirstOrDefault();
        }
    }

    public class Faq
    {
        public static string returnMessage;
        BobSaxyDogsEntities db;

        public Faq()
        {
            db = new BobSaxyDogsEntities();
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

        public bool Edit(FaqVm m)
        {
            try
            {
                var p = db.Abouts.Find(m.Id);
                m.Faq1 = m.Faq1;
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

        }
        public bool FindAny()
        {
            if (db.Faqs.FirstOrDefault() != null)
            {
                return true;
            }
            return false;
        }

        public Models.Faq Find()
        {
            return db.Faqs.FirstOrDefault();
        }
    }
}