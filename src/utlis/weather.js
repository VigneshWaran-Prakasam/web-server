const request = require('request')
const weather = ((lat,long,callback)=>
{
    const url =`http://api.weatherstack.com/current?access_key=969641121030ad81759e4c3b1273b0d7&query=${lat},${long}&units=f`
    request({url,json:true},(error,{body})=>
    {   
        if(error)
        {
            callback("please connect yout internet",undefined)
        }
        else if(body.error)
        {
            callback("please provide vaild data",undefined)
        }
        else{
            callback(undefined,`${body.current.weather_descriptions} It is Currently ${body.current.temperature} degress out.There is a ${body.current.feelslike} % chance of rain`)
        }

    })
})
module.exports = weather