using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bobbySaxyKennel.Models.ViewModels
{
    public class OrderVm
    {
        public int Id { get; set; }
        public int  CustomerId { get; set; }
        public string DeliveryAddress { get; set; }
        public string AddtionalPhoneNo { get; set; }
        public int PetId { get; set; }
        public string Status { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public string SIze { get; set; }
        public int ToppingId { get; set; }
        public string AdditionalNote { get; set; }
        public decimal Latitude { get; set; }
        public decimal Logitude { get; set; }
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