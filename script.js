//1. Toggle button - should switch the theme
//2. Contact me Form - should save User responses on the Browser database.
//3. Admin Login - should bring up a new section at the bottom on your website to let you login as an ADMIN
//4. If you are giving the right credentials, a new section should come at the bottom which displays all the user responses sent.

//Toggle functionality

const themeToggleBtn = document.getElementById("toggle-theme");

themeToggleBtn.addEventListener("click", function(){
  document.body.classList.toggle("dark-mode");
});

//Getting the contact me form active



document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  
  const nameValue = document.getElementById("name").value;
  const emailvalue = document.getElementById("email").value;
  const messageValue = document.getElementById("message").value;
  
  //Steps to store it in backend Database - (HERE IN OUR CASE)localStorage of the Browser
  //Session based Storage.
  
  //JSON - Format of the data that most of the Servers and APIs expect us to give.
  const response = { nameValue, emailvalue, messageValue, date: new Date().toISOString() };
  
  //We will create an empty list named responses, and keep storing all Userresponses in it.
  
  //You can be using the website for the first time, or you can be in a repeated session.
  const responses = JSON.parse(localStorage.getItem('responses')) || [ ] ; //OR symbol is ||
  
  //To store userResponse in responses list
  responses.push(response);
  
  //When you send data to backend you need to send as String
  //When you are getting it to frontend you need to convert to JSON in order to display it.
  
  //Now we have to send the list to the localStorage
  localStorage.setItem("responses", JSON.stringify(responses));
  
  console.log(responses);
  
  alert("Thankyou for your message, I will get in touch with you ASAP!");
  
  this.reset();
  
                                  
});

//admin login implementation
function showAdminLogin(){
  document.getElementById('admin-login').style.display = 'block';
}

document.getElementById('login-form').addEventListener('submit', function(e){
  
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const storedUsername = 'admin';
  const storedPassword = 'password';
  
  if (username === storedUsername && password === storedPassword) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block'; // User responses will now be visible. BUT it will not have the user responses YET.
    
    alert("Welcome Admin!");
    //By calling the function, the DIV with the ID user-responses will be filled with all the user responses submitted by the end users.
    displayStoredUserResponses();
  }
  else{
    alert("Invalid Credentials, please try again.")
  }
  
});

//Display all the user responses inside already created div block on HTML
function displayStoredUserResponses(){
  
  
  const responseContainer = document.getElementById('user-responses');
  const responses = JSON.parse(localStorage.getItem('responses')) || [ ];
  
  responseContainer.innerHTML = '';
  
  //ForEach, will take one item from the list and process it.
  responses.forEach(response =>{
    const responseElement = document.createElement('div');
    responseElement.innerHTML = `
    <p> Name: ${response.nameValue}</p>
    <p> Email: ${response.emailvalue}</p>
    <p> Message: ${response.messageValue}</p>
    <p> Date: ${response.date}</p>
    <hr>
    `;
    
    //We need to tell JS where the new element had to be placed
    // appendChild will help JS identify where it is supposed to attach the new element.
    responseContainer.appendChild(responseElement);
    
  });
  
}




