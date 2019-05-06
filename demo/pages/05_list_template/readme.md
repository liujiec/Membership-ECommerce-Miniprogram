/*
1、onPullDownRefresh()  下拉是在顶部向下拉触发
监听用户下拉刷新事件。

需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
可以通过wx.startPullDownRefresh触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。

page设置  
"enablePullDownRefresh": true,
"backgroundTextStyle": "dark",


2、onReachBottom()   上拉是划到页面底部
监听用户上拉触底事件。

可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
在触发距离内滑动期间，本事件只会被触发一次。

3、wx.showNavigationBarLoading(Object object)
在当前页面显示导航条加载动画

wx.hideNavigationBarLoading(Object object)
在当前页面隐藏导航条加载动画

4、skip、limit传入参数不能小于1

5、wx:for 需要带上wx:key 否则会warn提示

*/