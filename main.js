const API_KEY=`ac0ee77ab7cb4975a4485d0265c3fc85`
// const API_KEY=`ac0ee77ab7cb4975a4485d0265c3fc8`   //error 유발용.


//forDeploy; 0은 newsAPI, 1은 netlify 배표용.
let url=new URL (`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
let forDeploy=1 

let newsList=[]

//main menu
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)))

//side menu
const sideMenu = document.querySelectorAll("#menu-list button")
sideMenu.forEach(sideMenu=>sideMenu.addEventListener("click", (event)=>getNewsByCategory(event)))

// let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)

const getNews = async()=>{
    try{
        const response =  await fetch(url);
        console.log("rrr", response)
        const data = await response.json();
        if(response.status===200){
            if(data.articles.length === 0){
                throw new Error("No results for this search");
            }else{
                newsList = data.articles;
                render();
            }
            
        }else{
            throw new Error(data.message)
        } 
    }catch(error){
        errorRender(error.message)
    }
    
}

const getLatestNews = async() => {
    if (forDeploy==0){
        url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    }else if(forDeploy=1){
        url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)
    }

    await getNews();
}

const getNewsByCategory = async (event)=>{
    const category = event.target.textContent.toLowerCase();
    if (forDeploy==0){
        url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    }else if(forDeploy=1){
        url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
    }

    await getNews();
}

const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("seach-input").value;

    if (forDeploy==0){
        url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    }else if(forDeploy=1){
        url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
    }

    await getNews();
}

const render =()=>{
    const newsHTML = newsList.map(news=>`
        <div class="row news">
            <div class="col-lg-4">
                <img class="news-image-size" src= "${news.urlToImage || "./images/image_not_available.png"}"/>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${
                        news.description == null || news.description == ""
                        ? "내용 없음"
                        : news.description.length >200
                        ? news.description.substring(0,200) + "..."
                        : news.description
                    }
                </p>
                <div>
                    ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
                </div>
            </div>
        </div>
    `).join("")

    console.log("newsHTML", newsHTML)
    document.getElementById("news-board").innerHTML=newsHTML
}



const openNav = () =>{
    document.getElementById("mySidenav").style.width = "250px";
}

const closeNav =()=>{
    document.getElementById("mySidenav").style.width = "0px"
}

const openSearchBox=()=>{
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    }else{
        inputArea.style.display = "inline";
    }
}

const errorRender=(errorMessage)=>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML = errorHTML
}

getLatestNews(); 

