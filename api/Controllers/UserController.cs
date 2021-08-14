using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

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
                            select user_name from
                            dbo.users
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {   
                SqlConnection conn = new SqlConnection("Server = DESKTOP-IDBC57N\\SQLEXPRESS01; Database = mytestdb; Integrated Security = True;") ;
                conn.Open();
                using(SqlCommand myCommand=new SqlCommand(query, conn))
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
                           (id,user_name,password,user_type)
                    values (@Id,@User_Name,@Password,@User_Type)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlConnection conn = new SqlConnection("Server = DESKTOP-IDBC57N\\SQLEXPRESS01; Database = mytestdb; Integrated Security = True;") ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    myCommand.Parameters.AddWithValue("@Id", usr.id);
                    myCommand.Parameters.AddWithValue("@User_Name", usr.user_name);
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

    }
}