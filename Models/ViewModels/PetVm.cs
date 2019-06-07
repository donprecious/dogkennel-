using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace bobbySaxyKennel.Models.ViewModels
{
    public class PetVm
    {
        public int petId { get; set; }

        [Required(ErrorMessage ="Enter Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Provide Description")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Enter Amount")]
        public decimal Amount { get;set; }

        [Required(ErrorMessage = "No Picture Found")]
        [Display(Name = "Upload a Picture")]
        public string ImgLoc { get; set; }

        public string ImgName { get; set; }

        [Required (ErrorMessage ="No Seller Found")]
        public int SellerId { get; set; }

       
        [Required]
        [Display(Name= "Select Category")]
        public int CategoryID { get; set; }

    }
}