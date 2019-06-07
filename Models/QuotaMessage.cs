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
    
    public partial class QuotaMessage
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public QuotaMessage()
        {
            this.QuotaReplies = new HashSet<QuotaReply>();
        }
    
        public int QuotaID { get; set; }
        public string CustomerEmail { get; set; }
        public string PhoneNo { get; set; }
        public string Message { get; set; }
        public int SellerID { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public System.DateTime DateTime { get; set; }
        public bool Archieved { get; set; }
        public Nullable<int> petId { get; set; }
    
        public virtual Customer Customer { get; set; }
        public virtual Seller Seller { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuotaReply> QuotaReplies { get; set; }
    }
}
