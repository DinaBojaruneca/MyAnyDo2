using MyAnyDo2.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
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
            AnyDoDBEntities entities = new AnyDoDBEntities();
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

        public void InsertSubTask(string name, int taskId)
        {
            SubTask subtask = new SubTask();
            subtask.Name = name;
            subtask.TaskId = taskId;

            entities.SubTask.Add(subtask);
            entities.SaveChanges();
        }

        public void DeleteSubTask(int id)
        {
            SubTask subtask = entities.SubTask.Find(id);
            entities.SubTask.Remove(subtask);
            entities.SaveChanges();
        }

        public JsonResult GetNote()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.Note.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public void InsertNote(string name, int taskId)
        {
            Note note = new Note();
            note.Name = name;
            note.TaskId = taskId;

            entities.Note.Add(note);
            entities.SaveChanges();
        }

        public void DeleteNote(int id)
        {
            Note note = entities.Note.Find(id);
            entities.Note.Remove(note);
            entities.SaveChanges();
        }

        public JsonResult GetTime()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.Time.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public void SetHighPriority(int taskId, bool hp)
        {
            Task task = entities.Task.Find(taskId);
            task.HighPriority = hp;
            entities.Entry(task).State = EntityState.Modified;
            entities.SaveChanges();
        }


        [HttpPost]
        public void SaveFiles(HttpPostedFileBase file, int taskId)
        {
            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;            
            if (file != null && file.ContentLength > 0)
            {
                actualFileName = file.FileName;                
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;

                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), fileName));

                    UploadFile upfile = new UploadFile
                    {
                        FileName = actualFileName,
                        FilePath = fileName,
                        TaskId = taskId,
                        FileSize = size
                    };

                    entities.UploadFile.Add(upfile);
                    entities.SaveChanges();                   
                }
                catch (Exception)
                {                    
                }
            }            
        }
        

        [HttpPost]
            public void DeleteFile(int id)
        {
            UploadFile file = entities.UploadFile.Find(id);
            entities.UploadFile.Remove(file);
            entities.SaveChanges();
        }


        public JsonResult GetFile()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.UploadFile.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

    }
}