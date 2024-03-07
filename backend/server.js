const express = require("express")
const cors = require("cors")
const cheerio = require("cheerio")
const puppeteer = require("puppeteer")

const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})


var products = []


app.listen(3016,()=>console.log("running.."));

app.post("/",async(req,res)=>{

    let query = req.body.query
    console.log(query)
    if(query === ''){
        return 0;
    }

    let query2 = query

    if(query.includes(' ')){
        query = query.replace(/ /g, '%20');

       
        console.log("multiple word")
      
    }
    console.log(query)


    try{
   
        for(let i = 0;i<5;i++){

            const response = await fetch(`https://www.hepsiburada.com/ara?q=${query}&sayfa=${i}`,{
            method:'GET'
        })
   
    
        const html = await response.text();
   
        const ch = cheerio.load(html)
        ch('.productListContent-zAP0Y5msy8OHn5z7T_K_',html).each( (index,element)=>{
            const site = "hepsiburada.com"

            const info = ch(element).find('a div[data-test-id="product-info-wrapper"]'); // product container
            const imagecont = ch(element).find('a div[data-test-id="product-image-image"]'); // image container

            const imagestring = imagecont.find('noscript').text()
            var srcRegex = /<img.*?src="(.*?)".*?>/; 
            var imageurl = imagestring.match(srcRegex)[1];

            const footer = info.find('div[data-test-id="product-image-footer-label"]').text()
            const title = info.find('h3[data-test-id="product-card-name"]').text()
            const price = info.find('div[data-test-id="price-current-price"]').text()
    
            let url = ch(element).find('a').attr('href');
    

            if(url.startsWith('h')){
                
            }
            else{
                url = site + url

                if(price=== ''){

    

                }
                else{
                    if (!products.some(product => product.url === url)) {
                        products.push({
                            site: site,
                            title: title,
                            footer: footer,
                            price: price,
                            url: url,
                            imageurl: imageurl
                        });
                    }
                    
    
                


                
            }
        }})

        

        if(query.includes('%20')){
            query2 = query.replace(/%20/g, '+');
           
            console.log("multiple word")
          
        }
        console.log(query2);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.trendyol.com/sr?q=${query2}&qt=${query2}&st=${query2}&os=1&pi=${i}`);

        const content = await page.content();


        const response2 = await fetch(`https://www.trendyol.com/sr?q=${query2}&qt=${query2}&st=${query2}&os=1&pi=${i}`,{
            method:'GET'
        })
        const html2 = await response2.text(); 
  

      

        const ch2 = cheerio.load(content)
        ch2('.p-card-wrppr',content).each((index,element)=>{

            const site2 = "trendyol.com";
            const info2 = ch2(element).find('div.p-card-chldrn-cntnr a div.product-down')
            let url2 = ch2(element).find('div.p-card-chldrn-cntnr a').attr('href')

            const title2 = info2.find('div div.prdct-desc-cntnr').text()
            let price2 = info2.find('div.price-promotion-container div.prc-cntnr div.prc-box-dscntd').text()
            const footer2 = info2.find('div.badges-wrapper').text()

            const imageurl2 = ch2(element).find('div.p-card-chldrn-cntnr a div.image-container div.p-card-img-wr img').attr('src')

            url2 = site2 + url2;


            if(price2 === ''){

        

            }
            else{

                if (!products.some(product => product.url === url2)) {
                    products.push({
                        site: site2,
                        title: title2,
                        footer: footer2,
                        price: price2,
                        url: url2,
                        imageurl: imageurl2
                    });
                }
                
               

            }

           



           
        })
        await browser.close();
       

   

        const response3 = await fetch(`https://www.n11.com/arama?q=${query2}&ipg=${i}`,{
            method:'GET'
        })
        const html3 = await response3.text();

       const ch3 = cheerio.load(html3); 

        ch3('li.column',html3).each((index,element)=>{

            const site3 = 'n11.com'

            const info3 = ch3(element).find('div.columnContent div.pro div.proDetail'); // product container

            const url3 = ch3(element).find('div.columnContent div.pro a').attr('href')
            const title3 = ch3(element).find('div.columnContent div.pro a').attr('title')


            const price3 = info3.find('.priceContainer span.newPrice ins').text()

            const imageurl3 = ch3(element).find('div.columnContent div.pro a .imgHolder img').attr('data-original'); // image

            const footer3 = ch3(element).find('div.columnContent div.pro a .imgHolder div.cargoBadgeField span.cargoBadgeText').text()

            if(price3 === ''){


            }
            else{

                if (!products.some(product => product.url === url3)) {
                    products.push({
                        site: site3,
                        title: title3,
                        footer: footer3,
                        price: price3,
                        url: url3,
                        imageurl: imageurl3
                    });
                }
                
                

            }

         

            

            
        })
       

       
    }

    products.sort(function(a, b) {
        // sort by price
        function parsePrice(price) {
          return parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
        }
      
        var priceA = parsePrice(a.price);
        var priceB = parsePrice(b.price);
      
        return priceA - priceB;
      });

    

    for(let i = 0;i<products.length;i++){
        console.log(products[i]);
    }

    console.log(products.length)

    res.status(200).send({products:products,total:products.length})

    products = []

        

        
        
    }
    catch(err){
        console.log(err)
    }
   
})

app.get("/",(req,res)=>{

    

   
})
