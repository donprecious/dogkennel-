using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using bobbySaxyKennel.Models;

namespace bobbySaxyKennel.Controllers
{
    public class ItemOptionsController : Controller
    {
        private BobSaxyDogsEntities db = new BobSaxyDogsEntities();

        // GET: ItemOptions
        public ActionResult Index()
        {
            var itemOptions = db.ItemOptions.Include(i => i.Pet);
            return View(itemOptions.ToList());
        }

        public ActionResult Options(int id)
        {
            var itemOptions = db.ItemOptions.Where(a=>a.ItemId == id).Include(i => i.Pet); 
            ViewBag.OptionName = itemOptions.FirstOrDefault()?.Pet.Name;
            return View(itemOptions.ToList());
        }

        // GET: ItemOptions/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ItemOption itemOption = db.ItemOptions.Find(id);
            if (itemOption == null)
            {
                return HttpNotFound();
            }
            return View(itemOption);
        }

        // GET: ItemOptions/Create
        public ActionResult Create()
        {
            ViewBag.ItemId = new SelectList(db.Pets, "PetID", "Name");
            return View();
        }

        // POST: ItemOptions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Description,Price,ItemId")] ItemOption itemOption)
        {
            if (ModelState.IsValid)
            {
                db.ItemOptions.Add(itemOption);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ItemId = new SelectList(db.Pets, "PetID", "Name", itemOption.ItemId);
            return View(itemOption);
        }

        // GET: ItemOptions/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ItemOption itemOption = db.ItemOptions.Find(id);
            if (itemOption == null)
            {
                return HttpNotFound();
            }
            ViewBag.ItemId = new SelectList(db.Pets, "PetID", "Name", itemOption.ItemId);
            return View(itemOption);
        }

        // POST: ItemOptions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Description,Price,ItemId")] ItemOption itemOption)
        {
            if (ModelState.IsValid)
            {
                db.Entry(itemOption).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ItemId = new SelectList(db.Pets, "PetID", "Name", itemOption.ItemId);
            return View(itemOption);
        }

        // GET: ItemOptions/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ItemOption itemOption = db.ItemOptions.Find(id);
            if (itemOption == null)
            {
                return HttpNotFound();
            }
            return View(itemOption);
        }

        // POST: ItemOptions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ItemOption itemOption = db.ItemOptions.Find(id);
            db.ItemOptions.Remove(itemOption);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
