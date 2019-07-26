using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace bobbySaxyKennel.Models.ViewModels
{
    public class SellerVm
    {
        //[Required]
        //public string UserID { get; set; }
        
        public int sellerId { get; set; }
       
        [Required (ErrorMessage ="First Name Required")]
        [Display(Name ="First name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name Required")]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Phone Number Required")]
        [Display(Name = "Phone Number")]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Address Required")]
        [Display(Name = "Address")]
        
        public string Address { get; set; }

        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }


        [DataType(DataType.EmailAddress)]
        [Display(Name = "Contact email")]
        public string AddressableEmail { get; set; }

        public RegisterViewModel user { get; set; }
    }
}