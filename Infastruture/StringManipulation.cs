using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace reuseables
{
    public class StringManipulation
    {
        public  string shortString( string str, int length =20)
        {
            if(string.IsNullOrWhiteSpace(str) && str.Length >= length)
            {
                return str.Substring(0, length);
            }
            else
            {
                return str;
            }
        }
    }
}