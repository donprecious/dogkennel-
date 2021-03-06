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
    
    public partial class Pet
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Pet()
        {
            this.Orders = new HashSet<Order>();
        }
    
        public int PetID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int SellerID { get; set; }
        public string ImgLocation { get; set; }
        public int PetCategoryID { get; set; }
        public Nullable<int> SubCategoryId { get; set; }
        public Nullable<System.DateTime> Datetime { get; set; }
        public string ImgName { get; set; }
        public Nullable<decimal> SmallPrize { get; set; }
        public Nullable<decimal> MediumPrize { get; set; }
        public Nullable<decimal> LargePrize { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Orders { get; set; }
        public virtual PetCategory PetCategory { get; set; }
        public virtual Seller Seller { get; set; }
        public virtual SubCategory SubCategory { get; set; }
        public virtual PetView PetView { get; set; }
    }
}
