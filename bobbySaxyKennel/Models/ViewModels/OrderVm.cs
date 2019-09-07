using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace bobbySaxyKennel.Models.ViewModels
{
    public class OrderVm
    {
        public int Id { get; set; }
        public int  CustomerId { get; set; }
        [Required (ErrorMessage = "Address Required")]
        public string DeliveryAddress { get; set; }
        [Required(ErrorMessage = "Phone Number Required")]
        public string AddtionalPhoneNo { get; set; }
        public int PetId { get; set; }
        public string Status { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public string Size { get; set; }
        public int ToppingId { get; set; }
        public string AdditionalNote { get; set; }
        [Required(ErrorMessage = "City Required")]
        public string City { get; set; }
        [Required(ErrorMessage = "Country Required")]
        public string  Country { get; set; }
        [Required(ErrorMessage = "State Required")]
        public string State { get; set; }
        [Required(ErrorMessage = "Postal Code Required")]
        public string PostalCode { get; set; }
        public Customer Customer { get; set; }
        public string ItemDetail { get; set; }
        public System.DateTime PickupTime { get; set; }
        public Pet Product { get; set; } 
    }

    public class Product
    {
        public int productId { get; set; } 
        public double cost { get; set; }
        public string name { get; set; }
        public int quantity { get; set; } 

        public ICollection< ItemOption> itemOption { get; set; }
    }

    public class ItemOption
    {
       public int optionId { get; set; }
     
       public string name { get; set; }
       public double cost { get; set; }
       public int productId { get; set; }

     
    }

    public class Products
    {
        private IList<Product> products { get; set; }
    }


}