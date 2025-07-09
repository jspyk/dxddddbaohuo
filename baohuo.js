const axios = require('axios')
//let userName = ''
//if (process?.env?.dxUserName) {
//    userName=process?.env?.dxUserName
//} else {
//    console.log('未找到环境变量，请设置环境变量dx')
//    process.exit()
//    return
//}
async function main(){
    let options = {
        url: `https://rui-shu-dxddddocr.hf.space/ocr`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            // file:(await getFile()).file,
            image: 'data:image/image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgARACqAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/VOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPHv2ov+FkWPgDT9d+F3+keINB1OPU7jTPmb+0bRYpUlt/KH+tz5itsyGOzKHzAlaH7Pf7Qnhv9onwSmt6I/wBk1C32x6no8rhprGYg4BOBuRsEpIAAwB4VldV9Rr5D/ab/AGbPE/hvxBqHxe+CF1caJ40MEq6zpOnKD/acTj95LFGQVabozJg72VXXEyjzOGt7SjL20NV1X6rz8up30fZ1o+xn7r6P9H5efQ+vKK+A/wBnv4XfC39prwhquj+LpfE4+MelLJFqkuv6zcPqFrKG2efCjFVMavwUdC0bHY5OUd9X/gnH8bvFfirVfE/gPxJqlzr1vpdst3Y3l1KZXgVZBG8W9vmZTuQqCflCkDg8Y08bzSgpR0ns077dHorGlTBOMZuL1ha6atv1Wrv+B9z0V84fFXR/+Fr/ALUvh/wBqGq6tZ+H7Dwnca9cWml6hLZi4ke6SBN7RkFsbTgZ4yfU56/w3+yV8K/C3ibTvEVp4akuNa0+Tzra61DU7u72SYOH2SyshYZyDt4IBGCAa6VVqTk1CKsna7f/AAGcrpwhFOcndq+3/BR7BRRRXWcwV5v4i/aO+GfhHxhdeFtb8Z6XpGu2oQz217IYhHvUMuZGAQEqQcbuhFd1rmtWfhvRdQ1bUZlttPsLeS6uZm6RxIpZ2P0AJr5V/Zo+Inw5tvhxqOt+PvFHhWz8ReONYutfvdM1e/ti9ukjlYIirtkII0Vl3YxvNcdes4SjCLSb79vwOujSU4ynJNpWWnd/efSvhr4keEvGb7PD/ijRddfn5dN1CG4PHX7jGujrkfA/gfwJov8AxPfB3h/w7Yf2hF/yEtDsoI/tMZIb/WRKN6kgHqRxXXV0Qcmryt8jnnyp+7t5mJ4r8ceHfAlgt74k13TdAtHJVJ9Su0t1dsZ2qXIyfYc1yHhP9pP4XeONbTR9E8c6Ne6nIwSK1+0CN5mJwFj3Y3n2XJpnxO/Z/wDC/wAVvHPgvxNrlla3c3hyWctbXVss0d7DJEyiKQHskmyRc7gNrDHzkj5A/wCCgEnhr4h+OvAfg34f2dprPxDjnkilGiBTJAnyhIZHTgEMrNhj+7Csx2hsngxOIq4dOdlZNWXV+h34ahSryULu7Tu+i/r1R+hlFUdDtruz0TT7fULgXd/Fbxx3FwowJZAoDMPqcn8avV6S1R5zCiiimIKKKKACiiigAooqjruqHQ9E1DURZ3Womzt5LgWdjH5lxPsUt5cakjc7YwBkZJHNJuyuxpX0Pjj/AIKCeFfD3gGPQ/ixoWsy+EvilDdx21lLp2BJqihdriRQR/q4zgyYIKkROGDJstf8EzPAVl4e+HPi7V5rW8tvE8mtPpGpQXsHlNbG3RWEQUncCDMxbIU7vlK/ICeW0bw/8ZfHHxwk+Kfi34KXXiGWyZU8O6Nea9a2FrpKAkh2WTc0kg4bdtHzEtgYQJ7gPC/xg8feJdHk1jw/4P8ABXhca1a6zq9tZX81zqV7JblGi3OsSxtgwwA55xEozgYr5+mufEPEKD8lZ/e3sr/l5nvVJOGHWHck+7uvXltvp+fkaviz9nnVvFvx1u/HB8a3+h6VcaHHor2ejKILxo1m80qLk5Mal8EmMK/YMOc+F/tU/BjU/wBnPwsvxQ+F/jDxHotzYXUK6jYXWqS3UE6O4VXIlLbz5hQFH3KQ2cDbz6R448E/Fr4e/tETfEnwxZf8LP8AD+oWDae+g3V/FZ3GlRkozC3Z8JtLRI3A3NkhgSBJWP8AF/wb8Yv2rNNtPCF74UtvhZ4M+0x3WoX+o6nFfXd2FPyxxxQEgYJ3YcjJVTuGCG0rQjKM4xg+e7tv999kvmZ0JyjOEpTThZX226prdv5Hpfw3/aj8F+Ifhb4U8SeKvE2g+FtU1bTxdS6fe6hHbvuDvE7Rxu+8xmSKQKeeB1JBryL4OftafDXwPr3xVh8ReOojaXXiy51DTZts90JLeSKLHl7Eb5AyMABx6V9HeHfgr4J8N6FoelxeG9NvE0exj0+1ur6zimuBEmSAZCuclmZjjA3MxxzXAfBXw3c+HP2h/jsE0aXTNDuZtFmsZxbGKCdvsTCbymwFbaw+bb0Lc9a6JRxClSu1fbZv7L812OeMsO1UsnbfdLqvJ9y54+/aT+FkXwjs/EerXUuueFPE4msLO2TTpmbUSC0ckOyRV25KsP3hQHGQcV29n8IfA8fg9PDi+DNHt9CeMK2lvYxFBkc7gAQW9WyTnnJ60vxb+Evhz42eCLzwt4ntWn0+ciRJYSFmtpVztliYg7XGSM4IIJBBBIPlUnwM+NFroDaBYfHp100oYEvLrw3FJqEUWNoXzxKC7Y/5aHD55BBraftIzbnDmVulvnu9jGPs5RSjPld+t/lst0eH/sMa1d+Dv2mvit8MdJvJp/BVjJfz2trLIZBA8F4kKMpJ6lH2sR97ahPSvvG4u4LVd080cI9ZHC/zr5l0b9jv4JfCH4bS2Pjme01C2uryG5vNb8Rah9iEtwqOqKrB0CL+8lITcSdxyWwMUU8A/sf6WoYXXgBwPXXUn/QzGuXD+1w1NQly/OW3lt+p1Yj2WJqOpHm7aR3t13Pp0Xel+I7a8s47m2v4WjMVxFDMHwrAjDbTkZGf1rxz9lD9m+P9nnwdf2F9HpV7rs99O39r2cP76W1JXyo3kZQ3AXJTlQScZ6nY+BsvwZiutXtfhU/hwXJSN79dDKlioLCMuR1AJbH1NM/Z5+B+u/BW18Qx658QdV8eSardLcRtqSsotsbtxXdI5LPuBY5AO1eOMnrX7ycKjinvqnov8/0ORv2cJ0+ZrbRrV/5fqev0UUV3HGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBm6/4Z0fxZYfYdb0qx1my3iT7NqFsk8e4dG2uCMj1rItfhV4KscfZvB+gW+OnlaZAv8AJa6miocIt3aKUpJWTKenaNYaQrLYWNtZK2Nwt4VjBx0zgCrlFFUkloidwooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9k=',
            //userName:userName
        }
    }
    
     let res = await axios(options);
  console.log('服务器完整响应:', res); // 打印完整响应
  console.log('返回的data.data:', res.data?.data); // 确认具体返回值
  if (res.data?.data === '25+5=') {
    console.log('IP通过');
  } else {
    console.log('IP不通过');
  }
}
main()
