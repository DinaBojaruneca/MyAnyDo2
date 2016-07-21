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
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetCategory()
        {
            AnyDoDBEntities entities = new AnyDoDBEntities();
            var result = entities.Category.ToList();
            return new JsonResult {Data= result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
    }
}