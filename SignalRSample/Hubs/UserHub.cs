using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class UserHub:Hub
    {

        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// 

        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }
        public override  Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }
        public async Task<string> NewWindowLoadedAsync(string name)
        {
            TotalViews++;
            await Clients.All.SendAsync("updateTotalUserViews", TotalViews);
            return $"Total Views: {name} - {TotalViews}";
        }

    }
}
