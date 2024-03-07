import { useEffect, useState } from "react";

const Main = () => {
    const [query, setQuery] = useState("");
    const [squery,setSquery] = useState("")
    const [page,setPage] = useState(1);
    const [products,setProducts] = useState([])
    const [display,setDisplay] = useState("none")

    const submit = async (e) => {
        setProducts([])
        setDisplay("block")
        setSquery(query)
        e.preventDefault();

        console.log(squery)
  

        const data = { query };

        if(data === ''){
            return 0
        }

       
        console.log(data)

        try {
            let response = await fetch("http://localhost:3016/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            response = await response.json()

            console.log(response)

            setProducts(response)


            if (response.ok) {
                console.log("ok"); 
                setDisplay("none")
               
            };

     
            }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="body">

            <h1 className="header">hepsiburada.com, trendyol.com ve n11.com sitelerindeki önerilen ve en ucuz ürünleri bul !</h1>
            
            <div className="wrap">
   <div className="search">
      <input type="text" spellCheck="false" class="searchTerm" placeholder="Bir ürün ara" value={query} onChange={(e)=> setQuery(e.target.value)}/>
      <button type="submit" class="searchButton" onClick={submit}>
      <i className="fa-solid fa-magnifying-glass" style={{color:"#fff"}}></i>
     </button>
   </div>
          </div>
          {query && products.total ?  <h1 style={{marginTop:"20px"}} id="q">{`'${squery}' sorgusu için ${products.total} adet sonuç bulundu.`}</h1> :""}
         {query && products.total ? <div className="container" style={{marginTop:"40px"}}>
           
          {products.products && products.products.map((product) => (
    <a className="product" target="_blank" key={product.title} href={product.site === 'n11.com' ? product.url : 'https://' + product.url} >
        {product.site === 'hepsiburada.com' ?  <div className="site">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hepsiburada_logo_official.svg/282px-Hepsiburada_logo_official.svg.png" alt="" />
            
        </div> : product.site === 'trendyol.com' ? <div className="site">
            <img src="https://cdn.freelogovectors.net/wp-content/uploads/2024/01/trendyol-logo-freelogovectors.net_-180x113.png" style={{width:"162px",height:"92px"}} alt="" />
            
        </div>  : product.site === 'n11.com' ? <div className="site">
            <img src="https://static.wixstatic.com/media/d28e75_08e87222b85042a493ba9ba24bd2bd8e~mv2.png/v1/fill/w_554,h_204,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d28e75_08e87222b85042a493ba9ba24bd2bd8e~mv2.png" style={{width:"100px",height:"40px"}} alt="" />
            
        </div> : "" }

        <div className="imagecont">
            <img src={product.imageurl} alt={product.title} />
        </div>
        <div className="productinfo">
            <h3>{product.title}</h3>
            {product.footer === '' ? "" :<p className="c" style={{display:"inline",background:"rgba(115, 219, 115,0.4)",padding:"2px",borderRadius:"24px",border:"2px solid rgb(25, 156, 25)",position:"absolute",left:"8px",bottom:"12px", paddingLeft:"4px",paddingRight:"4px"}}>{product.footer}</p>}
            <p style={{fontSize:"16px",paddingTop:"12px",textDecoration:"underline",paddingLeft:"2px"}} >{product.price}</p>
            
        </div>
    </a>
))}

           
           
                
            </div> : <div className="loader" style={{display:display,marginTop:"40px"}}></div> }
        </div> 
    );
};

export default Main