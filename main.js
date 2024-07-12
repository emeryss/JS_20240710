const API_KEY=`ac0ee77ab7cb4975a4485d0265c3fc85`
let newsList=[]
const menus = document.querySelectorAll(".menus button")
console.log("mmm", menus)
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)))

const getLatestNews = async() => {
    const url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    const response =  await fetch(url);
    const data = await response.json();
    console.log("rrrr", response);
    console.log("dddd", data);
    console.log("dddd", data.articles);
    newsList = data.articles;
    render();
    console.log("news", newsList);
}

const getNewsByCategory = async (event)=>{
    const category = event.target.textContent.toLowerCase();
    console.log("category", category)
    const url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("Ddd", data);
    newsList = data.articles;
    render();
}

const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("seach-input").value;
    console.log("keyword", keyword)
    const url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("keyword data", data);
    newsList = data.articles;
    render();
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

getLatestNews(); 

