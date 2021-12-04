const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const weather = require('./utlis/weather')

const app = express()
const pathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port=process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathDirectory))

app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather',
        name:'Vigneshwaran P'
    })
})
app.get('/about',(req,res)=>
{   
    res.render('about',{
        title:'This is about page',
        name:'Vignesh'
    })

})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'This is Help page',
        name:'vicky'
    })
})

// app.get('',(req,res)=>
// {   
//     res.send('Home page')

// })
// app.get('/help',(req,res)=>
// {
//     res.send([
//         { name:'Vigneshwaran',
//          location:'Erode'},
//          {
//              name:'Vijay',
//              location:'Tirupur'
//          }

//     ])
// })

// app.get('/about',(req,res)=>
// {
//     res.send([{
//         title:'About Page'
//     }])
// })
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:'please provide  the address'
        })
 
    }
    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>
    {
        if(error)
        {
            return res.send({error})
        }
        weather(latitude,longtitude,(error,forecastData)=>
        {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
            })
        })

    })
  
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
         return res.send({
            error:"please provide search term"
        })
    }
    console.log( req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>
{
  res.render('404',
  {
    title:'404',
    name:'vigneshKarthi',
    errorMessage:'Help article not Found'
  })

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        name:'vigneshKarthi',
        errorMessage:'Page Not Found'

    })
})


// app.get('*',(req,res)=>
// {
//     res.send('my 404 page')
// })
app.listen(port,()=>{
    console.log('Server is up on port number '+port)
})