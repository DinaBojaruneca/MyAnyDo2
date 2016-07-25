using MyAnyDo2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyAnyDo2.Controllers
{
    public class HomeController : Controller
    {
        AnyDoDBEntities entities = new AnyDoDBEntities();

        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetCategory()
        {
            var result = entities.Category.ToList();            
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public void InsertCategory(string name)
        {
            Category category = new Category();
            category.Name = name;

            entities.Category.Add(category);
            entities.SaveChanges();
            
        }

        public void DeleteCategory(int id)
        {
            Category category = entities.Category.Find(id);
            entities.Category.Remove(category);
            entities.SaveChanges();            
        }

        public JsonResult GetTask()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.Task.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public void InsertTask(string name, int catId, int timeId, bool hp)
        {
            Task task = new Task();
            task.Name = name;
            task.CategoryId = catId;
            task.TimeId = timeId;
            task.HighPriority = hp;

            entities.Task.Add(task);
            entities.SaveChanges();
        }

        public void DeleteTask(int id)
        {
            Task task = entities.Task.Find(id);
            entities.Task.Remove(task);
            entities.SaveChanges();
        }

        public JsonResult GetSubTask()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.SubTask.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetNote()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.Note.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetTime()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.Time.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
            //return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
    }
}