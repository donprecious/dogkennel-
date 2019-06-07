using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace bobbySaxyKennel.Models.ViewModels
{
    public class QuotaVm
    {
        public int quotaId { get; set; }

        [Required(ErrorMessage ="Email is Required")]
        public string Email { get; set; }

        [Required(ErrorMessage ="Phone Number Required")]
        [Display(Name ="Phone Number")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage ="Message is Required")]
        public string Message { get; set; }

        [Required]
        public int sellerID{ get; set; }

       
        public int petID { get; set; }
        
        
        public int customerId { get; set; }

    }

    public class ReplyQuotaVm
    {
        public int id { get; set; }

        [Required]
        public int QuotaId { get; set; }

        [Required (ErrorMessage ="Message Required")]
        public string Message { get; set; }

    }
}