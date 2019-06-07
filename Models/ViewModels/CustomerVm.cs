using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace bobbySaxyKennel.Models.ViewModels
{
    public class CustomerVm
    { 
        [Required]
        public string UserID { get; set; }
        [Required]
        public int customerID { get; set; }
    }

  

    
}