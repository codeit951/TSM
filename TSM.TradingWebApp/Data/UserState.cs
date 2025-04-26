using System.Reactive.Linq;
using System.Reactive.Subjects;
using TSM.CoreBusiness;

namespace TSM.TradingWebApp.Data
{
    public class UserState : IDisposable
    {
        private User _currentUser;
        private readonly BehaviorSubject<User> _userSubject = new(null);

        // Current user as observable
        public IObservable<User> CurrentUserObservable => _userSubject.AsObservable();

        // Set user (triggers notifications)
        public void SetCurrentUser(User user)
        {
            _currentUser = user;
            _userSubject.OnNext(user);
        }

        // Get current user (non-observable)
        public User GetCurrentUser() => _currentUser;

        public void Dispose() => _userSubject.Dispose();
    }
}
