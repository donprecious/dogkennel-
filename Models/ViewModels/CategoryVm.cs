using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace bobbySaxyKennel.Models.ViewModels
{
    public class CategoryVm
    {
        public int CategoryID { get; set; }
        public string Name { get; set;  }

        public string Description { get; set; }
    }
}