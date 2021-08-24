using System;


namespace api
{
    public class powercuts
    {
        public DateTime starting_date { get; set; }

        public DateTime finishing_date { get; set; }

        public string interruption_reason { get; set; }

        public float failure_reason { get; set; }

        public float id { get; set; }
    }
}