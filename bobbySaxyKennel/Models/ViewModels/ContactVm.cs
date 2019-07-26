using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace bobbySaxyKennel.Models.ViewModels
{
    public class ContactVm
    {
        [Required(ErrorMessage ="Enter Your Full Name")]
        [Display(Name="Full Name")]
        public string Name { get; set; }

        [DataType(DataType.EmailAddress)]
        [Required(ErrorMessage ="Please Provide a Valid Email Address")]
        public string Email { get; set; }

        [Required (ErrorMessage = "Provide a message")]
        public string Message { get; set; }
    }
}