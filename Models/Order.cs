//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace bobbySaxyKennel.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Order
    {
        public int Id { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public string DeliveryAddress { get; set; }
        public string AddtionalPhoneNo { get; set; }
        public Nullable<int> PetId { get; set; }
        public string Status { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> TotalPrice { get; set; }
        public string SIze { get; set; }
        public Nullable<int> ToppingId { get; set; }
        public string AdditionalNote { get; set; }
        public Nullable<System.DateTime> DateTime { get; set; }
    
        public virtual Customer Customer { get; set; }
        public virtual Pet Pet { get; set; }
        public virtual Topping Topping { get; set; }
    }
}