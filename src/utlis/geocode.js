const request = require('request')
const geocode = (address,callback)=>
{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidmlnbmVzaHdhcmFucCIsImEiOiJja3ZxbGs2am9hbDViMm9zNzJka21veWU4In0.oeiZ39S1WP4Qs2osfBfrhg'
  
    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback("please check your internet connection",undefined)
        }
        else if(body.features.length === 0){
            callback("please enter the vaild input!",undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })

}
module.exports=geocode