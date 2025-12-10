//====================gag down page send back to index ===================================//
const downpage = document.querySelector(".downpage");
if (downpage) {
  setTimeout(function() { //take back to home page after 5 seconds
    window.location.href = "index.html";
  }, 5000);
}


//=================chiliman animation thing on the chili page==========================//
const chiliMan = document.getElementById("chiliman");

if (chiliMan) {
  chiliMan.addEventListener("click", function(){
      let chiliManLogo = document.getElementById("chilimanlogo");
      chiliManLogo.innerHTML = "<img src='chilimanlogo.png' alt='Chili Man Logo' width='400' class='chilimanlogoimg'>";
  });
}

//=================bookmark pages=======================================================//
const bookmarkList = document.getElementById("bookmarklist");
const bookmarkButton = document.getElementById("bookmarkbutton");
const bookmarkPanel = document.getElementById("bookmarkpanel");
const addBookmarkButton = document.getElementById("addbookmark");
const clearBookmarksButton = document.getElementById("clearbookmarks");

clearBookmarksButton.addEventListener("click", function() {
  
  localStorage.removeItem("bookmarks"); // get rid of bookmarks in storage if clear is hit
  bookmarkList.innerHTML = ""; //stop displaying the bookmarks because they are cleared
});

function updateBookmarks() {  //helper function for both displaying and adding
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]"); //either get bookmarks from storage or its empty array
  bookmarkList.innerHTML = ""; //no dupes

  for (let page of bookmarks) {  //get eat saved page and create a list out of them
    bookmarkList.innerHTML += `<li><a href="${page.url}">${page.title}</a></li>`;
  }
}

updateBookmarks(); //load the bookmarks when the page loads

bookmarkButton.addEventListener("click", function() { //toggles bookmark panel if user hits the button
  bookmarkPanel.classList.toggle("nav-hidden");
});

addBookmarkButton.addEventListener("click", function() {//add a bookmark if user hits the button
  const title = document.title; //base the listing on the page title, works cleanly for my stew specific pages.
  const url = window.location.href; //also need to know where to go

  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  if (!bookmarks.some(function(page) { return page.url === url; })) { //if it isn't already saved
    bookmarks.push({ title, url }); 
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); //save it
    updateBookmarks(); //load the bookmarks again so the new one shows
  }
});

//========navigation menu toggle========================================================//

const nav = document.querySelector("nav");
const navButton = document.getElementById("navbutton");

if (nav && navButton) { 
  navButton.addEventListener("click", function() { //toggle nav if button is hit
    nav.classList.toggle("nav-hidden");
  });
}
 
//=========feedback form conditional====================================================//


const ratingForm = document.getElementById("ratingForm");
const rating = document.getElementById("rating");

if (ratingForm && rating) {//works just on the review page
  ratingForm.addEventListener("submit", function(event) { 
    event.preventDefault(); // stop default submission

    const value = parseInt(rating.value);

    if (value > 1) { // if good rating, go to contact page, else go to "down page"
      window.location.href = "contact.html";
    } else {
      window.location.href = "pagedown.html";
    }
  });
}



//===========page customization =======================================================//
const pageColor = document.getElementById("pagecolorpicker");
const textColor = document.getElementById("textcolorpicker"); //each is attached to a widget at page top
const resetColors = document.getElementById("resetcolors");
const fontSizeControl = document.getElementById("fontsizecontrol");
const fontSizeValue = document.getElementById("fontsizevalue");

//the conditionals, like other parts, help stop errors by not running on pages they shouldn't so JS doesn't break

if (pageColor) {
  pageColor.addEventListener("input", function() {
    document.body.style.backgroundColor = pageColor.value; //set bg according to user
  });
}

if (textColor) {
  textColor.addEventListener("input", function() {
    document.body.style.color = textColor.value; //set text according to user
  });
}

if (resetColors && pageColor && textColor) {
  resetColors.addEventListener("click", function() {
    document.body.style.backgroundColor = ""; //clear the board when the reset button gets hit
    document.body.style.color = "";
    pageColor.value = "#acffa1";
    textColor.value = "#272727";
    });
}   

if (fontSizeControl && fontSizeValue) {
  let size = fontSizeControl.value + "px"; 
  document.body.style.setProperty("--userFontSize", size);
  fontSizeValue.textContent = size; //set the initial sizes
  fontSizeControl.addEventListener("input", function() { //but update them as the bar up top slides
    let size = fontSizeControl.value + "px";
    document.body.style.setProperty("--userFontSize", size);
    fontSizeValue.textContent = size;
  });
}

//==================random page button====================================//

const randomButton = document.getElementById("randombutton"); 
if (randomButton) {
  randomButton.addEventListener("click", function() {
    const pages = [ //only the stew pages
      "stewchili.html",
      "stewgoulash.html",
      "stewcurry.html",
      "stewirishstew.html",
      "stewnihari.html",
      "stewgumbo.html",
      "stewbeefbourginion.html",
      "stewratatouille.html",
      "stewwat.html"
    ];

    const randomIndex = Math.floor(Math.random() * pages.length); //sets as many possibilities as pages, in this case nine
    window.location.href = pages[randomIndex]; //jump to that page
  });
}

//==================home button===============================================================//

const homeButton = document.getElementById("home"); 
if (homeButton) {
  homeButton.addEventListener("click", function() {
    window.location.href = "index.html";
  });
}

//====================contact form =========================//

const errorsDiv = document.getElementById("formErrors");
const successDiv = document.getElementById("formSuccess");
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

if (contactForm) { 
  contactForm.addEventListener("submit", function (event) {
    let errors = []; 
    event.preventDefault();
    errorsDiv.innerHTML = "";
    successDiv.innerHTML = "";
    errorsDiv.style.display = "none";
    successDiv.style.display = "none";

    if (nameInput.value.trim() === "") { //if there's nothing in the name box
      errors.push("Please add your name.");
    }

    if (!emailInput.value.includes("@")) { //just checking if there's an @. technically could skip with just an '@'
      errors.push('Email must contain "@".');
    }

    const messageText = messageInput.value.trim();//get rid of spaces so this can't be cheesed with the spacebar.

    if (messageText.length === 0) {
      errors.push("Uh-oh, message is empty.");
    } else if (messageText.length < 10) {
      errors.push("Please provide at least 10 characters.");
    } else if (messageText.length > 1000) { //same requirement as the last lab, I just like this one in particular.
      errors.push("Message is concerningly long.");
    }
      else if (messageText.toLowerCase().includes("bad")) { //stop user from being able to use the word 'bad'. I'm a fickle one.
      errors.push("The message didn't process for some reason.");
    }

    if (errors.length > 0) { //if there were any errors pushed, display them
      errorsDiv.style.display = "block";
      successDiv.style.display = "none"; //get rid of the success div. can't really be a success if there's errors.
      const list = document.createElement("ul");
      errors.forEach(function(err) {
        const li = document.createElement("li");
        li.textContent = err;
        list.appendChild(li);
      });
      errorsDiv.appendChild(list);
    } else {
      errorsDiv.style.display = "none"; //get rid of the errors div. can't really be errors if it's a success.
      successDiv.style.display = "block";
      successDiv.textContent = "Thank you! Your message has been sent. You will be redirected to the home page in 5 seconds.";

      contactForm.reset(); //clear the form

      setTimeout(function() { //part that sends the user home after 5 seconds
        window.location.href = "index.html";
      }, 5000);
    }
  });
}




// =====quiz stuff  ====================================================//
const personalities = { //the archetypes, if you will. I decided to go with seven.
  cozy: {
    title: "Irish Stew",
    description: "You appreciate comfort, much like the hearty and warming Irish Stew. You value simplicity and the joy of the familiar.",
    image: "irishstew.jpeg",
    url: "stewirishstew.html"
  },
  distinguished: {
    title: "Beef Bourguignon",
    description: "Like the sophisticated flavors of Beef Bourguignon, you have a refined taste and enjoy the finer things in life.",
    image: "bourguignon.jpg",
    url: "stewbeefbourginion.html"
  },
  practical: {
    title: "Chili",
    description: "You are grounded and down to earth, just like the ground beef in a classic chili.",
    image: "chili.jpg",
    url: "stewchili.html"
  },
  jolly: {
    title: "Gumbo",
    description: "You are as lively and jolly as a bowl of gumbo, multifaceted and awesome to be around.",
    image: "gumbo.jpg",
    url: "stewgumbo.html"
  },
  spontaneous: {
    title: "Curry",
    description: "You embody the phrase 'variety is the spice of life' much like the diverse and vibrant flavors found in curry.",
    image: "curry.png",
    url: "stewcurry.html"
  },
  mysterious: {
    title: "Nihari",
    description: "You have a certain depth of character and hidden complexity. You are as methodical as the slow-cooked nihari.",
    image: "nihari.png",
    url: "stewnihari.html"
  },
  antistew:{
    title: "Cobb Salad",
    description: "Maybe you answered a couple questions about not liking stew, maybe you got here accidentally. Either way, just not much of a stew person, are you?",
    image: "cobb.jpg",
    url: "secret.html"
  }
};


document.addEventListener("DOMContentLoaded", function() { 

  const quizForm = document.getElementById("stewQuizForm");
  const resultDiv = document.getElementById("quizResult");

  if (!quizForm) { //basically if not on the quiz page don't do this part
    return;
  }

  quizForm.addEventListener("submit", function(event) { //when the form is submitted
    event.preventDefault();

    let totalScore = 0;
    let unanswered = [];

    for (let i = 1; i <= 10; i++) {
      const name = `q${i}`; //because I used "q1" - "q10" for my questions, this just grabs em in order
      const selected = quizForm.querySelector(`input[name="${name}"]:checked`); //single out the answered ones

      if (!selected) {//add a question to the missed questions if it isn't checked
        unanswered.push(i);
        continue;
      }

      totalScore += Number(selected.value); //tally up the totals
    }

    if (unanswered.length > 0) { //if there's any missing questions, put an error in the div instead of a result
      const missingList = unanswered.join(", ");
      resultDiv.innerHTML = `
        <p class="quiz-error">
          Please answer all 10 questions before submitting.<br>
          You still need to answer: <strong>Question(s) ${missingList}</strong>.
        </p>
      `;

      const firstMissingId = `q${unanswered[0]}`; //found out which questions (q1, q2, ...) were missed
      const firstMissingSection = document.getElementById(firstMissingId);//find em. q1, q2, etc. is the id in this case.
      if (firstMissingSection) {
        firstMissingSection.scrollIntoView({ behavior: "smooth", block: "start" }); //jump to the first missed question
      }
      return; //done w/ missed question quiz stuff, and onto the rest
    }

    if (totalScore <= 21) { //not much, but I did a little weighting for the answers. there were a couple questions
      typeKey = "cozy";           //that asked about not liking stews. less stew-friendly = higher score basically.
    } else if (totalScore <= 23) {  //the rest is (mostly) evenly distributed to try and not overrepresent any one.
      typeKey = "distinguished";    //I kept getting "antistew" like half of the time so I just went with this instead.
    } else if (totalScore <= 25) {
      typeKey = "practical";
    } else if (totalScore <= 27) {
      typeKey = "jolly";
    } else if (totalScore <= 29) {
      typeKey = "spontaneous";
    } else if (totalScore <= 31) {
      typeKey = "mysterious";
    } else if (totalScore >= 32) {
      typeKey = "antistew";
    }


    let personality = personalities[typeKey];
        
    resultDiv.innerHTML = `
      <h2 style="animation: brightGlow 2s ease-in-out infinite alternate;">The Stew For You: ${personality.title}</h2>
      <p>${personality.description}</p>
      <a href="${personality.url}"><img id="stewpic" src="${personality.image}" alt="${personality.title}" width="500" height="500"></a>
      <p class="stewparagraph">Click on the image to learn more!</p>
    `;
    resultDiv.scrollIntoView({ behavior: "smooth" }); //scroll to the result
  });

});
