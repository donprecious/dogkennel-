using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace Infrastructure
{
    public class FileUpload
    {
        public static string ReturnMessage;
        public static string filePath;
        public static string publicID;
        public static string thumbNailFolder = "Bobsax";
        //public static string EventPicFolder = "EventRawImage";
        //public static string EventVidoesFolder = "EventVideos";
        //public static bool uploadToCloudinary(string image, string folder)
        //{

        //    Account account = new Account()
        //    {
        //        ApiKey = apikey,
        //        ApiSecret = secretKey,
        //        Cloud = appName,
        //    };
        //
        //    Cloudinary cloud = new Cloudinary(account);

        //    var uploadParam = new ImageUploadParams()
        //    {
        //        File = new FileDescription(image),
        //        Folder = folder
        //    };
        //    var uploadResult = cloud.Upload(uploadParam);
        //    if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
        //    {
        //        filePath = uploadResult.Uri.ToString();
        //        return true;
        //    }


        //    return false;
        //}

        public static bool uploadCropedToCloudinary(string base64String, string folder)
        {
             Account account = new Account()
            {
                ApiKey = apikey,
                ApiSecret = secretKey,
                Cloud = appName,
            };
            cloud = new Cloudinary(account);
            var uploadParam = new ImageUploadParams()
            {
                File = new FileDescription(base64String),
                Folder = folder
            };
            var uploadResult = cloud.Upload(uploadParam);
           
            if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                filePath = uploadResult.Uri.ToString();
                publicID = uploadResult.PublicId;
                return true;
            }
            return false;
        }

        public static bool uploadToNetFromFile(HttpPostedFileBase file, string folder)
        {
            try
            {
                //Account account = new Account()
                //{
                //    ApiKey = apikey,
                //    ApiSecret = secretKey,
                //    Cloud = appName
                //};

                // MemoryStream ms = new MemoryStream(file);
            Account account = new Account()
                {
                    ApiKey = apikey,
                    ApiSecret = secretKey,
                    Cloud = appName,
                };
                cloud = new Cloudinary(account);

                var uploadParam = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, file.InputStream),
                    Folder = folder
                };
                var uploadResult = cloud.Upload(uploadParam);
                
                if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    filePath = uploadResult.Uri.ToString();
                    return true;
                }
                return false;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
            public static bool DeleteFromCloud(string filename)
        {
            try
            {
           Account account = new Account()
                {
                    ApiKey = apikey,
                    ApiSecret = secretKey,
                    Cloud = appName,
                };
                cloud = new Cloudinary(account);
                var del = cloud.DeleteResources(filename);
                if(del.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return true;
                }
                ReturnMessage = "Something Went Wrong";
                return false;
            }
            catch(Exception ex)
            {
                ReturnMessage = ex.Message;
                return false;
            }
        }
        static Cloudinary cloud ;
        static string apikey = "849621861927721";
        static string secretKey = "0ofuuFUGk_6zt4lmaXTsXayy07k";
        static string appName = "votel";   
    }

  
}