const exp = require("constants");
const express = require("express");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;


const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jquery",express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);



app.get("/",(req,res)=>{
    res.render("index");
})


app.post("/contact",async (req,res)=>{
    // user ne jo bhi data likha hai, submit button par click karne ke baad action hoga POST method ka
    // and saara data ab hume handle karna hai,
    // wo data User mein hai, jo schema wala part hai. Ab us data ko database mein save karna hai
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(port,()=>{
    console.log(`listening to port no ${port}`);
})