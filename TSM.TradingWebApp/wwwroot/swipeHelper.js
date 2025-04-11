window.gestureHelper = {
    addSwipeListener: function (element, dotNetRef) {
        var hammertime = new Hammer(element);
       
        hammertime.on('swipeleft', function () {
            dotNetRef.invokeMethodAsync("OnSwipeLeft");
        });
        hammertime.on('swiperight', function () {
            dotNetRef.invokeMethodAsync("OnSwipeRight");
        });
    }
};
