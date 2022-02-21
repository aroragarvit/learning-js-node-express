const ul = document.querySelector("ul");

const getDadJoke = async () => {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke; // Its a async function so its gonna return a promise
  };
  
 async function addnewjoke(){
   const joketext = await getDadJoke();
   const newLI = document.createElement("li");
   newLI.append(joketext)
   
   ul.append(newLI);
 } 
  
  //function addnewjoke() {
  //  getDadJoke().then((value) => {
  //    console.log(value);
  //    const ul = document.querySelector("ul");
  //    const newLI = document.createElement("li");
  //    newLI.innerText = value;
  //    ul.appendChild(newLI);
  //  });
  //}
  const babu = document.querySelector("button");
  babu.addEventListener("click", addnewjoke());