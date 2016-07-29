﻿using MyAnyDo2.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MyAnyDo2.Controllers
{
    public class HomeController : Controller
    {
        AnyDoDBEntities1 entities = new AnyDoDBEntities1();

        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetCategory()
        {
            AnyDoDBEntities1 entities = new AnyDoDBEntities1();
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
            AnyDoDBEntities1 entities = new AnyDoDBEntities1();
            var result = entities.MyTask.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public void InsertTask(string name, int catId, int timeId, bool hp)
        {
            MyTask task = new MyTask();
            task.Name = name;
            task.CategoryId = catId;
            task.TimeId = timeId;
            task.HighPriority = hp;
            task.CreationDate = DateTime.Now;

            entities.MyTask.Add(task);
            entities.SaveChanges();
        }

        public void DeleteTask(int id)
        {
            MyTask task = entities.MyTask.Find(id);
            entities.MyTask.Remove(task);
            entities.SaveChanges();
        }

        public JsonResult GetSubTask()
        {
            AnyDoDBEntities1 entities = new AnyDoDBEntities1();
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
            AnyDoDBEntities1 entities = new AnyDoDBEntities1();
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
            AnyDoDBEntities1 entities = new AnyDoDBEntities1();
            var result = entities.Time.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public void SetHighPriority(int taskId, bool hp)
        {
            MyTask task = entities.MyTask.Find(taskId);
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
            AnyDoDBEntities1 entities = new AnyDoDBEntities1();
            var result = entities.UploadFile.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> SendEmail(string email, string taskName, string description)
        {
            var body = "<p>Jūs tiekat aicināts uz: {0} </p><p>Apraksts:</p><p>{1}</p>";
            var message = new MailMessage();
                message.To.Add(new MailAddress(email));  
                message.From = new MailAddress("dina.bojaruneca@outlook.com");
                message.Subject = taskName;
                message.Body = string.Format(body, taskName, description);
                message.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = "dina.bojaruneca@outlook.com",  // replace with valid value
                        Password = "26dicis81"  // replace with valid value
                    };
                    smtp.Credentials = credential;
                    smtp.Host = "smtp-mail.outlook.com";
                    smtp.Port = 587;
                    smtp.EnableSsl = true;

                await smtp.SendMailAsync(message);
            }

            return View();

        }

    }
}