const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener("submit", async (e)=> {e.preventDefault()
const search = input.value
const  res= await axios.get(`https://api.tvmaze.com/search/shows?q=${search} `)           
                                                // on searching through await we get parsed jason directly
make_images(res.data)                                // its also  a type of function call backing only we  are calling show function once after we have received our response 
input.value = ""
} )

function make_images (shows)                         // shows is a array passed  of data we  are getting from response 
{
    for (let show of shows)
    {
        if (show.show.image)
        {
        const img = document.createElement('img')
        img.src=show.show.image.medium
        document.body.append(img)
        }
    }
}
// const config = {params: {q:search}  , headers:{}}
// .get("https://api.tvmaze.com/search/shows" , config )