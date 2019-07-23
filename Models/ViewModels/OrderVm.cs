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
        public string PickUpLocation { get; set; }
        public DateTime PickUpDatetime { get; set; }

        public string DropoffLocation { get; set; }  
        public DateTime DropOffDateTime { get; set; }

        public Customer Customer { get; set; }
        public Pet Product { get; set; } 
    }

   
}