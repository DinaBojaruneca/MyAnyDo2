﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyAnyDo2.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AnyDoDBEntities : DbContext
    {
        public AnyDoDBEntities()
            : base("name=AnyDoDBEntities")
        {
            Configuration.LazyLoadingEnabled = false;
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Note> Note { get; set; }
        public virtual DbSet<SubTask> SubTask { get; set; }
        public virtual DbSet<Task> Task { get; set; }
        public virtual DbSet<Time> Time { get; set; }
    }
}
