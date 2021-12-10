
//Linking firebase

firebase.initializeApp({ // this sets it up
    apiKey: "AIzaSyAPdjq5WcOPdI0sVvJcauDdoX6i2RsoRO8",  // this has to be your info
    authDomain: "teleapp-7ede7.firebaseapp.com", // this has to be your info
    projectId: "teleapp-7ede7" , // this has to be your info
  });
  
  const db = firebase.firestore() 

  // let tvShow = "Television Show: ";
  // let i = 0;

  let globalArray = [];



  //-----API-FUNCTION------

  function findOutInformation(){
    const xhttp = new XMLHttpRequest();


    let show = document.getElementById("homePageInput").value;
    

      
        console.log("document written succsesfully");
      

    
    xhttp.onload = function(){
      if(show != ""){

        let myObject = this.responseText;
        let data = JSON.parse(myObject);
        console.log(data[0])

         //responsible for removing HTML tags from summary
          function removeTags(str) {
            if ((str===null) || (str===''))
            return false;
            else
            str = str.toString();
            
            
            return str.replace( /(<([^>]+)>)/ig, '');
            }
            let removeTheTags = (removeTags(
            data[0].show.summary))
            //.then(()=>{})

              //main div container that is the body of all the divs
              //mainContainer.innerHTML = "";

              
              //document.body.appendChild(firstContainer)
              let mainContainer = document.getElementById('mainContainer');
       
        let random = Math.random().toString(36).substr(2, 9);
        
        //mainContainer.setAttribute('id',random);
        
        mainContainer.setAttribute('class',"mainContainer")
        document.body.appendChild(mainContainer);

            //second div for content
        let mainContainer1 = document.createElement('div')
        mainContainer1.setAttribute('class','mainContainer1');
        mainContainer.appendChild(mainContainer1);

              //third div for content
        let mainContainer2 = document.createElement('div')
        mainContainer2.id = random;
        mainContainer2.setAttribute("class","mainContainer2")
        mainContainer1.appendChild(mainContainer2);

        //div for all text content
        let textContainer = document.createElement('div')
        textContainer.setAttribute("class","textContainer")
        mainContainer2.appendChild(textContainer);

        //div for img and buttons
        let imgContainer = document.createElement('div')
        imgContainer.setAttribute('class',"imgContainer")
        mainContainer2.appendChild(imgContainer);


        //Show Title
        let showTitle = document.createElement('h2')
        showTitle.innerText = "Name: " + data[0].show.name
        textContainer.appendChild(showTitle);
        showTitle.setAttribute('class',"showTitle");

        //PremierDate
        let premierDate = document.createElement('h3')
        premierDate.innerText = "Premiered: " + data[0].show.premiered
        textContainer.appendChild(premierDate);
        premierDate.setAttribute("class","premierDate");

        //Genres
        let genres = document.createElement('h3')
        genres.innerText = "Genres: " + data[0].show.genres
        textContainer.appendChild(genres)
        genres.setAttribute("class","genres")

       
        //Country
       let country = document.createElement('h4')
       country.innerText = "Country: " + data[0].show.network.country.code
       textContainer.appendChild(country);
       country.setAttribute("class","country");

       //Rating
       let rating = document.createElement('h4')
       rating.innerText = "Rating: " + data[0].show.rating.average + "/10"
       textContainer.appendChild(rating);
       rating.setAttribute("class","rating")

       //RunTime
       let runtime = document.createElement('h4')
       runtime.innerText = "Average Runtime: " + data[0].show.averageRuntime + " Minutes"
       textContainer.appendChild(runtime);
       runtime.setAttribute("class","runtime")

       //Show Status
       let status = document.createElement('h4')
       status.innerText = "Status: " + data[0].show.status
       textContainer.appendChild(status);
       status.setAttribute("class","status")

       //Type of show
        let typeOfShow = document.createElement('h4')
        typeOfShow.innerText = "Type of show:  " + data[0].show.type
        textContainer.appendChild(typeOfShow);
        typeOfShow.setAttribute('class',"typeOfShow");

          //Remove Button
          let removeButton = document.createElement('button')
          removeButton.innerText = "Remove"
          removeButton.setAttribute('class',"removeBtnInDiv")

          removeButton.addEventListener("click",function(){
            deletecontent(random)
          })
          imgContainer.appendChild(removeButton);
              
           
           
         

        //Show Image
          let image = document.createElement('img')
          image.src = data[0].show.image.original
          imgContainer.appendChild(image)
          image.setAttribute('class',"image")

      
       
       


         //Summary
        let summary = document.createElement('p')
        summary.innerText = "Summary: " + removeTheTags 
        textContainer.appendChild(summary);
        summary.setAttribute("class","summary")
        

        //Offical link to site
        let site = document.createElement('a')
        let showlink = document.createTextNode("Offical Site")
        site.appendChild(showlink)
        site.href = data[0].show.officialSite
        textContainer.appendChild(site);
        site.setAttribute('class',"siteLink");

        //ad to list 
        let addListButton = document.createElement('button')
        addListButton.innerText = "Add to List"
        imgContainer.appendChild(addListButton);
         addListButton.setAttribute("class","addListButtonInDIv")
         addListButton.addEventListener("click",addFav)()



          //Add favorites function
         
            function addFav(){
            let user = firebase.auth().currentUser.uid  
            console.log(user)
            
            let dataArray = [];
            db.collection("TeleApp").doc(user).get()

            .then((data)=>{
              let userData = data.data()
              if(userData == undefined){
                userData = {FavoriteShow: []}
              }
            let info = userData.FavoriteShow
              
                for(i = 0; i < info.length; i++){
                  dataArray.push(info[i]); 
                  

                }

                
                
               console.log(info);
               //onsole.log(FavoriteShow)
              console.log(dataArray)
               dataArray.push(show)

                   
            db.collection("TeleApp").doc(user).set({
           FavoriteShow: dataArray
        
            },{merge:true});
            })


        
        }


        

      } //End of if statement from above
    } // end of xhttp onload function



  

    let url = "http://api.tvmaze.com/search/shows?q=" + show;
    xhttp.open('GET',url,true);
    xhttp.send();

    

  }
  //-------END OF API FUNCTIION-----//
  document.addEventListener('readystatechange',event =>{
    if (event.target.readyState === "interactive") {   
      
  } if (event.target.readyState === "complete") {
    setTimeout(8000, generateList())
    
  }
  })

    function generateList(){
   

      
      let user = firebase.auth().currentUser.uid  
      db.collection('TeleApp').doc(user).get().then((snapshot)=>{
       
        snapshot.data().FavoriteShow.forEach((data)=>{
          let xhttp = new XMLHttpRequest();
          let show = data 
          
          xhttp.onload = function(){
          
           
          
         
          
                  let addlistDiv = document.getElementById('listDiv')
                  let div0 = document.createElement('div')
                  div0.setAttribute('class','divOnListPage')
                  

                  //show title 
                  let title = document.createElement('h2')
                  title.innerText = "Name: " + data
                 div0.appendChild(title)
                 title.setAttribute('class','listPageShowTitles')


                 let listBtn = document.createElement('button')
                 listBtn.setAttribute('class',"listremoveBtnforListPage")
                 listBtn.innerText = "X"
                 div0.appendChild(listBtn) 
                 addlistDiv.appendChild(div0)
                 
                 //for deleting the list items out of firebase
               listBtn.addEventListener('click',function(){
                 db.collection('TeleApp').doc(user).update({
                   FavoriteShow: firebase.firestore.FieldValue.arrayRemove(data)
                   
                 })
               })

               //to remove the list items visually 
               listBtn.addEventListener("click", function(){
                div0.remove()
               })
                
                 

          }      
          let url = "http://api.tvmaze.com/search/shows?q=" + show
          xhttp.open('GET',url,true);
          xhttp.send() 
        })
      })
    }
   


  
 

    function deletecontent(random){
           
   let randomDelete = document.getElementById(random);
    console.log(random);
    randomDelete.remove();      
                
    }

  




//----------functions--for--linking--pages---------------------

//Sign Up function

function signUp(){ //this function creates a user

    let signUpEmail = document.getElementById('signUpEmail').value;
    let signUpPassword = document.getElementById('signUpPassword').value;

  firebase.auth().createUserWithEmailAndPassword(signUpEmail,signUpPassword).then((
  userCredential) =>{
    
    let user = userCredential.user

    console.log(user);
    window.location.href = "home.html"
    
  })
  
}



//--------------Log In Function--------------------

//This block of code is responsinble for taking user from login page to sign up page

  function signUpPage(){
    window.location.href = "signup.html"
  }





//-------------------Function is for logging in the user--------
function logInUser(){
    let logInWithEmail = document.getElementById('logInEmail').value;
    let logInPassword = document.getElementById('logInPassword').value;

    // if(logInWithEmail != logInWithEmail){
    //       alert("try again")
    //     }

    firebase.auth().signInWithEmailAndPassword(logInWithEmail,logInPassword)
    .then((userCredential)=>{
       
        console.log('user signed in')
        window.location.href = "home.html"

        

        
        
    }) 
      
      
    
}

//---------------Sign Out Function------------

function signOutUser(){
    firebase.auth().signOut().then(()=>{
            console.log("user signed out")
        })
        window.location.href = "index.html"      
   
}


//-------MyListFunction-------

function myList(){
  window.location.href = "list.html"
  
}

//----Going back to the home page function

function goingBack(){
  window.location.href = "home.html"
}

  
