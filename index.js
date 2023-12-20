import express from "express";
const app = express();
app.use(express.json());
let counter = 0;
const apiCallsCounter = (req, res, next) =>{
    counter++;
    console.log(`api call: ${counter}`)
    next();
}
app.use(apiCallsCounter);
const checkApi = (req, res, next)=>{
 const {apiKey} = req.query;
 if(apiKey==="abc123"){ 
    next();
 }else{
    return res.status(401)({
        success: false,
        message: "api key is invalid"
    })
}
}
const validateParams =(req, res, next)=>{
    const { title , descrition, price} = req.body;
    if(!title){
        return res.json({
            success: true,
            message: 'titile is missing'
        })
    }
    if(!descrition){
        return res.json({
            success: true,
            message: 'descrition is missing'
        })
    }
    if(!price){
        return res.json({
            success: true,
            message: 'price is missing'
        })
    }
    next();
}
app.post('/bandini',checkApi, validateParams, async (req, res) =>{
    res.json({
        success: true,
        data:{},
        message: "Order is Created"
    })
})
app.get('/bandini',checkApi, async (req, res) =>{
    res.json({
        success: true,
        data:[],
        message: "Order is fetch"
    })
})
app.listen(3000, ()=>{
    console.log('server isruning on 3000');
});