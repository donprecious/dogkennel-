using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace bobbySaxyKennel.Models.ViewModels
{
    public class PolicyVm
    {
        public int Id { get; set; }
        [AllowHtml]
        public string Policy1 { get; set; }
    }

    public  class FaqVm
    {
        public int Id { get; set; }
        [AllowHtml]
        public string Faq1 { get; set; }
    }

    public class AboutVm
    {
        public int Id { get; set; }
        [AllowHtml]
        public string About1 { get; set; }
    }
    
}