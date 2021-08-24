using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select * from
                            dbo.users ORDER BY id ASC
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlConnection conn = new SqlConnection("Server = DESKTOP-IDBC57N\\SQLEXPRESS01; Database = mytestdb; Integrated Security = True;");
                conn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    conn.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{email}/{password}")]
        public JsonResult loginControl(string email, string password)
        {
            string query = string.Format("select * from dbo.users where email='{0}'", email );

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlConnection conn = new SqlConnection("Server = DESKTOP-IDBC57N\\SQLEXPRESS01; Database = mytestdb; Integrated Security = True;");
                conn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    conn.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(users usr)
        {
            string query = @"
                           insert into dbo.users
                           (id,name,email,password,user_type)
                    values (@Id,@Name,@Email,@Password,@User_Type)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlConnection conn = new SqlConnection("Server = DESKTOP-IDBC57N\\SQLEXPRESS01; Database = mytestdb; Integrated Security = True;");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    myCommand.Parameters.AddWithValue("@Id", usr.id);
                    myCommand.Parameters.AddWithValue("@Name", usr.name);
                    myCommand.Parameters.AddWithValue("@Email", usr.email);
                    myCommand.Parameters.AddWithValue("@Password", usr.password);
                    myCommand.Parameters.AddWithValue("@User_Type", usr.user_type);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    conn.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(users usr)
        {
            string query = @"
                    update dbo.users set 
                    id = '" + usr.id + @"'
                    ,name = '" + usr.name + @"'
                    ,email = '" + usr.email + @"'
                    ,password = '" + usr.password + @"'
                    ,user_type = '" + usr.user_type + @"'
                    where id = " + usr.id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlConnection conn = new SqlConnection("Server = DESKTOP-IDBC57N\\SQLEXPRESS01; Database = mytestdb; Integrated Security = True;");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    conn.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.users
                    where id = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlConnection conn = new SqlConnection("Server = DESKTOP-IDBC57N\\SQLEXPRESS01; Database = mytestdb; Integrated Security = True;");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    conn.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [HttpPost("{email}/{name}/{password}")]
        public JsonResult sendEmail(string email, string name, string password)
        {
            var fromAddress = new MailAddress("FromAdress", "FromName");
            var toAddress = new MailAddress("toAdress", "toName");
            const string fromPassword = "fromPassword";
            const string subject = "mailSubject";
            string body = "mailBody";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }


            return new JsonResult("Sended Successufly");
        }





    }
}