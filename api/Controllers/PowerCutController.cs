using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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
    [ApiController]
    [Route("[controller]")]
    public class PowerCutController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PowerCutController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select * from
                            dbo.powercut_data 
                            ORDER BY id ASC
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

        [HttpGet ("{starting_date}/{finishing_date}/{interruption_reason}/{failure_reason}")]
        public JsonResult filtering(string starting_date, string finishing_date, string interruption_reason, float failure_reason)
        {
            string query = null;

        Console.WriteLine(starting_date);
        Console.WriteLine(finishing_date);
        Console.WriteLine(interruption_reason);
        Console.WriteLine(failure_reason);


        if(starting_date == "2000-01-01T00:00:00" && finishing_date == "2000-01-01T00:00:00" && interruption_reason == "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where failure_reason = '{0}'",failure_reason );
        }

         if(starting_date == "2000-01-01T00:00:00" && finishing_date == "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason == 0.0){
              query = string.Format("select * from dbo.powercut_data where interruption_reason = '{0}'",interruption_reason );
        }

         if(starting_date == "2000-01-01T00:00:00" && finishing_date == "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where interruption_reason = '{0}' AND  failure_reason = '{1}'",interruption_reason,failure_reason  );
        }

        if(starting_date == "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason == 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')>finishing_date",finishing_date);
        }

        if(starting_date == "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason == "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')>finishing_date AND failure_reason = '{1}'",finishing_date,failure_reason);
        }

        if(starting_date == "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason == 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')>finishing_date AND interruption_reason = '{1}'",finishing_date,interruption_reason);
        }

        if(starting_date == "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')>finishing_date AND interruption_reason = '{1}' AND failure_reason='{2}'",finishing_date,interruption_reason,failure_reason);
        }

        if(starting_date != "2000-01-01T00:00:00" && finishing_date == "2000-01-01T00:00:00" && interruption_reason == "undefined" && failure_reason == 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date ",starting_date);
        }

        if(starting_date != "2000-01-01T00:00:00" && finishing_date == "2000-01-01T00:00:00" && interruption_reason == "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date AND failure_reason = '{0}' ",starting_date,failure_reason);
        }

        if(starting_date != "2000-01-01T00:00:00" && finishing_date == "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason == 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date AND interruption_reason = '{0}' ",starting_date,interruption_reason);
        }

        if(starting_date != "2000-01-01T00:00:00" && finishing_date == "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date AND interruption_reason = '{0}' AND failure_reason = '{1}' ",starting_date,interruption_reason,failure_reason);
        }

        if(starting_date != "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason == "undefined" && failure_reason == 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date AND CONVERT(datetime,'{1}')>finishing_date ORDER BY starting_date ASC " ,starting_date,finishing_date);
        }

        if(starting_date != "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason == "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date AND CONVERT(datetime,'{1}')>finishing_date AND failure_reason = '{2}'" ,starting_date,finishing_date,failure_reason);
        }

         if(starting_date != "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason == 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date AND CONVERT(datetime,'{1}')>finishing_date AND interruption_reason = '{2}'" ,starting_date,finishing_date,interruption_reason);
        }

        if(starting_date != "2000-01-01T00:00:00" && finishing_date != "2000-01-01T00:00:00" && interruption_reason != "undefined" && failure_reason > 0.0){
              query = string.Format("select * from dbo.powercut_data where CONVERT(datetime,'{0}')<starting_date AND CONVERT(datetime,'{1}')>finishing_date AND interruption_reason='{2}' AND failure_reason='{3}' ORDER BY starting_date ASC ", starting_date,finishing_date,interruption_reason,failure_reason);
        }
        
        Console.WriteLine(query);

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
        public JsonResult Post(powercuts pwr_cut)
        {
            string query = @"
                           insert into dbo.powercut_data
                           (starting_date,finishing_date,interruption_reason,failure_reason,id)
                    values (@Starting_Date,@Finishing_Date,@Interruption_Reason,@Failure_Reason,@Id)
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

                    myCommand.Parameters.AddWithValue("@Starting_Date", pwr_cut.starting_date);
                    myCommand.Parameters.AddWithValue("@Finishing_Date", pwr_cut.finishing_date);
                    myCommand.Parameters.AddWithValue("@Interruption_Reason", pwr_cut.interruption_reason);
                    myCommand.Parameters.AddWithValue("@Failure_Reason", pwr_cut.failure_reason);
                    myCommand.Parameters.AddWithValue("@Id", pwr_cut.id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    conn.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(powercuts pwr_cut)
        {
            string query = @"
                    update powercut_data set 
                    starting_date = '" + pwr_cut.starting_date + @"'
                    ,finishing_date = '" + pwr_cut.finishing_date + @"'
                    ,interruption_reason = '" + pwr_cut.interruption_reason + @"'
                    ,failure_reason = '" + pwr_cut.failure_reason + @"'
                    ,id = '" + pwr_cut.id + @"'
                    where id = " + pwr_cut.id + @" 
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
                    delete from dbo.powercut_data
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
    }

}