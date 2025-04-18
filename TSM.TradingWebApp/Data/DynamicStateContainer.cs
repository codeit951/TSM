using System.Collections.Concurrent;
using System;
using System.Reactive.Linq;

namespace TSM.TradingWebApp.Data
{
    public class DynamicStateContainer : IDisposable
    {
        private readonly ConcurrentDictionary<string, object> _state = new();
        public event Action<string, object> StateChanged;

        // Set any type of value
        public void SetValue<T>(string key, T value)
        {
            _state.AddOrUpdate(key, value, (k, oldValue) => value);
            StateChanged?.Invoke(key, value);
        }

        // Get value by key
        public T GetValue<T>(string key)
        {
            return _state.TryGetValue(key, out var value)
                ? (T)value
                : default;
        }

        // Observe specific keys
        public IObservable<T> Observe<T>(string key)
        {
            return Observable.Create<T>(observer =>
            {
                void Handler(string changedKey, object value)
                {
                    if (changedKey == key && value is T typedValue)
                    {
                        observer.OnNext(typedValue);
                    }
                }

                StateChanged += Handler;
                return () => StateChanged -= Handler;
            });
        }

        public void Dispose() => _state.Clear();
    }
}
