const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose"); // Fixed typo here
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path"); 
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://dbSanel:dbStara.123@terligzy.5rhzk.mongodb.net/terligzy")

// Test API
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

//Skladistenje slika u multeru

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Upload endpoint za slike
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req,res)=>{
   res.json({
    success: 1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
   }) 
})

// Sema za kreiranje proizvoda

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required:true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price: {
        type: Number,
        require: true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default:Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }
})

app.post('/addproduct', async (req,res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        description:req.body.description,
        date:req.body.date,
        available:req.body.available,
    });
    console.log(product);
    await product.save();
    console.log("Sačuvan");
    res.json({
        success: true,
        name:req.body.name,
    })
});

// Kreiranje API-ja za brisanje proizvoda

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Obrisan");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Kreiranje API-ja za sve proizvode
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("Svi proizvodi su obuhvaćeni");
    res.send(products);
})

//Sema za kreiranje korisnika
const Users = mongoose.model("Users", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    measurements: {
        length: String,
        shoulderWidth: String,
        waistWidth: String,
        underarmToMidBody: String,
        shoulderToWrist: String
    },
    cartData: { type: Object },
    date: { type: Date, default: Date.now() },
});

//Endpoint za registrovanje korisnika
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Postoji korisnik sa unetom email adresom" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        measurements: req.body.measurements,  
        cartData: cart,
    });
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

//Endpoint za prijavljivanje korisnika
app.post('/login', async (req, res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:"Pogrešna lozinka"});
        }
        
    }
    else {
        res.json({success:false, errors:"Uneti korisnik ne postoji"});
    }
})
//Endpoint za povezane proizvode
app.post("/relatedproducts", async (req, res) => {
    const { category } = req.body;

    try {
        // Fetch products from the same category
        const products = await Product.find({ category });
        
        // Shuffle products and select 4 random ones
        const shuffled = products.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);

        res.send(selectedProducts);
    } catch (error) {
        console.error("Error fetching related products:", error);
        res.status(500).send("Server Error");
    }
});

//Kreiranje middleware za fecovanje korisnika
const fetchUser = async (req,res, next) =>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Izvršite autentikaciju ispravnim tokenom"})     
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error) {
            res.status(401).send({errors:"Izvršite autentikaciju ispravnim tokenom"})
        }
    }
}

//Endpoint za dodavanje proizvoda u korpi
app.post('/addtocart', fetchUser, async (req, res)=>{
    console.log("dodat", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("dodato")
})

//Endpoint za brisanje proizvoda iz korpe
app.post('/removefromcart', fetchUser, async (req,res)=>{
    console.log("obrisan", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if (userData.cartData[req.body.itemId]>0) 
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("obrisano")
})

// Endpoint za vracanje proizvoda svakom korisniku prilikom prijavljivanja
app.post('/getcart', fetchUser, async (req,res)=>{
    console.log("Korpa je vraćena iz baze");
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

// Šema za narudžbine
const Order = mongoose.model("Order", {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',  // Reference the Users collection
      required: true,
    },
    productIds: {
      type: [Number],  // Array of product IDs
      required: true,
    },
    measurements: {
      length: String,
      shoulderWidth: String,
      waistWidth: String,
      underarmToMidBody: String,
      shoulderToWrist: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,  // Automatically set to the current date
    }
  });
  
  // Endpoint za čuvanje narudžbina
  app.post("/saveorder", fetchUser, async (req, res) => {
    const { productIds, totalPrice } = req.body;
  
    try {
      // Find the user's measurements from the Users collection
      const user = await Users.findById(req.user.id);
      
      const newOrder = new Order({
        userId: req.user.id,
        productIds: productIds,
        measurements: user.measurements,  // Save the user's measurements
        totalPrice: totalPrice,
      });
  
      await newOrder.save();
      res.json({ success: true, message: "Order saved successfully" });
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ success: false, message: "Error saving order" });
    }
  });

//Pokretanje Express servera
app.listen(port, (error) => {
    if (!error) {
        console.log("Server je pokrenut na portu: " + port);
    } else {
        console.log("Error: " + error);
    }
});